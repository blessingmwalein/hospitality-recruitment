"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Download, CheckCircle, XCircle, Clock, Calendar } from "lucide-react"
import type { RootState } from "@/lib/store/store"
import { Label } from "@/components/ui/label"

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    applicant: {
      id: 101,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
    },
    job: {
      id: 1,
      title: "Cruise Ship Waiter",
      company: "Royal Caribbean",
      location: "Mediterranean Route",
    },
    appliedAt: "2024-01-15T10:00:00Z",
    status: "pending",
    notes: "",
  },
  {
    id: 2,
    applicant: {
      id: 102,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+1 (555) 234-5678",
    },
    job: {
      id: 2,
      title: "Hotel Receptionist",
      company: "Marriott International",
      location: "Dubai, UAE",
    },
    appliedAt: "2024-01-14T14:30:00Z",
    status: "shortlisted",
    notes: "Strong candidate with excellent communication skills.",
  },
  {
    id: 3,
    applicant: {
      id: 103,
      name: "David Chen",
      email: "david.chen@example.com",
      phone: "+1 (555) 345-6789",
    },
    job: {
      id: 3,
      title: "Entertainment Host",
      company: "Norwegian Cruise Line",
      location: "Caribbean Route",
    },
    appliedAt: "2024-01-13T09:15:00Z",
    status: "interview",
    notes: "Interview scheduled for January 25th at 10:00 AM via Zoom.",
  },
  {
    id: 4,
    applicant: {
      id: 104,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 456-7890",
    },
    job: {
      id: 4,
      title: "Sous Chef",
      company: "Celebrity Cruises",
      location: "Alaska Route",
    },
    appliedAt: "2024-01-12T16:45:00Z",
    status: "approved",
    notes: "Offer letter sent. Awaiting confirmation.",
  },
  {
    id: 5,
    applicant: {
      id: 105,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 567-8901",
    },
    job: {
      id: 5,
      title: "Spa Therapist",
      company: "Four Seasons Resort",
      location: "Maldives",
    },
    appliedAt: "2024-01-11T11:20:00Z",
    status: "rejected",
    notes: "Not enough experience for this position.",
  },
  {
    id: 6,
    applicant: {
      id: 106,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+1 (555) 678-9012",
    },
    job: {
      id: 1,
      title: "Cruise Ship Waiter",
      company: "Royal Caribbean",
      location: "Mediterranean Route",
    },
    appliedAt: "2024-01-10T13:40:00Z",
    status: "pending",
    notes: "",
  },
  {
    id: 7,
    applicant: {
      id: 107,
      name: "James Lee",
      email: "james.lee@example.com",
      phone: "+1 (555) 789-0123",
    },
    job: {
      id: 2,
      title: "Hotel Receptionist",
      company: "Marriott International",
      location: "Dubai, UAE",
    },
    appliedAt: "2024-01-09T09:30:00Z",
    status: "shortlisted",
    notes: "Previous experience at Hilton. Good fit for the role.",
  },
  {
    id: 8,
    applicant: {
      id: 108,
      name: "Sophia Martinez",
      email: "sophia.martinez@example.com",
      phone: "+1 (555) 890-1234",
    },
    job: {
      id: 3,
      title: "Entertainment Host",
      company: "Norwegian Cruise Line",
      location: "Caribbean Route",
    },
    appliedAt: "2024-01-08T15:20:00Z",
    status: "interview",
    notes: "Interview scheduled for January 26th at 2:00 PM via Zoom.",
  },
]

export default function AdminApplicationsPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [jobFilter, setJobFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState("all")
  const [statusNote, setStatusNote] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin/applications")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Replace with actual API call
  const applications = mockApplications
  const isLoading = false

  // Filter applications based on active tab, search query, and filters
  const filteredApplications = applications
    .filter((app) => activeTab === "all" || app.status === activeTab)
    .filter((app) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        app.applicant.name.toLowerCase().includes(query) ||
        app.applicant.email.toLowerCase().includes(query) ||
        app.job.title.toLowerCase().includes(query) ||
        app.job.company.toLowerCase().includes(query)
      )
    })
    .filter((app) => statusFilter === "all" || app.status === statusFilter)
    .filter((app) => jobFilter === "all" || app.job.title === jobFilter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "shortlisted":
        return "bg-blue-100 text-blue-700"
      case "interview":
        return "bg-purple-100 text-purple-700"
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 mr-1" />
      case "shortlisted":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "interview":
        return <Calendar className="h-4 w-4 mr-1" />
      case "approved":
        return <CheckCircle className="h-4 w-4 mr-1" />
      case "rejected":
        return <XCircle className="h-4 w-4 mr-1" />
      default:
        return null
    }
  }

  // Get unique job titles for filter
  const jobTitles = Array.from(new Set(applications.map((app) => app.job.title)))

  const openStatusDialog = (application: any) => {
    setSelectedApplication(application)
    setNewStatus(application.status)
    setStatusNote(application.notes || "")
    setIsStatusDialogOpen(true)
  }

  const handleUpdateStatus = async () => {
    setIsUpdating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would update the application status via API
    // For now, we'll just close the dialog
    setIsStatusDialogOpen(false)
    setIsUpdating(false)
  }

  const handleExportCSV = async () => {
    // In a real app, this would trigger a CSV download
    alert("CSV export functionality would be implemented here")
  }

  if (!isAuthenticated || !isAdmin) {
    return null // Return null while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications Management</h1>
            <p className="text-gray-600 mt-2">Review and manage job applications</p>
          </div>
          <Button onClick={handleExportCSV} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search applications..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interview">Interview</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-48">
                  <Select value={jobFilter} onValueChange={setJobFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Job Title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Jobs</SelectItem>
                      {jobTitles.map((title) => (
                        <SelectItem key={title} value={title}>
                          {title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <TabsList className="grid grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>
                  {activeTab === "all" ? "All" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Applications
                </CardTitle>
                <CardDescription>
                  {filteredApplications.length} application{filteredApplications.length !== 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : filteredApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No applications found matching your criteria.</p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("")
                        setStatusFilter("all")
                        setJobFilter("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="px-4 py-3">Applicant</th>
                          <th className="px-4 py-3">Job</th>
                          <th className="px-4 py-3">Applied</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredApplications.map((application) => (
                          <tr key={application.id}>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{application.applicant.name}</div>
                              <div className="text-sm text-gray-500">{application.applicant.email}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{application.job.title}</div>
                              <div className="text-xs text-gray-500">{application.job.company}</div>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(application.appliedAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              <Badge className={getStatusColor(application.status)}>
                                <span className="flex items-center">
                                  {getStatusIcon(application.status)}
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                              </Badge>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem
                                    onClick={() => router.push(`/admin/applications/${application.id}`)}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => openStatusDialog(application)}>
                                    Update Status
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => router.push(`/admin/users/${application.applicant.id}`)}
                                  >
                                    View Applicant
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => router.push(`/admin/jobs/${application.job.id}`)}>
                                    View Job
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Change the status for {selectedApplication?.applicant.name}'s application for{" "}
              {selectedApplication?.job.title}.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Add notes about this status change"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={isUpdating} className="bg-emerald-600 hover:bg-emerald-700">
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
