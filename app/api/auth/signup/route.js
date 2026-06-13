import { NextResponse } from "next/server";
import { neon } from '@neondatabase/serverless';
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!email || !password || !name) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    const sql = neon(process.env.DATABASE_URL);
    const existingUsers = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existingUsers.length > 0) {
      return NextResponse.json({ message: "User already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 1. Generate a secure random token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // 2. Insert user as UNVERIFIED with the token
    await sql`
      INSERT INTO users (name, email, password_hash, role, is_verified, verification_token) 
      VALUES (${name}, ${email}, ${hashedPassword}, 'user', FALSE, ${verificationToken})
    `;

    // 3. Send the Activation Link via Resend
    const activationLink = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${verificationToken}`;
    
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "no-reply@halfdigit.com", // Your verified Resend domain
        to: email,
        subject: "Activate your HalfDigit Account",
        html: `
          <h2>Welcome to HalfDigit, ${name}!</h2>
          <p>Please click the link below to verify your email and access the AI Assistant.</p>
          <a href="${activationLink}" style="padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">Verify My Account</a>
        `
      })
    });

    return NextResponse.json({ message: "Please check your email to activate your account." }, { status: 201 });

  } catch (error) {
    console.error("Sign Up Error:", error);
    return NextResponse.json({ message: "Internal server error." }, { status: 500 });
  }
}