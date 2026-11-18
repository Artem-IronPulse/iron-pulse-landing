import type { ReactNode } from "react";

export const paymentPrimaryLinkClass =
  "inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-black transition duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#b8ffd6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]";

export const paymentSecondaryLinkClass =
  "inline-flex h-12 items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-white transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]";

type PaymentResultProps = {
  tone: "ok" | "pending" | "bad";
  title: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function PaymentResult({ tone, title, children, actions }: PaymentResultProps) {
  const labelClass = tone === "bad" ? "text-red-400" : "text-emerald-400";

  return (
    <article
      className="mx-auto flex w-full max-w-3xl flex-col px-5 py-16 sm:px-6 sm:py-24"
      aria-busy={tone === "pending" ? true : undefined}
    >
      <p className={`text-xs font-semibold uppercase tracking-wider ${labelClass}`}>Оплата</p>
      <h1 className="mt-3 font-heading text-3xl leading-tight tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      <div className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">{children}</div>
      {actions ? <div className="mt-8 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
    </article>
  );
}
