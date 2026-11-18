"use client";

import { useSearchParams } from "next/navigation";
import { AlfaPayButton } from "@/components/alfa-pay-button";

export function TestPayButton() {
  const searchParams = useSearchParams();

  if (searchParams.get("test") !== "1") return null;

  return (
    <div className="mx-auto mt-10 max-w-sm border-t border-white/10 pt-8">
      <p className="text-center text-xs font-semibold uppercase tracking-wider text-emerald-400">
        Тест
      </p>
      <div className="mt-4">
        <AlfaPayButton title="Тест оплаты — 1 BYN" priceByn={1} />
      </div>
    </div>
  );
}
