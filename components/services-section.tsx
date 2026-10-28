const TELEGRAM_HREF = "https://t.me/mc_orion";

type PlanPoint = {
  highlight?: string;
  text: string;
};

const PLANS = [
  {
    id: "adrenalin",
    featured: true,
    badge: "Офлайн · Минск",
    title: "Клуб «Адреналин Max»",
    offer: "Первичная тренировка-диагностика",
    promoBadge: "Для новых клиентов",
    oldPrice: "70",
    pricePrefix: "",
    price: "60",
    priceCaption: "",
    paymentNote: "",
    description:
      "Аудит техники и расчет RPE на первой сессии. На основе этих данных выстраиваем ваш персональный тренировочный цикл в клубе.",
    points: [
      { text: "Блок 5 тренировок — 325 BYN" },
      { text: "Диагностика техники и исходных метрик" },
      { text: "Целевой RPE на каждую сессию" },
      { text: "Правки программы по восстановлению" },
      { text: "Постоянная связь и поддержка в мессенджере" },
    ] as PlanPoint[],
    cta: "Записаться в клуб",
  },
  {
    id: "remote",
    featured: false,
    badge: "Онлайн",
    title: "Онлайн-наставничество",
    offer: "",
    promoBadge: "",
    oldPrice: "",
    pricePrefix: "от",
    price: "250",
    priceCaption: "тариф «Смарт»",
    paymentNote:
      "🌍 Доступна оплата из РФ и других стран (в RUB / USD / EUR)",
    description:
      "Дистанционное ведение по биометрии. «Смарт» дает полное программирование цикла, а флагман — глубокую аналитику метрик и расширенный контроль.",
    points: [
      {
        highlight: "Базовый — 250 BYN/мес.",
        text: "Грамотный план и периодический аудит. Формат для дисциплинированных клиентов без необходимости ежедневной опеки.",
      },
      {
        highlight: "Флагман — 350 BYN/мес.",
        text: "Полноценное дистанционное управление процессом с глубоким фокусом на биомеханику и безопасность.",
      },
      {
        highlight: "VIP — 500 BYN/мес.",
        text: "Премиальное ведение. Научный контроль восстановления (HRV, мониторинг сна) и точечные офлайн-встречи.",
      },
    ] as PlanPoint[],
    cta: "Начать онлайн",
  },
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mt-0.5 size-4 shrink-0 text-accent"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M3.2 8.4 6.3 11.4 12.8 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function buttonClass(featured: boolean) {
  const base =
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition duration-300 motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]";

  if (featured) {
    return `${base} bg-accent text-black hover:bg-[#b8ffd6] hover:shadow-[0_0_32px_rgba(61,255,138,0.45)]`;
  }

  return `${base} border border-white/15 text-white hover:border-accent hover:bg-accent hover:text-black hover:shadow-[0_0_32px_rgba(61,255,138,0.35)]`;
}

export function ServicesSection() {
  return (
    <section id="pricing" className="scroll-mt-24 border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            03 — Тарифы
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
            Два формата. Одна логика нагрузки
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Офлайн или онлайн. В обоих случаях нагрузка зависит от объективного
            восстановления организма, полностью исключая работу на износ.
          </p>
        </div>

        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-2">
          {PLANS.map((plan) => (
            <article
              key={plan.id}
              id={plan.id}
              className="h-full scroll-mt-28 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/[0.06]"
            >
              <div className="flex h-full flex-col p-7 sm:p-8">
                <p
                  className="w-fit rounded-full border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400"
                >
                  {plan.badge}
                </p>
                <h3 className="mt-5 font-heading text-2xl leading-tight tracking-tight sm:text-[1.7rem]">
                  {plan.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {plan.description}
                </p>

                {plan.promoBadge ? (
                  <p className="mt-7 w-fit rounded-full bg-accent px-3 py-1 text-[11px] font-semibold tracking-wide text-black">
                    {plan.promoBadge}
                  </p>
                ) : null}
                {plan.offer ? (
                  <p className="mt-3 text-base font-semibold text-white">{plan.offer}</p>
                ) : null}

                <div
                  className={`flex flex-wrap items-end gap-x-3 gap-y-1 ${
                    plan.promoBadge || plan.offer ? "mt-4" : "mt-7"
                  }`}
                >
                  {plan.oldPrice ? (
                    <p className="mb-1 text-xl text-gray-500 line-through tabular-nums">
                      {plan.oldPrice} BYN
                    </p>
                  ) : null}
                  {plan.pricePrefix ? (
                    <p className="mb-1 text-[11px] tracking-[0.14em] text-zinc-500">
                      {plan.pricePrefix}
                    </p>
                  ) : null}
                  <p
                    className={`font-sans text-5xl leading-none tabular-nums ${
                      plan.oldPrice ? "text-accent" : ""
                    }`}
                  >
                    {plan.price}
                  </p>
                  <p className="mb-1 text-sm text-accent">
                    BYN
                    {plan.priceCaption ? (
                      <span className="mt-0.5 block text-xs text-zinc-500">
                        {plan.priceCaption}
                      </span>
                    ) : null}
                  </p>
                </div>

                {plan.paymentNote ? (
                  <p className="mt-3 text-sm text-gray-400">{plan.paymentNote}</p>
                ) : null}

                <ul className="mt-6 space-y-3">
                  {plan.points.map((point) => (
                    <li
                      key={point.highlight ?? point.text}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-300"
                    >
                      <CheckIcon />
                      <span>
                        {point.highlight ? (
                          <span className="font-semibold text-white">
                            {point.highlight}{" "}
                          </span>
                        ) : null}
                        {point.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8">
                  <a
                    href={TELEGRAM_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass(plan.featured)}
                    aria-label={`${plan.cta}: ${plan.title}`}
                  >
                    {plan.cta}
                    <span className="sr-only">, откроется в новой вкладке</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-zinc-500">
          Диагностика за 60 BYN — для новых клиентов клуба. Запись и вопросы —
          в Telegram, первая переписка ни к чему не обязывает.
        </p>
      </div>
    </section>
  );
}
