import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteTopBar } from "@/components/site-top-bar";
import { TelegramFab } from "@/components/telegram-fab";

export default function PaymentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteTopBar />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <TelegramFab />
    </>
  );
}
