"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  PaymentResult,
  paymentPrimaryLinkClass,
  paymentSecondaryLinkClass,
} from "@/components/payment-result";
import { formatByn } from "@/lib/format-byn";

const TELEGRAM_HREF = "https://t.me/ZHELEZNYPULS";
const NOTIFIED_STORAGE_KEY = "artemstrong.paid-orders";

type Phase =
  | { kind: "checking" }
  | { kind: "missing" }
  | { kind: "unpaid" }
  | { kind: "error" }
  | { kind: "paid"; amountByn: number | null; description: string | null };

type StatusResponse = {
  paid?: unknown;
  amountByn?: unknown;
  description?: unknown;
};

function readNotifiedIds(): string[] {
  try {
    const raw = localStorage.getItem(NOTIFIED_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

function hasNotified(orderId: string) {
  return readNotifiedIds().includes(orderId);
}

function rememberNotified(orderId: string) {
  try {
    const ids = readNotifiedIds().filter((id) => id !== orderId);
    ids.push(orderId);
    localStorage.setItem(NOTIFIED_STORAGE_KEY, JSON.stringify(ids.slice(-40)));
  } catch {
    // Private mode can block storage. The server still dedupes within one process.
  }
}

function readAmount(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readDescription(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function isAbortError(error: unknown) {
  return error instanceof Error && error.name === "AbortError";
}

function UnconfirmedActions() {
  return (
    <>
      <a href="/#pricing" className={paymentPrimaryLinkClass}>
        Попробовать снова
      </a>
      <a
        href={TELEGRAM_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className={paymentSecondaryLinkClass}
      >
        Telegram · @ZHELEZNYPULS
        <span className="sr-only">, откроется в новой вкладке</span>
      </a>
    </>
  );
}

export function PaymentSuccessStatus() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId")?.trim() ?? "";
  const [phase, setPhase] = useState<Phase>(
    orderId ? { kind: "checking" } : { kind: "missing" },
  );

  useEffect(() => {
    if (!orderId) return;

    const controller = new AbortController();
    let active = true;

    setPhase({ kind: "checking" });

    async function checkPayment() {
      const notify = !hasNotified(orderId);

      try {
        const response = await fetch("/api/payment/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, notify }),
          cache: "no-store",
          signal: controller.signal,
        });

        const data = (await response.json().catch(() => null)) as StatusResponse | null;

        if (response.ok && data?.paid === true) {
          rememberNotified(orderId);
          if (!active) return;

          setPhase({
            kind: "paid",
            amountByn: readAmount(data.amountByn),
            description: readDescription(data.description),
          });
          return;
        }

        if (!active) return;
        setPhase({ kind: response.ok ? "unpaid" : "error" });
      } catch (error) {
        if (!active || isAbortError(error)) return;
        setPhase({ kind: "error" });
      }
    }

    void checkPayment();

    return () => {
      active = false;
      controller.abort();
    };
  }, [orderId]);

  if (!orderId || phase.kind === "missing") {
    return (
      <PaymentResult tone="bad" title="Оплата не подтверждена" actions={<UnconfirmedActions />}>
        <p>В ссылке нет номера заказа, поэтому оплату подтвердить нельзя.</p>
      </PaymentResult>
    );
  }

  if (phase.kind === "checking") {
    return (
      <PaymentResult tone="pending" title="Проверяем оплату…">
        <p aria-live="polite">Сверяем статус заказа с банком.</p>
      </PaymentResult>
    );
  }

  if (phase.kind === "paid") {
    const service = phase.description ?? "—";

    return (
      <PaymentResult
        tone="ok"
        title="Оплата прошла успешно!"
        actions={
          <>
            <a href="/" className={paymentPrimaryLinkClass}>
              На главную
            </a>
            <a
              href={TELEGRAM_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={paymentSecondaryLinkClass}
            >
              Telegram · @ZHELEZNYPULS
              <span className="sr-only">, откроется в новой вкладке</span>
            </a>
          </>
        }
      >
        <dl className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Сумма
            </dt>
            {phase.amountByn === null ? (
              <dd className="mt-1 text-lg text-white">—</dd>
            ) : (
              <dd className="mt-1 text-white">
                <span className="text-2xl tabular-nums">{formatByn(phase.amountByn)}</span>{" "}
                <span className="text-base text-accent">BYN</span>
              </dd>
            )}
          </div>
          <div className="mt-5">
            <dt className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Услуга
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-zinc-300 sm:text-base">{service}</dd>
          </div>
        </dl>
        <p className="mt-4">
          Спасибо! Свяжусь с вами в ближайшее время для согласования деталей
        </p>
      </PaymentResult>
    );
  }

  return (
    <PaymentResult tone="bad" title="Оплата не подтверждена" actions={<UnconfirmedActions />}>
      <p>
        {phase.kind === "error"
          ? "Не удалось проверить оплату. Обновите страницу через минуту."
          : "Оплата не подтверждена. Банк не сообщил об успешной оплате этого заказа."}
      </p>
    </PaymentResult>
  );
}
