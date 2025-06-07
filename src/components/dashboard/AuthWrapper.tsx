'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const publicPaths = ['/signin', '/signup', '/forgot-password'];
    const isPublicPath = publicPaths.some(path => 
      pathname.startsWith(path)
    );

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check', {
            credentials: 'include',
            cache: 'no-store'
        });

        const data = await res.json();
        setIsAuthenticated(data.authenticated);

        // Kalo udah login tapi mau akses halaman public
        if (data.authenticated && isPublicPath) {
          router.replace('/');
          return;
        }
        
        // Kalo belum login tapi mau akses halaman private
        if (!data.authenticated && !isPublicPath) {
          router.replace('/signin');
          return;
        }

        setChecking(false);
      } catch (err) {
        console.error('Auth check failed', err);
        router.replace('/signin');
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Tambahan pengecekan lagi setelah state diupdate
  useEffect(() => {
    const publicPaths = ['/signin', '/signup', '/forgot-password'];
    const isPublicPath = publicPaths.some(path => 
      pathname.startsWith(path)
    );

    if (!checking && isAuthenticated && isPublicPath) {
      router.replace('/');
    }
    
  }, [checking, isAuthenticated, pathname, router]);

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}