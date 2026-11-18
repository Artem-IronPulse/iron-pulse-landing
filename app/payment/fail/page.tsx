import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оплата не прошла | Железный Пульс",
  description: "Банк не подтвердил платёж. Можно вернуться к тарифам и попробовать снова.",
};

const retryLinkClass =
  "inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-black transition duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#b8ffd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]";

export default function PaymentFailPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col px-5 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-red-400">
        Оплата
      </p>
      <h1 className="mt-3 font-heading text-3xl leading-tight tracking-tight text-white sm:text-4xl">
        Оплата не прошла
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
        Банк не подтвердил платёж. Деньги не списаны, либо операция отклонена.
        Можно вернуться к тарифам и попробовать снова — другой картой или через
        несколько минут.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="/#pricing" className={retryLinkClass}>
          Попробовать снова
        </a>
        <a
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]"
        >
          На главную
        </a>
      </div>
    </article>
  );
}
