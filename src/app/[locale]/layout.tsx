import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '../globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/store/StoreProvider';

export const metadata: Metadata = {
  title: 'MED YORDAM',
  description: '',
  keywords: '',
  authors: [{ name: 'Rustam Kidiraliyev + RESULT AGENCY', url: 'https://my-works-ten.vercel.app/' }],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // `params` obyektini kutish
  const { locale } = await params;

  // `locale`ni `getMessages`ga uzatish
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      </head>
      <body >
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
