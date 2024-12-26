import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '../globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/store/StoreProvider';

export const metadata: Metadata = {
  title: 'Med Yordam',
  description: 'Med Yordam – ваш надежный онлайн-помощник в сфере здравоохранения. Получите доступ к консультациям врачей, полезным советам по здоровью и проверенным медицинским ресурсам. Наша платформа предлагает услуги телемедицины, поддержку пациентов и современные решения для мониторинга здоровья. Будьте уверены в своем здоровье с помощью Med Yordam – мы всегда рядом, чтобы помочь!',
  keywords: 'медицинские услуги, онлайн здравоохранение, телемедицина, консультации врачей, врачи онлайн, медицинские советы, платформа здравоохранения, решения для телемедицины, советы по здоровью, медицинские записи, медицинские ресурсы, мониторинг здоровья, фитнес-трекер, поддержка психического здоровья, виртуальный врач, медицинские консультации, медицинская помощь, поддержка пациентов, медицинская информация, рекомендации по здоровью, запись к врачу, доступные медицинские услуги, здоровый образ жизни, надежная медицинская платформа, профессиональные медицинские советы, удаленное здравоохранение, медицинский чат, Med Yordam, Result Agency медицинские решения',
  authors: [{ name: 'Рустам Кидиралиев + RESULT AGENCY', url: 'https://my-works-ten.vercel.app/' }],
};


export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" sizes="180x180" />
        <link rel="icon" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <StoreProvider>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
