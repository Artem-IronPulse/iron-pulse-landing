import { NextResponse } from "next/server";

const DEFAULT_DESCRIPTION =
  "Оплата услуг персонального тренера (ИП Ходжоян А.С.)";

const PLACEHOLDER_PASSWORD = "REPLACE_WITH_MY_API_PASSWORD";

const UNEXPECTED_ERROR_DETAILS =
  "Проверьте логи серверных функций Netlify для подробностей";

type CreatePaymentBody = {
  amountByn?: unknown;
  description?: unknown;
  clientEmail?: unknown;
};

type AlfaRegisterResponse = {
  orderId?: string;
  formUrl?: string;
  errorCode?: string | number;
  errorMessage?: string;
};

function jsonError(errorMessage: string, status: number) {
  return Response.json({ errorMessage }, { status });
}

function isBankError(errorCode: unknown) {
  return (
    errorCode !== undefined &&
    errorCode !== null &&
    String(errorCode) !== "0"
  );
}

function isAlfaFormUrl(value: string) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      (url.hostname === "alfabank.by" || url.hostname.endsWith(".alfabank.by"))
    );
  } catch {
    return false;
  }
}

function secretValues() {
  const secrets: string[] = [];

  for (const value of [
    process.env.ALFA_API_USER,
    process.env.ALFA_API_PASSWORD,
  ]) {
    if (typeof value !== "string" || value.length === 0) continue;

    secrets.push(value);

    const encoded = encodeURIComponent(value);
    if (encoded !== value) secrets.push(encoded);
  }

  secrets.sort((left, right) => right.length - left.length);
  return secrets;
}

function redactString(value: string, secrets: string[]) {
  let redacted = value;

  for (const secret of secrets) {
    if (!secret) continue;
    redacted = redacted.split(secret).join("[REDACTED]");
  }

  return redacted;
}

function containsCredentialForm(value: string) {
  return /userName=|password=/i.test(value);
}

function sanitizeString(value: string, secrets: string[]) {
  if (containsCredentialForm(value)) {
    return "[form body redacted]";
  }

  const redacted = redactString(value, secrets);
  return redacted.length > 4000 ? `${redacted.slice(0, 4000)}…` : redacted;
}

function sanitizeForLog(
  value: unknown,
  secrets: string[],
  seen = new WeakSet<object>(),
  depth = 0,
): unknown {
  if (typeof value === "string") return sanitizeString(value, secrets);

  if (
    value == null ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }

  if (typeof value === "bigint") return value.toString();
  if (typeof value === "symbol") return value.toString();
  if (typeof value === "function") return "[Function]";
  if (depth > 6) return "[MaxDepth]";
  if (typeof value !== "object") return String(value);
  if (seen.has(value)) return "[Circular]";

  seen.add(value);

  if (value instanceof URLSearchParams) return "[URLSearchParams redacted]";

  if (typeof Buffer !== "undefined" && Buffer.isBuffer(value)) {
    return "[binary]";
  }

  if (value instanceof Error) {
    const output: Record<string, unknown> = {
      name: redactString(value.name, secrets),
      message: sanitizeString(value.message, secrets),
    };

    if (value.stack) output.stack = sanitizeString(value.stack, secrets);

    if (value.cause !== undefined) {
      output.cause = sanitizeForLog(value.cause, secrets, seen, depth + 1);
    }

    const errno = value as Error & Record<string, unknown>;

    for (const key of ["code", "errno", "syscall"]) {
      if (key in errno && errno[key] !== undefined) {
        output[key] = sanitizeForLog(errno[key], secrets, seen, depth + 1);
      }
    }

    if ("errors" in errno && Array.isArray(errno.errors)) {
      output.errors = errno.errors.map((item) =>
        sanitizeForLog(item, secrets, seen, depth + 1),
      );
    }

    for (const [key, nested] of Object.entries(errno)) {
      if (key in output) continue;

      if (key === "password" || key.toLowerCase() === "username") {
        output[key] = "[REDACTED]";
        continue;
      }

      output[key] = sanitizeForLog(nested, secrets, seen, depth + 1);
    }

    return output;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      sanitizeForLog(item, secrets, seen, depth + 1),
    );
  }

  const output: Record<string, unknown> = {};

  for (const [key, nested] of Object.entries(value)) {
    if (key === "password" || key.toLowerCase() === "username") {
      output[key] = "[REDACTED]";
      continue;
    }

    output[key] = sanitizeForLog(nested, secrets, seen, depth + 1);
  }

  return output;
}

function logAlfaPaymentError(error: unknown) {
  const secrets = secretValues();
  console.error("ALFA PAYMENT ERROR:", sanitizeForLog(error, secrets));

  if (typeof error !== "object" || error === null) return;

  if ("message" in error && error.message != null) {
    console.error(
      "ALFA PAYMENT ERROR message:",
      sanitizeForLog(error.message, secrets),
    );
  }

  if ("stack" in error && error.stack != null) {
    console.error(
      "ALFA PAYMENT ERROR stack:",
      sanitizeForLog(error.stack, secrets),
    );
  }

  if ("name" in error && error.name != null) {
    console.error(
      "ALFA PAYMENT ERROR name:",
      sanitizeForLog(error.name, secrets),
    );
  }

  if ("cause" in error && error.cause !== undefined) {
    console.error(
      "ALFA PAYMENT ERROR cause:",
      sanitizeForLog(error.cause, secrets),
    );
  }
}

function unexpectedErrorResponse(error: unknown) {
  const secrets = secretValues();
  const raw = error instanceof Error ? error.message : "Unknown error";
  const message = containsCredentialForm(raw)
    ? "Unknown error"
    : redactString(raw, secrets);

  return NextResponse.json(
    {
      success: false,
      error: message,
      errorMessage: message,
      details: UNEXPECTED_ERROR_DETAILS,
    },
    { status: 500 },
  );
}

function invalidBankBody(raw: string, bankStatus: number, error?: unknown): never {
  const message =
    error instanceof Error ? error.message : "Банк вернул некорректный ответ";
  const cause: Record<string, unknown> = {
    bankStatus,
    body: raw.slice(0, 2000),
  };

  if (error instanceof Error) {
    cause.name = error.name;
    if (error.stack) cause.stack = error.stack;
    if (error.cause !== undefined) cause.originalCause = error.cause;
  }

  const wrapped = new Error(message, { cause });
  if (error instanceof Error && error.name) wrapped.name = error.name;
  throw wrapped;
}

function parseBankJson(raw: string, bankStatus: number): AlfaRegisterResponse {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw) as unknown;
  } catch (error) {
    invalidBankBody(raw, bankStatus, error);
  }

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    invalidBankBody(raw, bankStatus);
  }

  return parsed as AlfaRegisterResponse;
}

export async function POST(request: Request) {
  try {
    let body: CreatePaymentBody;

    try {
      body = (await request.json()) as CreatePaymentBody;
    } catch {
      return jsonError("Некорректное тело запроса", 400);
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return jsonError("Некорректное тело запроса", 400);
    }

    const amountByn = Number(body.amountByn);

    if (!Number.isFinite(amountByn) || amountByn <= 0) {
      return jsonError("Укажите корректную сумму в BYN", 400);
    }

    const amount = Math.round(amountByn * 100);

    if (!Number.isSafeInteger(amount) || amount <= 0) {
      return jsonError("Укажите корректную сумму в BYN", 400);
    }

    const description =
      typeof body.description === "string" && body.description.trim()
        ? body.description.trim().slice(0, 512)
        : DEFAULT_DESCRIPTION;

    let email: string | undefined;

    if (
      body.clientEmail !== undefined &&
      body.clientEmail !== null &&
      body.clientEmail !== ""
    ) {
      if (typeof body.clientEmail !== "string") {
        return jsonError("Укажите корректный email", 400);
      }

      email = body.clientEmail.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return jsonError("Укажите корректный email", 400);
      }
    }

    const userName = process.env.ALFA_API_USER;
    const password = process.env.ALFA_API_PASSWORD;
    const apiUrl = process.env.ALFA_API_URL?.replace(/\/$/, "");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

    if (!userName || !password || !apiUrl || !siteUrl) {
      return jsonError("Платёжный шлюз не настроен", 500);
    }

    if (password === PLACEHOLDER_PASSWORD) {
      return jsonError(
        "В ALFA_API_PASSWORD всё ещё стоит заглушка. Замените REPLACE_WITH_MY_API_PASSWORD на пароль из кабинета Альфа-Банка и перезапустите сервер.",
        500,
      );
    }

    const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const params = new URLSearchParams({
      userName,
      password,
      orderNumber,
      amount: String(amount),
      currency: "933",
      returnUrl: `${siteUrl}/payment/success`,
      failUrl: `${siteUrl}/payment/fail`,
      description,
    });

    if (email) {
      params.set("email", email);
    }

    const bankResponse = await fetch(`${apiUrl}/register.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });

    const raw = await bankResponse.text();
    const data = parseBankJson(raw, bankResponse.status);

    if (isBankError(data.errorCode)) {
      const bankMessage =
        typeof data.errorMessage === "string" && data.errorMessage.trim()
          ? data.errorMessage
          : "Банк отклонил регистрацию платежа";

      console.error(
        "ALFA PAYMENT ERROR:",
        sanitizeForLog(
          {
            status: bankResponse.status,
            errorCode: data.errorCode,
            errorMessage: data.errorMessage,
          },
          secretValues(),
        ),
      );

      const safeMessage = redactString(bankMessage, secretValues());

      return NextResponse.json(
        {
          success: false,
          error: safeMessage,
          errorMessage: safeMessage,
        },
        { status: 400 },
      );
    }

    if (!data.formUrl || !data.orderId || !isAlfaFormUrl(data.formUrl)) {
      console.error(
        "ALFA PAYMENT ERROR:",
        sanitizeForLog(
          {
            status: bankResponse.status,
            errorCode: data.errorCode,
            errorMessage: data.errorMessage,
            hasFormUrl: Boolean(data.formUrl),
            hasOrderId: Boolean(data.orderId),
          },
          secretValues(),
        ),
      );

      return jsonError(
        redactString(
          typeof data.errorMessage === "string" && data.errorMessage.trim()
            ? data.errorMessage
            : "Банк не вернул ссылку на оплату",
          secretValues(),
        ),
        502,
      );
    }

    return Response.json({
      formUrl: data.formUrl,
      orderId: data.orderId,
      orderNumber,
    });
  } catch (error) {
    try {
      logAlfaPaymentError(error);
    } catch {
      console.error("ALFA PAYMENT ERROR:", "Unknown error");
    }

    try {
      return unexpectedErrorResponse(error);
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Unknown error",
          errorMessage: "Unknown error",
          details: UNEXPECTED_ERROR_DETAILS,
        },
        { status: 500 },
      );
    }
  }
}
