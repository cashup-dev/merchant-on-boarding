import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const token = (await cookies()).get('token');
  
  if (!token) {
    return NextResponse.json(
      { authenticated: false }, 
      { status: 401 }
    );
  } else {
    return NextResponse.json({ 
      authenticated: true 
    });
  }

  return NextResponse.json({ 
    authenticated: true 
  });
}