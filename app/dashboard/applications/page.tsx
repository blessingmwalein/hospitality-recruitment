"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MapPin, Calendar, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react"
import Link from "next/link"

// Mock data for applications
const mockApplications = [
  {
    id: 1,
    job: {
      id: 1,
      title: "Cruise Ship Waiter",
      company: "Royal Caribbean",
      location: "Mediterranean Route",
      deadline: "2024-02-15",
      salary: "$1,800-2,200/month",
    },
    status: "shortlisted",
    appliedAt: "2024-01-15T10:00:00Z",
    notes: "Interview scheduled for next week",
    updatedAt: "2024-01-18T14:30:00Z",
  },
  {
    id: 2,
    job: {
      id: 2,
      title: "Hotel Receptionist",
      company: "Marriott International",
      location: "Dubai, UAE",
      deadline: "2024-02-20",
      salary: "$2,500-3,000/month",
    },
    status: "pending",
    appliedAt: "2024-01-20T14:30:00Z",
    notes: null,
    updatedAt: null,
  },
  {
    id: 3,
    job: {
      id: 3,
      title: "Entertainment Host",
      company: "Norwegian Cruise Line",
      location: "Caribbean Route",
      deadline: "2024-02-25",
      salary: "$2,000-2,500/month",
    },
    status: "rejected",
    appliedAt: "2024-01-10T09:15:00Z",
    notes: "Thank you for your interest. We've selected candidates with more experience.",
    updatedAt: "2024-01-17T11:20:00Z",
  },
  {
    id: 4,
    job: {
      id: 4,
      title: "Sous Chef",
      company: "Celebrity Cruises",
      location: "Alaska Route",
      deadline: "2024-03-01",
      salary: "$3,000-3,500/month",
    },
    status: "approved",
    appliedAt: "2024-01-05T08:45:00Z",
    notes: "Congratulations! Please check your email for next steps.",
    updatedAt: "2024-01-12T16:10:00Z",
  },
  {
    id: 5,
    job: {
      id: 5,
      title: "Spa Therapist",
      company: "Four Seasons Resort",
      location: "Maldives",
      deadline: "2024-03-05",
      salary: "$2,200-2,800/month",
    },
    status: "interview",
    appliedAt: "2024-01-08T11:30:00Z",
    notes: "Interview scheduled for January 25th at 10:00 AM via Zoom.",
    updatedAt: "2024-01-15T09:45:00Z",
  },
]

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  // Replace with actual API call
  const applications = mockApplications
  const isLoading = false

  const filteredApplications =
    activeTab === "all" ? applications : applications.filter((app) => app.status === activeTab)

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

  const handleWithdraw = async (applicationId: number) => {
    setIsWithdrawing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Remove from the list (in a real app, this would be handled by Redux)
    // For now, we'll just close the dialog
    setWithdrawDialogOpen(false)
    setIsWithdrawing(false)
    setSelectedApplication(null)
  }

  const openWithdrawDialog = (application: any) => {
    setSelectedApplication(application)
    setWithdrawDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
          <p className="text-gray-600 mt-2">Track and manage your job applications</p>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="interview">Interview</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Applications</CardTitle>
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
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No {activeTab !== "all" ? activeTab : ""} applications found.</p>
                    <Link href="/jobs">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Jobs</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {filteredApplications.map((application) => (
                      <div
                        key={application.id}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getStatusColor(application.status)}>
                                <span className="flex items-center">
                                  {getStatusIcon(application.status)}
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                </span>
                              </Badge>
                              <span className="text-sm text-gray-500">
                                Applied {new Date(application.appliedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">{application.job.title}</h3>
                            <p className="text-emerald-600 font-medium">{application.job.company}</p>

                            <div className="mt-3 space-y-2">
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="h-4 w-4 mr-2" />
                                {application.job.location}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="h-4 w-4 mr-2" />
                                Deadline: {new Date(application.job.deadline).toLocaleDateString()}
                              </div>
                            </div>

                            {application.notes && (
                              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                                <p className="text-sm text-gray-700">{application.notes}</p>
                                {application.updatedAt && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Updated {new Date(application.updatedAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-3">
                            <Link href={`/jobs/${application.job.id}`}>
                              <Button variant="outline">View Job</Button>
                            </Link>
                            {application.status !== "approved" && application.status !== "rejected" && (
                              <Button
                                variant="outline"
                                className="border-red-200 text-red-600 hover:bg-red-50"
                                onClick={() => openWithdrawDialog(application)}
                              >
                                Withdraw
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Withdraw Application Dialog */}
      <Dialog open={withdrawDialogOpen} onOpenChange={setWithdrawDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Application</DialogTitle>
            <DialogDescription>
              Are you sure you want to withdraw your application for{" "}
              <span className="font-medium">{selectedApplication?.job.title}</span> at{" "}
              <span className="font-medium">{selectedApplication?.job.company}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleWithdraw(selectedApplication?.id)}
              disabled={isWithdrawing}
            >
              {isWithdrawing ? "Withdrawing..." : "Withdraw Application"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
