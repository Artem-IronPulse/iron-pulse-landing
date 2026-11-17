import { PulseMark } from "@/components/pulse-mark";

const SOCIALS = [
  {
    name: "Telegram",
    href: "https://t.me/mc_orion",
    icon: TelegramIcon,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/artemstrong.pro",
    icon: InstagramIcon,
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@artemstrong.pro",
    icon: TikTokIcon,
  },
];

const PAYMENTS = [
  { src: "/payments/White/WHITE%20LOGOS/white-01.png", alt: "Альфа-Банк" },
  { src: "/payments/White/WHITE%20LOGOS/white-02.png", alt: "Visa" },
  { src: "/payments/White/WHITE%20LOGOS/white-03.png", alt: "Visa Secure" },
  { src: "/payments/White/WHITE%20LOGOS/white-04.png", alt: "Mastercard ID Check" },
  { src: "/payments/White/WHITE%20LOGOS/white-05.png", alt: "Mastercard" },
  { src: "/payments/White/WHITE%20LOGOS/white-06.png", alt: "Белкарт Интернет Пароль" },
  { src: "/payments/White/WHITE%20LOGOS/white-08.png", alt: "Белкарт" },
  { src: "/payments/White/WHITE%20LOGOS/white-09.png", alt: "Samsung Pay" },
  { src: "/payments/White/WHITE%20LOGOS/white-10.png", alt: "Apple Pay", invert: true },
];

export function SiteFooter() {
  return (
    <footer id="contacts" className="scroll-mt-32 border-t border-white/10">
      <div className="mx-auto w-full max-w-6xl px-5 pt-16 pb-28 sm:px-6 sm:pt-20 sm:pb-32 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              04 — Запись
            </p>
            <h2 className="mt-3 font-heading text-3xl leading-tight tracking-tight sm:text-4xl">
              Напишите — разберём задачу
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
              Персональные тренировки в Минске и онлайн из любой точки мира.
              Коротко опишите вашу цель и график — я отвечу лично и подберу
              идеальный формат работы.
            </p>
          </div>

          <ul className="flex flex-col gap-3 sm:flex-row">
            {SOCIALS.map((item) => (
              <li key={item.name} className="sm:w-auto">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 motion-safe:hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708] sm:w-auto"
                >
                  <item.icon />
                  {item.name}
                  <span className="sr-only">, откроется в новой вкладке</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div>
            <a href="/#approach" className="inline-flex items-center gap-2.5">
              <PulseMark className="size-8" />
              <span className="font-heading text-sm tracking-tight">Железный Пульс</span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-500">
              Персональный тренер. Нагрузка по RPE, восстановление по HRV.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-zinc-500">
              Реквизиты ИП
            </p>
            <address className="mt-3 space-y-1.5 text-[13px] leading-relaxed break-words text-zinc-400 not-italic">
              <p>ИП Ходжоян Артём Саркисович</p>
              <p>УНП 791392856</p>
              <p>
                Юридический адрес: Республика Беларусь, Могилевская обл., Чаусский
                р-н, Антоновский с/с, аг. Антоновка, ул. Центральная, дом 5.
              </p>
              <p>
                Свидетельство о гос. регистрации № 791392856 от 03.08.2026 выдано
                Чаусским РИК.
              </p>
              <p>
                Телефон:{" "}
                <a href="tel:+375295114184" className="text-zinc-300 transition-colors hover:text-emerald-400">
                  +375 29 511-41-84
                </a>
              </p>
              <p>
                E-mail:{" "}
                <a
                  href="mailto:mc_orion@mail.ru"
                  className="text-zinc-300 transition-colors hover:text-emerald-400"
                >
                  mc_orion@mail.ru
                </a>
              </p>
            </address>
            <nav aria-label="Документы" className="mt-4 flex flex-col gap-2">
              <a
                href="/payment-info"
                className="text-sm text-neutral-500 transition-colors hover:text-emerald-500"
              >
                Правила оплаты и возврата
              </a>
              <a
                href="/offer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 transition-colors hover:text-emerald-500"
              >
                Договор публичной оферты
              </a>
              <a
                href="/privacy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 transition-colors hover:text-emerald-500"
              >
                Политика конфиденциальности
              </a>
            </nav>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 border-t border-white/10 pt-8">
          {PAYMENTS.map((logo) => (
            <li key={logo.alt} className="flex h-7 items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className={`h-[26px] w-auto max-w-[9.5rem] object-contain opacity-70 grayscale ${
                  logo.invert ? "invert" : ""
                }`}
              />
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-xs text-zinc-500">© 2026 Железный Пульс</p>
      </div>
    </footer>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.4 4.6 2.9 11.5c-1.2.5-1.2 1.1-.2 1.4l4.7 1.5 1.8 5.5c.2.6.1.9.7.9.4 0 .6-.2.9-.4l2.5-2.4 4.7 3.5c.9.5 1.5.2 1.7-.8l2.8-13.2c.3-1.2-.4-1.7-1.4-1.3Zm-3.2 3.1-7.6 6.9-.3 3.3-1.4-4.4 9.3-5.8Z"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true" fill="none">
      <rect
        x="3.2"
        y="3.2"
        width="17.6"
        height="17.6"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M14.2 3.5c.4 2.5 1.8 4.2 4.3 4.6v2.6c-1.5.1-2.9-.4-4.2-1.3v6.3a5.8 5.8 0 1 1-5.8-5.8c.3 0 .7 0 1 .1v2.8a3.1 3.1 0 1 0 2.2 3V3.5h2.5Z"
      />
    </svg>
  );
}
