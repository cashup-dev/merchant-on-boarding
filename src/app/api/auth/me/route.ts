import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

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

export async function GET() {
  try {
    // 1. Get cookie store
    const cookieStore = cookies();

    // 2. Find token cookie
    const tokenCookie = (await cookieStore).get('token');
    
    // 3. If no token found
    if (!tokenCookie) {
      return NextResponse.json(
        { message: 'Authentication token not found.' },
        { status: 401 }
      );
    }

    const token = tokenCookie.value;

    // 4. Decode the token
    const decodedToken = jwtDecode<TokenPayload>(token);
    // console.log('Decoded Token', decodedToken);

    // 5. Check if token is expired
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTime) {
      (await cookieStore).delete('token');
      return NextResponse.json(
        { message: 'Token has expired.' },
        { status: 401 }
      );
    }

    // 6. Prepare user data to send to client
    const user: UserData = {
      id: decodedToken.id,
      username: decodedToken.sub,
      roles: decodedToken.roles,  // Assign roles as array of objects with authority property
      partnerId: decodedToken.partnerId, 
      partnerName:  decodedToken.partnerName// Optional, if you want to include it
    };

    // console.log('User Data:', user);

    // 7. Return user data
    return NextResponse.json({ user });

  } catch (error) {
    console.error('API /auth/me error:', error);
    return NextResponse.json(
      { message: 'Invalid or malformed token.' },
      { status: 401 }
    );
  }
}