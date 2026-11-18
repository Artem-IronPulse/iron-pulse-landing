import type { Metadata } from "next";
import {
  PaymentResult,
  paymentPrimaryLinkClass,
  paymentSecondaryLinkClass,
} from "@/components/payment-result";

export const metadata: Metadata = {
  title: "Оплата не прошла | Железный Пульс",
  description: "Оплата не прошла или была отменена. Можно вернуться к тарифам и попробовать снова.",
};

export default function PaymentFailPage() {
  return (
    <PaymentResult
      tone="bad"
      title="Оплата не прошла или была отменена"
      actions={
        <>
          <a href="/#pricing" className={paymentPrimaryLinkClass}>
            Попробовать снова
          </a>
          <a
            href="https://t.me/ZHELEZNYPULS"
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
      <p>Оплата не прошла или была отменена.</p>
    </PaymentResult>
  );
}
