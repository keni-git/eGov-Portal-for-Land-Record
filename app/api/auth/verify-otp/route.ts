import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { faydaId, otp } = await request.json()

    // Simulate OTP verification
    if (otp !== "123456") {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    // Generate mock JWT token (in real app, use proper JWT library)
    const token = Buffer.from(
      JSON.stringify({
        faydaId,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    ).toString("base64")

    return NextResponse.json({
      success: true,
      token,
      user: {
        faydaId,
        name: "Yeruk Sew",
        email: "yeruk.sew@example.com",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "OTP verification failed" }, { status: 500 })
  }
}
