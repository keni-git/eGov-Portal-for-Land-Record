import { type NextRequest, NextResponse } from "next/server"

// Mock Fayda OIDC integration
export async function POST(request: NextRequest) {
  try {
    const { faydaId } = await request.json()

    // Simulate Fayda ID validation
    if (!faydaId || faydaId.length < 10) {
      return NextResponse.json({ error: "Invalid Fayda ID format" }, { status: 400 })
    }

    // Simulate API call to Fayda backend
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data from Fayda
    const userData = {
      faydaId,
      name: "Yeruk Sew",
      email: "yeruk.sew@example.com",
      phone: "+251911234567",
      address: "Addis Ababa, Ethiopia",
      dateOfBirth: "1990-01-01",
      verified: true,
    }

    return NextResponse.json({
      success: true,
      user: userData,
      otpSent: true,
    })
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}
