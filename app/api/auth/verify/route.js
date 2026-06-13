// app/api/auth/verify/route.js
import { NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Invalid or missing token." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL);

    // 1. Find user by token
    const users = await sql`SELECT id FROM users WHERE verification_token = ${token}`;
    
    if (users.length === 0) {
      return NextResponse.json({ message: "Invalid or expired token." }, { status: 400 });
    }

    // 2. Activate Account & Nullify Token
    await sql`
      UPDATE users 
      SET is_verified = TRUE, verification_token = NULL 
      WHERE id = ${users[0].id}
    `;

    // 3. Redirect to login/home with a success flag
    return NextResponse.redirect(new URL("/login?verified=true", req.url));

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}