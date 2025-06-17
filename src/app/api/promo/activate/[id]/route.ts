// src/app/api/promo/activate/[id]/route.ts
import { NextResponse } from "next/server";
import { apiServer } from "../../../../../../lib/apiServer";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    // Debugging: Log semua headers yang masuk
    const headers = {
      authorization: request.headers.get("Authorization"),
      cookie: request.headers.get("Cookie"),
      contentType: request.headers.get("Content-Type")
    };
    console.log('📢 Request Headers:', headers);

    const { id } = resolvedParams;
    const { isActive } = await request.json();

    // Cara lebih robust untuk ambil token
    let token: string | null = null;
    
    // Cek Authorization header dulu
    const authHeader = request.headers.get("Authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } 
    // Kalo ga ada, cek cookie
    else {
      const cookieHeader = request.headers.get("Cookie");
      token = cookieHeader
        ?.split("; ")
        .find(row => row.trim().startsWith("token="))
        ?.split("=")[1] || null;
    }

    console.log('🔑 Extracted Token:', token); // Debug token

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Token tidak ditemukan",
          solution: "Pastikan mengirim Authorization header atau cookie"
        },
        { status: 401 }
      );
    }

    // Forward request ke API utama
    const res = await apiServer.post(
      `/promo/activate/${id}`,
      { isActive },
      {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: res.data.message,
      data: res.data.data
    });

  } catch (err: any) {
    console.error('🔥 Full Error:', {
      message: err.message,
      stack: err.stack,
      response: err?.response?.data
    });

    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
      },
      { status: err?.response?.status || 500 }
    );
  }
}