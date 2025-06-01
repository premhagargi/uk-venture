
import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { APP_NAME } from '@/lib/constants';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
  display: 'swap', // Ensures text remains visible during font loading
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: `UK Venture: A cutting-edge financial services company offering stock broking and investment solutions with a focus on technology, transparency, and trust.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow pt-16 md:pt-0">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
