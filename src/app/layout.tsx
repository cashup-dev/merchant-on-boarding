import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'sonner'; // ? tambahkan ini
import I18nProvider from '@/components/providers/I18nProvider';

// Disable static prerender to avoid build-time URL/env issues
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-900">
        <Toaster position="top-center" richColors closeButton /> {/* ? tambahkan ini */}
        <I18nProvider>
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
