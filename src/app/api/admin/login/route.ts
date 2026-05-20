import { NextResponse } from "next/server";

const defaultPassword = "paxton-demo-2026";
const defaultToken = "paxton-admin-demo-session";

export async function POST(request: Request) {
  const body = await request.json();
  const password = String(body.password ?? "");
  const expectedPassword = process.env.ADMIN_PASSWORD ?? defaultPassword;

  if (password !== expectedPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("paxton_admin_session", process.env.ADMIN_SESSION_TOKEN ?? defaultToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
