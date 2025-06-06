// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

const PUBLIC_PATHS = ['/signin', '/signup', '/forgot-password'];
const PRIVATE_PATHS = ['/dashboard', '/profile', '/settings'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  
  // Skip API routes
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Skip public assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/favicon.ico')) {
    return NextResponse.next();
  }

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isPrivatePath = PRIVATE_PATHS.some(path => pathname.startsWith(path));

  // Kalo route gak perlu protection
  if (!isPublicPath && !isPrivatePath) {
    return NextResponse.next();
  }

  // Kalo udah login tapi mau ke public path
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Kalo belum login tapi mau ke private path
  if (!token && isPrivatePath) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Kalo ada token, validasi
  if (token && isPrivatePath) {
    try {
      // Validasi JWT
      verify(token, process.env.JWT_SECRET!);
      return NextResponse.next();
    } catch (err) {
      console.error('Invalid token:', err);
      const response = NextResponse.redirect(new URL('/signin', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/signin',
    '/signup',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*'
  ]
};