const CHANNEL_HREF = "https://t.me/ZHELEZNYPULS";

export function SiteTopBar() {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-white/10 backdrop-blur-xl">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-center gap-3 px-4 sm:px-6 md:justify-between lg:px-8">
          <p className="hidden min-w-0 truncate text-sm text-white/90 md:block">
            Больше о биомеханике в моем Telegram
          </p>
          <a
            href={CHANNEL_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-xl transition-colors hover:border-white/40 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:text-xs"
          >
            Подписаться на @ZHELEZNYPULS
            <span className="sr-only">, откроется в новой вкладке</span>
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="h-14" />
    </>
  );
}
