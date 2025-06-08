import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true, message: 'Logout berhasil' });

  // Hapus cookie dengan nama 'token'
  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0), // expired langsung
    path: '/',
  });

  return response;
}
