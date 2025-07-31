"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Calendar,
  User,
  FileText,
  Download,
  Eye,
  Plus,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface LandRecord {
  id: string
  plotNumber: string
  location: string
  area: string
  ownerName: string
  registrationDate: string
  status: "active" | "pending" | "transferred" | "disputed"
  certificateId: string
  landType: string
  registrationFee: string
  documents: string[]
}

export default function RecordsPage() {
  const [records, setRecords] = useState<LandRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<LandRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  const [newRecord, setNewRecord] = useState({
    plotNumber: "",
    location: "",
    area: "",
    landType: "",
    registrationFee: "",
    description: "",
  })

  useEffect(() => {
    // Check authentication
    const authData = localStorage.getItem("faydaAuth")
    if (!authData) {
      router.push("/auth/login")
      return
    }

    const auth = JSON.parse(authData)
    setUser(auth)

    // Load sample records
    const sampleRecords: LandRecord[] = [
      {
        id: "1",
        plotNumber: "AA-001-2024",
        location: "Addis Ababa, Bole Sub-City, Woreda 03",
        area: "500",
        ownerName: auth.name || "Yeruk Sew",
        registrationDate: "2024-01-15",
        status: "active",
        certificateId: "CERT-AA-001-2024",
        landType: "Residential",
        registrationFee: "5,000 ETB",
        documents: ["Title Deed", "Survey Report", "Tax Certificate"],
      },
      {
        id: "2",
        plotNumber: "AA-002-2024",
        location: "Addis Ababa, Kirkos Sub-City, Woreda 08",
        area: "750",
        ownerName: auth.name || "Yeruk Sew",
        registrationDate: "2024-02-20",
        status: "pending",
        certificateId: "CERT-AA-002-2024",
        landType: "Commercial",
        registrationFee: "8,500 ETB",
        documents: ["Application Form", "Survey Report"],
      },
      {
        id: "3",
        plotNumber: "OR-003-2024",
        location: "Oromia, Adama City, Zone 02",
        area: "1200",
        ownerName: auth.name || "Yeruk Sew",
        registrationDate: "2024-03-10",
        status: "transferred",
        certificateId: "CERT-OR-003-2024",
        landType: "Agricultural",
        registrationFee: "3,200 ETB",
        documents: ["Transfer Agreement", "Previous Title", "Tax Clearance"],
      },
    ]

    setRecords(sampleRecords)
    setFilteredRecords(sampleRecords)
  }, [router])

  useEffect(() => {
    let filtered = records

    if (searchTerm) {
      filtered = filtered.filter(
        (record) =>
          record.plotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          record.landType.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((record) => record.status === statusFilter)
    }

    setFilteredRecords(filtered)
  }, [searchTerm, statusFilter, records])

  const handleAddRecord = () => {
    if (newRecord.plotNumber && newRecord.location && newRecord.area) {
      const record: LandRecord = {
        id: (records.length + 1).toString(),
        plotNumber: newRecord.plotNumber,
        location: newRecord.location,
        area: newRecord.area,
        ownerName: user?.name || "Yeruk Sew",
        registrationDate: new Date().toISOString().split("T")[0],
        status: "pending",
        certificateId: `CERT-${newRecord.plotNumber}`,
        landType: newRecord.landType,
        registrationFee: newRecord.registrationFee,
        documents: ["Application Form"],
      }

      const updatedRecords = [...records, record]
      setRecords(updatedRecords)
      setFilteredRecords(updatedRecords)
      setNewRecord({
        plotNumber: "",
        location: "",
        area: "",
        landType: "",
        registrationFee: "",
        description: "",
      })
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
      case "disputed":
        return "bg-red-100 text-red-800"
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
        return <FileText className="h-4 w-4" />
      case "disputed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const downloadCertificate = (record: LandRecord) => {
    // Simulate certificate download
    const certificateData = `
DIGITAL LAND CERTIFICATE
========================

Certificate ID: ${record.certificateId}
Plot Number: ${record.plotNumber}
Owner: ${record.ownerName}
Location: ${record.location}
Area: ${record.area} sq meters
Land Type: ${record.landType}
Registration Date: ${record.registrationDate}
Status: ${record.status.toUpperCase()}

This is a digitally generated certificate from eGov Land system.
Verified through Fayda Digital ID integration.

Generated on: ${new Date().toLocaleString()}
    `

    const blob = new Blob([certificateData], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${record.certificateId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
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
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Land Records Management</h1>
            </div>
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by plot number, location, or land type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="transferred">Transferred</SelectItem>
                    <SelectItem value="disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Record Form */}
        {showAddForm && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Add New Land Record</CardTitle>
              <CardDescription>Register a new property in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="plotNumber">Plot Number *</Label>
                  <Input
                    id="plotNumber"
                    placeholder="e.g., AA-004-2024"
                    value={newRecord.plotNumber}
                    onChange={(e) => setNewRecord({ ...newRecord, plotNumber: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="area">Area (sq meters) *</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="e.g., 1000"
                    value={newRecord.area}
                    onChange={(e) => setNewRecord({ ...newRecord, area: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Addis Ababa, Yeka Sub-City, Woreda 05"
                  value={newRecord.location}
                  onChange={(e) => setNewRecord({ ...newRecord, location: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="landType">Land Type</Label>
                  <Select onValueChange={(value) => setNewRecord({ ...newRecord, landType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select land type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="registrationFee">Registration Fee (ETB)</Label>
                  <Input
                    id="registrationFee"
                    placeholder="e.g., 5000"
                    value={newRecord.registrationFee}
                    onChange={(e) => setNewRecord({ ...newRecord, registrationFee: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Additional Description</Label>
                <Textarea
                  id="description"
                  placeholder="Any additional information about the property..."
                  value={newRecord.description}
                  onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                  rows={3}
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

        {/* Records Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {records.filter((r) => r.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Active Records</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {records.filter((r) => r.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {records.filter((r) => r.status === "transferred").length}
              </div>
              <div className="text-sm text-gray-600">Transferred</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{records.length}</div>
              <div className="text-sm text-gray-600">Total Records</div>
            </CardContent>
          </Card>
        </div>

        {/* Records List */}
        <div className="space-y-6">
          {filteredRecords.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No records found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          ) : (
            filteredRecords.map((record) => (
              <Card key={record.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-3">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <h3 className="text-xl font-semibold">{record.plotNumber}</h3>
                        <Badge className={getStatusColor(record.status)}>
                          {getStatusIcon(record.status)}
                          <span className="ml-1 capitalize">{record.status}</span>
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Location</p>
                          <p className="text-gray-900">{record.location}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Area</p>
                          <p className="text-gray-900">{record.area} sq meters</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Land Type</p>
                          <p className="text-gray-900 capitalize">{record.landType}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
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
                        <div>
                          <p className="text-sm font-medium text-gray-500">Registration Fee</p>
                          <p className="text-gray-900">{record.registrationFee}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500 mb-2">Documents</p>
                        <div className="flex flex-wrap gap-2">
                          {record.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-6">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      {record.status === "active" && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => downloadCertificate(record)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download Certificate
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
