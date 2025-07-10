import { jwtDecode } from 'jwt-decode'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface TokenPayload {
  sub: string;    // username
  id: number;     // user ID
  roles: Array<{ authority: string }>;  // roles array
  iat: number;    // issued at
  exp: number;    // expiration time
  partnerId?: number;
  partnerName?: string;
}

export interface UserData {
  id: number;
  username: string;
  roles: Array<{ authority: string }>;
  partnerId?: number;
  partnerName?: string; 
}

const protectedRoutes = [
  '/profile',
  '/bin-management',
  '/eligibility-management',
  '/merchant-management',
  '/promo-management',
  '/usage-history'
]

const adminOnlyRoutes = [
  '/promo-management/merchant-bind',
  '/promo-management/bin-bind',
  '/promo-management/edit',
]
const authRoutes = ['/signin', '/signup']

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('token')?.value

  if (pathname === '/' || protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!accessToken) {
      const signinUrl = new URL('/signin', request.url)
      return NextResponse.redirect(signinUrl)
    }

    try {
          if (!accessToken) {
            return NextResponse.json(
              { message: 'Authentication token not found.' },
              { status: 401 }
            );
          }
          const decodedToken = jwtDecode<TokenPayload>(accessToken);

          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp < currentTime) {
            (await cookieStore).delete('token');
            return NextResponse.json(
              { message: 'Token has expired.' },
              { status: 401 }
            );
          }

          const user: UserData = {
            id: decodedToken.id,
            username: decodedToken.sub,
            roles: decodedToken.roles,  // Assign roles as array of objects with authority property
            partnerId: decodedToken.partnerId, 
            partnerName:  decodedToken.partnerName// Optional, if you want to include it
          };

          if (adminOnlyRoutes.includes(pathname) && !user.roles.some(role => role.authority === 'ADMIN')) {
            return NextResponse.json(
              { message: 'Access denied. Admins only.' },
              { status: 403 }
            );
          }
      
    } catch (err) {
      const signinUrl = new URL('/signin', request.url)
      signinUrl.searchParams.set('error', 'session_expired')
      const response = NextResponse.redirect(signinUrl)
      response.cookies.delete('accessToken')
      return response
    }
  }

  // Jika sudah signin tapi mencoba akses rute auth
  if (authRoutes.includes(pathname) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Config untuk menentukan rute yang akan diproses middleware
export const config = {
  matcher: [
    '/',
    '/signin',
    '/signup',
    '/profile',
    '/bin-management',
    '/eligibility-management',
    '/merchant-management',
    '/promo-management',
    '/usage-history',
    '/profile/:path*',
    '/bin-management/:path*',
    '/eligibility-management/:path*',
    '/merchant-management/:path*',
    '/promo-management/:path*',
    '/usage-history/:path*'
  ],
}