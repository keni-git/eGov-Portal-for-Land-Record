"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Clock, CheckCircle, AlertCircle, User, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Application {
  id: string
  type: string
  status: "pending" | "approved" | "rejected" | "in-review"
  submittedDate: string
  description: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [applications, setApplications] = useState<Application[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem("faydaAuth")
    if (!authData) {
      router.push("/auth/login")
      return
    }

    const auth = JSON.parse(authData)
    setUser({
      faydaId: auth.faydaId,
      name: "Yeruk Sew",
      email: "yeruk.sew@example.com",
      address: "Addis Ababa, Ethiopia",
    })

    // Mock applications data
    setApplications([
      {
        id: "1",
        type: "Land Ownership Certificate",
        status: "approved",
        submittedDate: "2025-01-15",
        description: "Application for land ownership certificate - Plot 123, Addis Ababa",
      },
      {
        id: "2",
        type: "Property Transfer",
        status: "in-review",
        submittedDate: "2025-01-20",
        description: "Transfer of property from John Doe to Jane Smith",
      },
      {
        id: "3",
        type: "Inheritance Documentation",
        status: "pending",
        submittedDate: "2025-01-25",
        description: "Inheritance documentation for family property",
      },
    ])
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("faydaAuth")
    router.push("/")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "in-review":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "in-review":
        return <Clock className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Info */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Your Fayda Digital ID information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="text-lg">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Fayda ID</p>
                <p className="text-lg">{user.faydaId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-lg">{user.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/applications/new">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Plus className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">New Application</h3>
                <p className="text-gray-600">Submit a new land record application</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/applications">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">My Applications</h3>
                <p className="text-gray-600">View all your submitted applications</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/certificates">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Certificates</h3>
                <p className="text-gray-600">Download your digital certificates</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>Your latest land record applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">{app.type}</h4>
                    <p className="text-sm text-gray-600 mb-2">{app.description}</p>
                    <p className="text-xs text-gray-500">Submitted: {app.submittedDate}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(app.status)}>
                      {getStatusIcon(app.status)}
                      <span className="ml-1 capitalize">{app.status}</span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/applications">
                <Button variant="outline" className="w-full bg-transparent">
                  View All Applications
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
