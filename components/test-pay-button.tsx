"use client";

import { useEffect, useState } from "react";
import { AlfaPayButton } from "@/components/alfa-pay-button";

function hasTestPayFlag() {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  return params.get("test") === "1";
}

export function TestPayButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(hasTestPayFlag());
  }, []);

  if (!visible) return null;

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
