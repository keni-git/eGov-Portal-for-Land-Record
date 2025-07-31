"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  User,
  FileText,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  Plus,
} from "lucide-react"
import Link from "next/link"

interface LandRecord {
  id: string
  plotNumber: string
  location: string
  area: string
  ownerName: string
  registrationDate: string
  status: "active" | "pending" | "transferred"
  certificateId: string
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [faydaId, setFaydaId] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [landRecords, setLandRecords] = useState<LandRecord[]>([
    {
      id: "1",
      plotNumber: "AA-001-2024",
      location: "Addis Ababa, Bole Sub-City",
      area: "500 sq meters",
      ownerName: "Yeruk Sew",
      registrationDate: "2024-01-15",
      status: "active",
      certificateId: "CERT-AA-001-2024",
    },
    {
      id: "2",
      plotNumber: "AA-002-2024",
      location: "Addis Ababa, Kirkos Sub-City",
      area: "750 sq meters",
      ownerName: "Yeruk Sew",
      registrationDate: "2024-02-20",
      status: "pending",
      certificateId: "CERT-AA-002-2024",
    },
  ])
  const [newRecord, setNewRecord] = useState({
    plotNumber: "",
    location: "",
    area: "",
    ownerName: "",
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleFaydaLogin = () => {
    if (faydaId.length >= 10) {
      setIsAuthenticated(true)
      setUserData({
        faydaId: faydaId,
        name: "Yeruk Sew",
        email: "yeruk.sew@example.com",
        phone: "+251911234567",
        address: "Addis Ababa, Ethiopia",
      })
      setCurrentStep(2)
    }
  }

  const handleAddRecord = () => {
    if (newRecord.plotNumber && newRecord.location && newRecord.area) {
      const record: LandRecord = {
        id: (landRecords.length + 1).toString(),
        plotNumber: newRecord.plotNumber,
        location: newRecord.location,
        area: newRecord.area,
        ownerName: userData?.name || "Yeruk Sew",
        registrationDate: new Date().toISOString().split("T")[0],
        status: "pending",
        certificateId: `CERT-${newRecord.plotNumber}`,
      }
      setLandRecords([...landRecords, record])
      setNewRecord({ plotNumber: "", location: "", area: "", ownerName: "" })
      setShowAddForm(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "transferred":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "transferred":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">eGov Land - Live Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? "bg-green-500" : "bg-gray-300"}`}></div>
                <span className="text-sm">Auth</span>
                <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? "bg-green-500" : "bg-gray-300"}`}></div>
                <span className="text-sm">Dashboard</span>
                <div className={`w-3 h-3 rounded-full ${currentStep >= 3 ? "bg-green-500" : "bg-gray-300"}`}></div>
                <span className="text-sm">Records</span>
              </div>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Step 1: Fayda Authentication Demo */}
        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Shield className="h-16 w-16 text-green-600" />
                </div>
                <CardTitle className="text-2xl">🎬 Demo: Fayda Authentication</CardTitle>
                <CardDescription>Experience secure login with Fayda Digital ID (Demo Mode)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Demo Instructions:</h4>
                  <p className="text-sm text-blue-800">
                    Enter any Fayda ID (10+ characters) to simulate the authentication process. In production, this
                    would redirect to the real Fayda portal.
                  </p>
                </div>

                <div>
                  <Label htmlFor="faydaId">Fayda ID (FIN/FAN)</Label>
                  <Input
                    id="faydaId"
                    type="text"
                    placeholder="Enter demo Fayda ID (e.g., 3126894653473958)"
                    value={faydaId}
                    onChange={(e) => setFaydaId(e.target.value)}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Try: 3126894653473958 or 6230247319356120</p>
                </div>

                <Button
                  onClick={handleFaydaLogin}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={faydaId.length < 10}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Authenticate with Fayda ID
                </Button>

                <div className="text-center text-sm text-gray-600">
                  <p>In production: Redirects to ida.fayda.et for biometric verification</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: User Dashboard */}
        {currentStep === 2 && isAuthenticated && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h2>
              <p className="text-gray-600">Manage your land records and applications</p>
            </div>

            {/* User Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Profile Information (From Fayda)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-lg">{userData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fayda ID</p>
                    <p className="text-lg">{userData.faydaId}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg">{userData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-lg">{userData.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setCurrentStep(3)}>
                <CardContent className="p-6 text-center">
                  <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">View Land Records</h3>
                  <p className="text-gray-600">See all your registered properties</p>
                  <Badge className="mt-2">{landRecords.length} Records</Badge>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowAddForm(true)}>
                <CardContent className="p-6 text-center">
                  <Plus className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Add New Record</h3>
                  <p className="text-gray-600">Register a new land property</p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Download className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Download Certificates</h3>
                  <p className="text-gray-600">Get digital land certificates</p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <Button onClick={() => setCurrentStep(3)} size="lg" className="bg-blue-600 hover:bg-blue-700">
                <FileText className="mr-2 h-4 w-4" />
                View My Land Records
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Land Records Management */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">My Land Records</h2>
                <p className="text-gray-600">Manage and track your property registrations</p>
              </div>
              <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Add New Record
              </Button>
            </div>

            {/* Add New Record Form */}
            {showAddForm && (
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-800">Add New Land Record</CardTitle>
                  <CardDescription>Register a new property in the system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="plotNumber">Plot Number</Label>
                      <Input
                        id="plotNumber"
                        placeholder="e.g., AA-003-2024"
                        value={newRecord.plotNumber}
                        onChange={(e) => setNewRecord({ ...newRecord, plotNumber: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="area">Area (sq meters)</Label>
                      <Input
                        id="area"
                        placeholder="e.g., 1000"
                        value={newRecord.area}
                        onChange={(e) => setNewRecord({ ...newRecord, area: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Addis Ababa, Yeka Sub-City"
                      value={newRecord.location}
                      onChange={(e) => setNewRecord({ ...newRecord, location: e.target.value })}
                    />
                  </div>
                  <div className="flex space-x-4">
                    <Button onClick={handleAddRecord} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Add Record
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Land Records List */}
            <div className="grid gap-6">
              {landRecords.map((record) => (
                <Card key={record.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <h3 className="text-xl font-semibold">{record.plotNumber}</h3>
                          <Badge className={getStatusColor(record.status)}>
                            {getStatusIcon(record.status)}
                            <span className="ml-1 capitalize">{record.status}</span>
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Location</p>
                            <p className="text-gray-900">{record.location}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Area</p>
                            <p className="text-gray-900">{record.area}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Owner</p>
                            <p className="text-gray-900">{record.ownerName}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Registration Date</p>
                            <p className="text-gray-900 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {record.registrationDate}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        {record.status === "active" && (
                          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                            <Download className="h-4 w-4 mr-1" />
                            Download Certificate
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Demo Summary */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">🎉 Demo Complete!</h3>
                <p className="text-gray-600 mb-4">
                  You've experienced the complete eGov Land workflow: Authentication → Dashboard → Records Management
                </p>
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() => {
                      setCurrentStep(1)
                      setIsAuthenticated(false)
                      setFaydaId("")
                    }}
                    variant="outline"
                  >
                    Restart Demo
                  </Button>
                  <Link href="/auth/login">
                    <Button className="bg-green-600 hover:bg-green-700">Try Real Login</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
