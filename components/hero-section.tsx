const primaryLinkClass =
  "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-black transition duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#b8ffd6] hover:shadow-[0_0_32px_rgba(61,255,138,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708] sm:w-auto";

const secondaryLinkClass =
  "group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 text-sm font-semibold text-white transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-accent/70 hover:bg-accent/10 hover:shadow-[0_0_28px_rgba(61,255,138,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708] sm:w-auto";

const METRICS = [
  { label: "HRV", value: "64", unit: "мс" },
  { label: "RPE", value: "7.5", unit: "цель" },
  { label: "Пульс", value: "128", unit: "bpm" },
];

export function HeroSection() {
  return (
    <section id="approach" className="relative scroll-mt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:grid-cols-[1.12fr_0.88fr] lg:px-8 lg:pt-20 lg:pb-28">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            01 — Метод
          </p>
          <h1 className="mt-4 font-heading text-[2.65rem] leading-[1.05] tracking-tight min-[400px]:text-5xl sm:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block">Научный подход</span>
            <span className="mt-1 block pb-1 text-white">к фитнесу</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            Нагрузка по RPE, восстановление по HRV. Интенсивность каждой сессии
            всегда соответствует реальному ресурсу вашего организма на
            сегодняшний день.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#pricing" className={primaryLinkClass}>
              Онлайн
              <span
                aria-hidden="true"
                className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <a href="#pricing" className={secondaryLinkClass}>
              Офлайн в Минске
              <span
                aria-hidden="true"
                className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </div>

        <div className="relative isolate">
          <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-emerald-500/15 blur-3xl -z-10" />
          <div className="relative rounded-[28px] border border-white/10 bg-neutral-900/40 p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] backdrop-blur-2xl sm:p-6">
          <div
            aria-hidden="true"
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] tracking-[0.18em] text-zinc-500">
              Пример сессии
            </p>
            <p className="inline-flex items-center gap-2 text-[11px] tracking-[0.16em] text-accent">
              <span className="live-dot size-1.5 rounded-full bg-accent shadow-[0_0_10px_#3dff8a]" />
              Сигнал
            </p>
          </div>

          <svg
            viewBox="0 0 320 64"
            className="mt-4 h-16 w-full"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 32H48L64 32L78 8L96 56L112 32H168L184 32L198 14L214 50L230 32H320"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              className="ecg-path drop-shadow-[0_0_6px_rgba(61,255,138,0.85)]"
              d="M0 32H48L64 32L78 8L96 56L112 32H168L184 32L198 14L214 50L230 32H320"
              stroke="#3dff8a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <dl className="mt-4 grid grid-cols-3 gap-2.5">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/5 bg-black/30 px-3 py-3"
              >
                <dt className="text-[10px] tracking-[0.16em] text-zinc-500">
                  {metric.label}
                </dt>
                <dd className="mt-2 font-sans text-2xl leading-none tabular-nums text-white sm:text-3xl">
                  {metric.value}
                </dd>
                <dd className="mt-1 text-[11px] text-zinc-500">{metric.unit}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px]">
              <span className="tracking-[0.16em] text-zinc-500">
                Готовность
              </span>
              <span className="text-accent">высокая</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-accent/50 to-accent" />
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500">
            Так выглядит готовая сессия: целевой RPE при стабильном HRV. Это
            образец экрана, не замер конкретного человека.
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
