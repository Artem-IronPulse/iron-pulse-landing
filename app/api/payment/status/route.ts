import { NextResponse } from "next/server";
import { formatByn, kopecksToByn } from "@/lib/format-byn";

const PLACEHOLDER_PASSWORD = "REPLACE_WITH_MY_API_PASSWORD";
const MAX_ORDER_ID_LENGTH = 64;

/** Order ids already sent to Telegram in this server process. */
const notifiedOrderIds = new Set<string>();

type StatusPayload = {
  paid: boolean;
  amountByn: number | null;
  description: string | null;
  orderNumber: string | null;
  orderStatus: number | null;
};

type TelegramTarget = {
  token: string;
  chatId: string;
};

function jsonStatus(body: StatusPayload & { errorMessage?: string }, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function jsonError(errorMessage: string, status: number) {
  return jsonStatus(
    {
      paid: false,
      amountByn: null,
      description: null,
      orderNumber: null,
      orderStatus: null,
      errorMessage,
    },
    status,
  );
}

function emptyStatus(): StatusPayload {
  return {
    paid: false,
    amountByn: null,
    description: null,
    orderNumber: null,
    orderStatus: null,
  };
}

function collectSecrets() {
  const raw = [
    process.env.ALFA_API_PASSWORD,
    process.env.ALFA_API_USER,
    process.env.TELEGRAM_BOT_TOKEN,
    process.env.TELEGRAM_CHAT_ID,
  ];
  const secrets: string[] = [];

  for (const value of raw) {
    if (typeof value !== "string") continue;

    const trimmed = value.trim();
    if (trimmed.length < 8) continue;

    secrets.push(value);
    if (trimmed !== value) secrets.push(trimmed);

    const encoded = encodeURIComponent(trimmed);
    if (encoded !== trimmed) secrets.push(encoded);
  }

  secrets.sort((left, right) => right.length - left.length);
  return secrets;
}

function redact(value: string) {
  let output = value;

  for (const secret of collectSecrets()) {
    output = output.split(secret).join("[REDACTED]");
  }

  return output.replace(/bot\d{6,}:[A-Za-z0-9_-]+/gi, "bot[REDACTED]");
}

function safeErrorText(error: unknown) {
  const raw = error instanceof Error ? error.message : "Unknown error";

  if (/userName=|password=|api\.telegram\.org/i.test(raw)) {
    return "Payment status request failed";
  }

  const redacted = redact(raw);
  if (/userName=|password=/i.test(redacted)) return "Payment status request failed";

  return redacted.slice(0, 300);
}

function readOrderId(value: unknown) {
  if (typeof value !== "string") return null;

  const orderId = value.trim();
  if (!orderId || orderId.length > MAX_ORDER_ID_LENGTH) return null;
  if (!/^[A-Za-z0-9-]+$/.test(orderId)) return null;

  return orderId;
}

function isBankError(errorCode: unknown) {
  if (errorCode === undefined || errorCode === null) return false;

  const code = typeof errorCode === "string" ? errorCode.trim() : String(errorCode);
  if (code === "") return false;

  return code !== "0";
}

function isPaidStatus(orderStatus: unknown) {
  if (typeof orderStatus !== "number" && typeof orderStatus !== "string") return false;

  const normalized = typeof orderStatus === "string" ? orderStatus.trim() : orderStatus;
  return Number(normalized) === 2;
}

function readOrderStatus(orderStatus: unknown) {
  if (typeof orderStatus !== "number" && typeof orderStatus !== "string") return null;

  const normalized = typeof orderStatus === "string" ? orderStatus.trim() : orderStatus;
  if (normalized === "") return null;

  const status = Number(normalized);
  return Number.isFinite(status) ? status : null;
}

function readDescription(value: unknown) {
  if (typeof value !== "string") return null;

  const description = value.trim().slice(0, 512);
  return description ? description : null;
}

function readOrderNumber(value: unknown) {
  if (typeof value !== "string" && typeof value !== "number") return null;

  const orderNumber = String(value).trim().slice(0, 64);
  return orderNumber ? orderNumber : null;
}

function oneLine(value: string) {
  return value
    .replace(/[\u0000-\u001F\u007F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 500);
}

function buildTelegramText(payload: StatusPayload) {
  const amount = formatByn(payload.amountByn);
  const description = oneLine(payload.description ?? "—");
  const orderNumber = oneLine(payload.orderNumber ?? "—");

  return [
    "💰 Новая оплата на artemstrong.pro!",
    `Сумма: ${amount} BYN`,
    `Услуга: ${description}`,
    `Номер заказа: ${orderNumber}`,
  ].join("\n");
}

function claimNotification(orderId: string) {
  if (notifiedOrderIds.has(orderId)) return false;

  notifiedOrderIds.add(orderId);
  return true;
}

function readTelegramTarget(): TelegramTarget | null {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) return null;

  return { token, chatId };
}

async function sendTelegramMessage(text: string, target: TelegramTarget) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${target.token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: target.chatId,
        text,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("ALFA PAYMENT STATUS ERROR: Telegram notification failed", {
        status: response.status,
      });
      return;
    }

    const payload: unknown = await response.json().catch(() => null);
    const accepted =
      typeof payload === "object" &&
      payload !== null &&
      "ok" in payload &&
      (payload as { ok?: unknown }).ok === true;

    if (!accepted) {
      console.error("ALFA PAYMENT STATUS ERROR: Telegram notification was rejected");
    }
  } catch (error) {
    console.error("ALFA PAYMENT STATUS ERROR:", safeErrorText(error));
  }
}

function readBankPayload(data: Record<string, unknown>): StatusPayload {
  const orderStatus = readOrderStatus(data.orderStatus);
  const paid = isPaidStatus(data.orderStatus) && !isBankError(data.errorCode);

  return {
    paid,
    amountByn: kopecksToByn(data.amount),
    description: readDescription(data.orderDescription),
    orderNumber: readOrderNumber(data.orderNumber),
    orderStatus,
  };
}

export async function POST(request: Request) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return jsonError("Некорректное тело запроса", 400);
    }

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return jsonError("Некорректное тело запроса", 400);
    }

    const record = body as { orderId?: unknown; notify?: unknown };
    const orderId = readOrderId(record.orderId);

    if (!orderId) {
      return jsonError("Укажите корректный номер заказа", 400);
    }

    const notify = record.notify !== false;
    const userName = process.env.ALFA_API_USER?.trim();
    const password = process.env.ALFA_API_PASSWORD;
    const apiUrl = process.env.ALFA_API_URL?.trim().replace(/\/$/, "");
    const telegram = readTelegramTarget();

    if (!userName || !password || !apiUrl) {
      return jsonError("Платёжный шлюз не настроен", 500);
    }

    if (password === PLACEHOLDER_PASSWORD) {
      return jsonError(
        "В ALFA_API_PASSWORD всё ещё стоит заглушка. Замените REPLACE_WITH_MY_API_PASSWORD на пароль из кабинета Альфа-Банка и перезапустите сервер.",
        500,
      );
    }

    if (notify && !notifiedOrderIds.has(orderId) && !telegram) {
      return jsonError("Платёжный шлюз не настроен", 500);
    }

    const params = new URLSearchParams({
      userName,
      password,
      orderId,
    });

    let bankResponse: Response;

    try {
      bankResponse = await fetch(`${apiUrl}/getOrderStatusExtended.do`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        cache: "no-store",
      });
    } catch (error) {
      console.error("ALFA PAYMENT STATUS ERROR:", safeErrorText(error));
      return jsonError("Не удалось проверить статус оплаты", 502);
    }

    const raw = await bankResponse.text();
    let parsed: unknown;

    try {
      parsed = JSON.parse(raw) as unknown;
    } catch (error) {
      console.error("ALFA PAYMENT STATUS ERROR:", safeErrorText(error));
      return jsonError("Не удалось проверить статус оплаты", 502);
    }

    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      console.error("ALFA PAYMENT STATUS ERROR: bank returned an unexpected payload", {
        status: bankResponse.status,
      });
      return jsonError("Не удалось проверить статус оплаты", 502);
    }

    const bankData = parsed as Record<string, unknown>;
    const payload = readBankPayload(bankData);

    if (!bankResponse.ok && payload.orderStatus === null) {
      console.error("ALFA PAYMENT STATUS ERROR: bank status request failed", {
        status: bankResponse.status,
      });
      return jsonStatus(emptyStatus(), 502);
    }

    if (isBankError(bankData.errorCode) && payload.orderStatus === null) {
      console.error("ALFA PAYMENT STATUS ERROR: bank rejected the status request", {
        status: bankResponse.status,
      });
    }

    if (payload.paid && notify && telegram && claimNotification(orderId)) {
      await sendTelegramMessage(buildTelegramText(payload), telegram);
    }

    return jsonStatus(payload);
  } catch (error) {
    console.error("ALFA PAYMENT STATUS ERROR:", safeErrorText(error));
    return jsonError("Не удалось проверить статус оплаты", 500);
  }
}
