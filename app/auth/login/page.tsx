"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    faydaId: "",
    otp: "",
  })
  const [step, setStep] = useState<"fayda" | "otp">("fayda")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleFaydaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate Fayda ID verification
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (formData.faydaId.length < 10) {
        throw new Error("Invalid Fayda ID format")
      }

      setStep("otp")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed")
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (formData.otp !== "123456") {
        throw new Error("Invalid OTP")
      }

      // Store auth state (in real app, use proper JWT/session management)
      localStorage.setItem(
        "faydaAuth",
        JSON.stringify({
          faydaId: formData.faydaId,
          authenticated: true,
          timestamp: Date.now(),
        }),
      )

      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Login to Fayda eGov</CardTitle>
          <CardDescription>
            {step === "fayda"
              ? "Enter your Fayda Digital ID to continue"
              : "Enter the OTP sent to your registered mobile number"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {step === "fayda" ? (
            <form onSubmit={handleFaydaSubmit} className="space-y-4">
              <div>
                <Label htmlFor="faydaId">Fayda ID (FIN/FAN)</Label>
                <Input
                  id="faydaId"
                  type="text"
                  placeholder="Enter your Fayda ID"
                  value={formData.faydaId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, faydaId: e.target.value }))}
                  required
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div>
                <Label htmlFor="otp">One-Time Password</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={formData.otp}
                  onChange={(e) => setFormData((prev) => ({ ...prev, otp: e.target.value }))}
                  maxLength={6}
                  required
                  disabled={loading}
                />
                <p className="text-sm text-gray-500 mt-1">Demo OTP: 123456</p>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => setStep("fayda")}
                disabled={loading}
              >
                Back
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have a Fayda ID?{" "}
              <Link href="/auth/register" className="text-green-600 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
