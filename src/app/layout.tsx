import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import ReduxProvider from '@/components/providers/ReduxProvider';
import AuthProvider from '@/components/providers/AuthProvider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/providers/ThemProvider';
import { cookies } from 'next/headers';
import { ThemeSync } from '@/components/providers/ThemeSync';

const dmSans = DM_Sans({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Funroad',
  description:
    'Funroad is a modern e-commerce platform for buying and selling digital products including software, eBooks, templates, and more. Instant delivery. Secure payments.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get('theme')?.value;

  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased ${theme}`}>
        <ThemeProvider
          defaultTheme="light"
          attribute="class"
          enableSystem
          disableTransitionOnChange
          // storageKey="funroad-theme"
        >
          <ThemeSync />
          <NuqsAdapter>
            <ReactQueryProvider>
              <ReduxProvider>
                <AuthProvider>{children}</AuthProvider>
                <Toaster />
              </ReduxProvider>
            </ReactQueryProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
