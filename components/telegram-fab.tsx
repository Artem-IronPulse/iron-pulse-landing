const TELEGRAM_HREF = "https://t.me/mc_orion";

export function TelegramFab() {
  return (
    <a
      href={TELEGRAM_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="fab-pulse fixed right-4 bottom-5 z-40 inline-flex items-center gap-2 rounded-full border-t border-white/55 bg-gradient-to-b from-[#e9fff2] to-accent px-4 py-3 text-sm font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708] sm:right-6"
    >
      <svg viewBox="0 0 24 24" className="size-[18px] shrink-0" aria-hidden="true">
        <path
          fill="currentColor"
          d="M21.4 4.6 2.9 11.5c-1.2.5-1.2 1.1-.2 1.4l4.7 1.5 1.8 5.5c.2.6.1.9.7.9.4 0 .6-.2.9-.4l2.5-2.4 4.7 3.5c.9.5 1.5.2 1.7-.8l2.8-13.2c.3-1.2-.4-1.7-1.4-1.3Zm-3.2 3.1-7.6 6.9-.3 3.3-1.4-4.4 9.3-5.8Z"
        />
      </svg>
      Написать для записи
      <span className="sr-only">, откроется в новой вкладке</span>
    </a>
  );
}
