'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, FileText, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">About Fayda eGov Portal</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Problem Statement */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">The Problem</CardTitle>
            <CardDescription>Current challenges in Ethiopia's land record management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p>Delays in property verification and transfers due to manual processes</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p>High travel and documentation costs for rural citizens</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p>Vulnerability to fraud due to lack of centralized digital verification</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <p>Fragmented land record management across different offices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-600">Our Solution</CardTitle>
            <CardDescription>Digital transformation of land record management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Secure Fayda Digital ID Integration</h4>
                  <p className="text-gray-600">
                    Citizens can securely log in using their Fayda Digital ID (FIN/FAN) with biometric verification
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Digital Form Submission</h4>
                  <p className="text-gray-600">
                    Submit land-related forms online including ownership, transfer, and inheritance applications
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-orange-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Real-time Status Tracking</h4>
                  <p className="text-gray-600">Track application status and receive updates in real-time</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Users className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold">Government Office Integration</h4>
                  <p className="text-gray-600">
                    Seamless integration with relevant government offices for document validation
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expected Outcomes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-600">Expected Outcomes</CardTitle>
            <CardDescription>Benefits for citizens and government</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">For Citizens</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Reduced travel time and costs</li>
                  <li>• Faster application processing</li>
                  <li>• 24/7 access to services</li>
                  <li>• Digital certificate delivery</li>
                  <li>• Transparent process tracking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">For Government</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Reduced administrative burden</li>
                  <li>• Improved data accuracy</li>
                  <li>• Better fraud prevention</li>
                  <li>• Centralized record management</li>
                  <li>• Cost-effective operations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
            <CardDescription>Built with modern, reliable technologies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Frontend</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Next.js</li>
                  <li>• React</li>
                  <li>• Tailwind CSS</li>
                  <li>• Shadcn UI</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Backend</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Next.js API Routes</li>
                  <li>• Node.js</li>
                  <li>• Express</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Integration</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Fayda OIDC</li>
                  <li>• PDF Generation</li>
                  <li>• File Upload</li>
                  <li>• Email OTP</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card>
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of citizens already using our digital land record services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg">Register Now</Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
