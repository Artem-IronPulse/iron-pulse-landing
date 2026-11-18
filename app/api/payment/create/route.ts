const DEFAULT_DESCRIPTION =
  "Оплата услуг персонального тренера (ИП Ходжоян А.С.)";

const PLACEHOLDER_PASSWORD = "REPLACE_WITH_MY_API_PASSWORD";

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

export async function POST(request: Request) {
  let body: CreatePaymentBody;

  try {
    body = (await request.json()) as CreatePaymentBody;
  } catch {
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

  let bankResponse: Response;

  try {
    bankResponse = await fetch(`${apiUrl}/register.do`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
      cache: "no-store",
    });
  } catch {
    return jsonError("Не удалось связаться с платёжным шлюзом Альфа-Банка", 502);
  }

  const raw = await bankResponse.text();
  let data: AlfaRegisterResponse;

  try {
    data = JSON.parse(raw) as AlfaRegisterResponse;
  } catch {
    return jsonError("Банк вернул некорректный ответ. Попробуйте позже.", 502);
  }

  if (isBankError(data.errorCode)) {
    return jsonError(
      data.errorMessage || "Банк отклонил регистрацию платежа",
      400,
    );
  }

  if (!data.formUrl || !data.orderId || !isAlfaFormUrl(data.formUrl)) {
    return jsonError(
      data.errorMessage || "Банк не вернул ссылку на оплату",
      502,
    );
  }

  return Response.json({
    formUrl: data.formUrl,
    orderId: data.orderId,
    orderNumber,
  });
}
