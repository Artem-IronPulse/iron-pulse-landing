import Image from "next/image";

const FEATURES = [
  {
    stat: "17",
    title: "лет практики",
    text: "17 лет живой практики. Выстраиваю программы на законах биомеханики для стабильного роста силы и выносливости. Создаю фундамент, который работает на вас даже тогда, когда нет мотивации.",
  },
  {
    stat: "ИП",
    title: "официально",
    text: "Работаю официально по договору оферты. Оплата проходит через расчетный счет — прозрачно и надежно.",
  },
  {
    stat: "ИТ",
    title: "Собственная ИТ-экосистема",
    text: "Ваши планы, RPE и утренний HRV сводятся в единую систему. Я анализирую эту динамику и точно дозирую нагрузку, чтобы полностью исключить риск перетренированности.",
  },
];

export function FeaturesSection() {
  return (
    <section id="experience" className="scroll-mt-24 border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            02 — Опыт
          </p>
          <h2 className="mt-3 text-balance font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
            Почему со мной спокойно тренироваться
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
          <figure className="relative mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:w-[320px]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-8 rounded-full bg-accent/25 blur-3xl"
            />
            <div className="relative aspect-[3/4] h-full min-h-[400px] overflow-hidden rounded-[28px] border border-white/10 bg-[#101114] shadow-[0_0_70px_-24px_rgba(61,255,138,0.7)]">
              <Image
                src="/profile.jpg"
                alt="Артём Ходжоян, персональный тренер Железный Пульс"
                fill
                sizes="(min-width: 1024px) 320px, 384px"
                className="object-contain object-top"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/15 to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-mono text-[11px] tracking-[0.18em] text-accent">
                  Тренер
                </p>
                <p className="mt-1 font-heading text-lg tracking-tight">Артём Ходжоян</p>
              </figcaption>
            </div>
          </figure>

          <ul className="grid flex-1 gap-4 md:grid-cols-3 lg:grid-cols-1">
          {FEATURES.map((feature, index) => (
            <li
              key={feature.stat}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:bg-white/[0.06]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-accent/0 blur-3xl transition duration-500 group-hover:bg-accent/15"
              />
              <p className="font-mono text-[11px] tracking-[0.18em] text-zinc-500">
                0{index + 1}
              </p>
              <p className="mt-8 bg-gradient-to-b from-white to-white/40 bg-clip-text font-heading text-5xl leading-none text-transparent transition duration-300 group-hover:from-accent group-hover:to-white">
                {feature.stat}
              </p>
              <div className="mt-4 h-px w-10 bg-accent" />
              <h3 className="mt-4 text-lg font-semibold tracking-tight text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{feature.text}</p>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
