import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentResult } from "@/components/payment-result";
import { PaymentSuccessStatus } from "@/components/payment-success-status";

export const metadata: Metadata = {
  title: "Результат оплаты | Железный Пульс",
  description: "Проверка статуса оплаты услуг персонального тренера.",
};

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <PaymentResult tone="pending" title="Проверяем оплату…">
          <p>Сверяем статус заказа с банком.</p>
        </PaymentResult>
      }
    >
      <PaymentSuccessStatus />
    </Suspense>
  );
}
