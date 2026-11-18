"use client";

import { useState } from "react";

type AlfaPayButtonProps = {
  title: string;
  priceByn: number;
  className?: string;
  clientEmail?: string;
};

export function AlfaPayButton({
  title,
  priceByn,
  className,
  clientEmail,
}: AlfaPayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pay() {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountByn: priceByn,
          description: title,
          ...(clientEmail ? { clientEmail } : {}),
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        url?: string;
        formUrl?: string;
        error?: string;
        errorMessage?: string;
      } | null;

      const paymentUrl =
        (typeof data?.url === "string" && data.url) ||
        (typeof data?.formUrl === "string" && data.formUrl) ||
        "";

      if (!response.ok || !paymentUrl) {
        setError(
          data?.errorMessage ||
            data?.error ||
            "Не удалось перейти к оплате. Попробуйте ещё раз.",
        );
        setLoading(false);
        return;
      }

      window.location.href = paymentUrl;
    } catch {
      setError("Нет связи с сервером. Проверьте интернет и попробуйте снова.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={pay}
        disabled={loading}
        aria-busy={loading}
        className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-accent/70 bg-accent/10 px-5 text-sm font-semibold text-accent shadow-[0_0_28px_-14px_rgba(61,255,138,0.95)] transition duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-accent hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708] disabled:cursor-wait disabled:opacity-70 ${className ?? ""}`}
      >
        {loading ? "Переход к оплате…" : title}
      </button>
      {error ? (
        <p role="alert" className="mt-2 text-center text-xs leading-relaxed text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}
