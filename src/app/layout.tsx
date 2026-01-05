import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from 'sonner'; // ✅ tambahkan ini
import { AuthSessionProvider } from '@/components/auth/AuthSessionProvider';

const outfit = Outfit({
  subsets: ["latin"],
});

// Disable static prerender to avoid build-time URL/env issues
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <Toaster position="top-center" richColors closeButton /> {/* ✅ tambahkan ini */}
        <AuthSessionProvider>
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
