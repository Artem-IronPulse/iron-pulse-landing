import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteTopBar } from "@/components/site-top-bar";
import { TelegramFab } from "@/components/telegram-fab";

export const metadata: Metadata = {
  title: "Правила оплаты и возврата | Железный Пульс",
  description:
    "Порядок заказа, оказания и возврата услуг ИП Ходжоян Артём Саркисович. Оплата банковской картой, цифровые материалы и очные тренировки.",
};

const SECTIONS = [
  {
    title: "1. Порядок заказа услуг",
    text: "Ознакомьтесь с тарифами на сайте. Для оформления заказа свяжитесь с тренером через Telegram по указанной ссылке. После обсуждения фитнес-целей и подтверждения формата работы, вам будет предоставлена безопасная платежная ссылка (счет) для онлайн-оплаты услуг банковской картой.",
  },
  {
    title: "2. Порядок оказания услуг (доставки)",
    text: "Услуги (тренировочные программы, доступ к платформе мониторинга и консультации) предоставляются исключительно в цифровом виде, а также в формате очных тренировок по адресу оказания услуг. Доступ к цифровым материалам открывается в течение 24 часов после успешного подтверждения оплаты банком. Физическая доставка товаров не осуществляется.",
  },
  {
    title: "3. Правила возврата денежных средств",
    text: "При оплате банковской платежной карточкой возврат наличными денежными средствами не допускается. Возврат уплаченной за услуги денежной суммы осуществляется в той же форме, в которой производилась оплата. Возврат осуществляется на ту карточку, с которой была произведена оплата. Срок поступления денежных средств на карточку — от 3 до 30 дней с момента осуществления возврата (в зависимости от банка-эмитента). В случае ошибочного списания средств обращайтесь по контактам администрации сайта.",
  },
];

export default function PaymentInfoPage() {
  return (
    <>
      <SiteTopBar />
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Документы
          </p>
          <h1 className="mt-3 font-heading text-3xl leading-tight tracking-tight text-white sm:text-4xl">
            Правила оплаты и возврата
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            ИП Ходжоян Артём Саркисович, УНП 791392856. Телефон{" "}
            <a href="tel:+375295114184" className="text-zinc-200 hover:text-emerald-400">
              +375 29 511-41-84
            </a>
            , e-mail{" "}
            <a href="mailto:mc_orion@mail.ru" className="text-zinc-200 hover:text-emerald-400">
              mc_orion@mail.ru
            </a>
            .
          </p>
          <div className="mt-10 space-y-8">
            {SECTIONS.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-xl tracking-tight text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
                  {section.text}
                </p>
              </section>
            ))}
          </div>
          <p className="mt-10 text-sm text-zinc-500">
            Заказ и вопросы —{" "}
            <a
              href="https://t.me/mc_orion"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-emerald-400"
            >
              в Telegram
            </a>
            .
          </p>
        </article>
      </main>
      <SiteFooter />
      <TelegramFab />
    </>
  );
}
