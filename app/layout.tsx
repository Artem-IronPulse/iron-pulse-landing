import type { Metadata, Viewport } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Железный Пульс | Научный подход к фитнесу в Минске и онлайн",
  description:
    "Персональный тренинг по RPE и HRV от эксперта с 17-летним стажем. Индивидуальные программы, онлайн-наставничество и тренировки в клубе Адреналин Max.",
  openGraph: {
    title: "Железный Пульс | Научный подход к фитнесу в Минске и онлайн",
    description:
      "Персональный тренинг по RPE и HRV от эксперта с 17-летним стажем. Индивидуальные программы, онлайн-наставничество и тренировки в клубе Адреналин Max.",
    locale: "ru_BY",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${unbounded.variable} font-sans h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
