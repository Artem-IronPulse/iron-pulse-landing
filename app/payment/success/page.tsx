import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оплата прошла | Железный Пульс",
  description: "Банк подтвердил оплату услуг персонального тренера.",
};

const homeLinkClass =
  "inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-black transition duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#b8ffd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]";

export default function PaymentSuccessPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col px-5 py-16 sm:px-6 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
        Оплата
      </p>
      <h1 className="mt-3 font-heading text-3xl leading-tight tracking-tight text-white sm:text-4xl">
        Спасибо, оплата прошла
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
        Банк подтвердил платёж. Доступ к материалам и следующий шаг по
        тренировкам согласуем лично — если нужно, напишите в Telegram.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href="/" className={homeLinkClass}>
          На главную
        </a>
        <a
          href="https://t.me/mc_orion"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]"
        >
          Написать в Telegram
        </a>
      </div>
    </article>
  );
}
