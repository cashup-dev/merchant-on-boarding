import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiServer } from "../../../../../../lib/apiServer";

export async function DELETE(
  req: Request,
  { params }: { params: { promoId: string } }
) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const res = await apiServer.delete(`/bin-bind/${params.promoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: body,
    });

    return NextResponse.json({ success: true, data: res.data });
  } catch (err: any) {
    console.error("❌ Gagal unbind BIN:", err?.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        message: err?.response?.data?.message || "Gagal unbind BIN",
      },
      { status: err?.response?.status || 500 }
    );
  }
}
