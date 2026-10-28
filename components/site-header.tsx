"use client";

import { useEffect, useState } from "react";
import { PulseMark } from "@/components/pulse-mark";

const NAV = [
  { href: "#approach", label: "Подход" },
  { href: "#experience", label: "Опыт" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#contacts", label: "Контакты" },
];

const primaryLinkClass =
  "h-11 items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-black transition duration-300 motion-safe:hover:-translate-y-0.5 hover:bg-[#b8ffd6] hover:shadow-[0_0_32px_rgba(61,255,138,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function closeMenu() {
    document.body.style.overflow = "";
    setOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
            <a
              href="#approach"
              className="flex min-w-0 items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#070708]"
              onClick={closeMenu}
            >
              <PulseMark className="size-9 shrink-0 drop-shadow-[0_0_10px_rgba(61,255,138,0.45)]" />
              <span className="whitespace-nowrap font-heading text-[13px] tracking-tight sm:text-[15px]">
                Железный Пульс
              </span>
            </a>

            <nav aria-label="Разделы страницы" className="hidden items-center gap-8 md:flex">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative text-sm text-zinc-400 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:after:scale-x-100 focus-visible:outline-none focus-visible:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a href="#contacts" className={`hidden sm:inline-flex ${primaryLinkClass}`}>
                Записаться
              </a>
              <button
                type="button"
                className="relative flex size-11 items-center justify-center rounded-full border border-white/10 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Закрыть меню" : "Открыть меню"}
                onClick={() => setOpen((value) => !value)}
              >
                <span
                  className={`absolute h-px w-4 bg-white transition duration-300 ${
                    open ? "translate-y-0 rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`absolute h-px w-4 bg-white transition duration-300 ${
                    open ? "translate-y-0 -rotate-45" : "translate-y-1"
                  }`}
                />
              </button>
            </div>
          </div>
      </header>

      <nav
        id="mobile-nav"
        aria-label="Разделы страницы"
        className={
          open
            ? "fixed inset-x-0 top-16 bottom-0 z-40 flex-col bg-[#070708]/96 px-5 py-8 backdrop-blur-xl max-md:flex md:hidden"
            : "hidden"
        }
      >
        <ul className="flex flex-col gap-1">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-2xl px-2 py-3 font-heading text-3xl tracking-tight text-white transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacts"
          className={`mt-8 inline-flex w-full ${primaryLinkClass}`}
          onClick={closeMenu}
        >
          Записаться
        </a>
      </nav>
    </>
  );
}
