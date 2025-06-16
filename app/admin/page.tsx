"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Briefcase,
  FileText,
  Settings,
  BarChart3,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  UserCog,
  FileEdit,
  Bell,
} from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function AdminDashboard() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Mock data with African context
  const stats = [
    { label: "Total Applications", value: "1,247", change: "+12.5%", status: "increase" },
    { label: "Active Jobs", value: "156", change: "+5.7%", status: "increase" },
    { label: "Registered Users", value: "892", change: "+8.2%", status: "increase" },
    { label: "Successful Placements", value: "268", change: "+15.3%", status: "increase" },
  ]

  const recentApplications = [
    {
      id: 1,
      jobTitle: "Safari Lodge Waiter",
      company: "Victoria Falls Safari Lodge",
      applicant: "Tatenda Moyo",
      date: "2024-01-15T10:30:00Z",
      status: "pending",
    },
    {
      id: 2,
      jobTitle: "Hotel Receptionist",
      company: "Meikles Hotel",
      applicant: "Chipo Nyathi",
      date: "2024-01-14T14:45:00Z",
      status: "shortlisted",
    },
    {
      id: 3,
      jobTitle: "Chef de Partie",
      company: "Rainbow Towers",
      applicant: "Farai Mutasa",
      date: "2024-01-14T09:15:00Z",
      status: "interview",
    },
    {
      id: 4,
      jobTitle: "Safari Guide",
      company: "Wilderness Safaris",
      applicant: "Tonderai Ndlovu",
      date: "2024-01-13T11:20:00Z",
      status: "approved",
    },
    {
      id: 5,
      jobTitle: "Housekeeping Supervisor",
      company: "A'Zambezi River Lodge",
      applicant: "Rumbidzai Chikwanha",
      date: "2024-01-12T16:10:00Z",
      status: "rejected",
    },
  ]

  const recentUsers = [
    {
      id: 101,
      name: "Tendai Moyo",
      email: "tendai.moyo@example.com",
      registeredDate: "2024-01-15T08:20:00Z",
      status: "active",
      profileComplete: true,
    },
    {
      id: 102,
      name: "Chiedza Mutasa",
      email: "chiedza.m@example.com",
      registeredDate: "2024-01-14T13:45:00Z",
      status: "active",
      profileComplete: false,
    },
    {
      id: 103,
      name: "Blessing Ncube",
      email: "blessing.ncube@example.com",
      registeredDate: "2024-01-14T10:30:00Z",
      status: "active",
      profileComplete: true,
    },
    {
      id: 104,
      name: "Tapiwa Gumbo",
      email: "tapiwa.g@example.com",
      registeredDate: "2024-01-13T09:15:00Z",
      status: "pending",
      profileComplete: false,
    },
    {
      id: 105,
      name: "Nyasha Moyo",
      email: "nyasha.moyo@example.com",
      registeredDate: "2024-01-12T14:50:00Z",
      status: "active",
      profileComplete: true,
    },
  ]

  const recentJobs = [
    {
      id: 1,
      title: "Safari Lodge Waiter",
      company: "Victoria Falls Safari Lodge",
      location: "Victoria Falls, Zimbabwe",
      postedDate: "2024-01-15T09:00:00Z",
      applications: 12,
      status: "active",
    },
    {
      id: 2,
      title: "Hotel Receptionist",
      company: "Meikles Hotel",
      location: "Harare, Zimbabwe",
      postedDate: "2024-01-14T10:30:00Z",
      applications: 8,
      status: "active",
    },
    {
      id: 3,
      title: "Chef de Partie",
      company: "Rainbow Towers",
      location: "Harare, Zimbabwe",
      postedDate: "2024-01-13T14:15:00Z",
      applications: 5,
      status: "active",
    },
    {
      id: 4,
      title: "Safari Guide",
      company: "Wilderness Safaris",
      location: "Hwange National Park, Zimbabwe",
      postedDate: "2024-01-12T11:45:00Z",
      applications: 10,
      status: "active",
    },
    {
      id: 5,
      title: "Housekeeping Supervisor",
      company: "A'Zambezi River Lodge",
      location: "Victoria Falls, Zimbabwe",
      postedDate: "2024-01-11T08:30:00Z",
      applications: 7,
      status: "active",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shortlisted":
        return "bg-blue-100 text-blue-800"
      case "interview":
        return "bg-purple-100 text-purple-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage jobs, applications, and users</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link href="/admin/jobs/new">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-emerald-100 p-3 mr-4">
                  <PlusCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Post New Job</h3>
                  <p className="text-sm text-gray-600">Create a new job listing</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/applications">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Review Applications</h3>
                  <p className="text-sm text-gray-600">Manage candidate applications</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/users/101">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <UserCog className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Manage Users</h3>
                  <p className="text-sm text-gray-600">View and edit user profiles</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/admin/reports">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardContent className="p-6 flex items-center">
                <div className="rounded-full bg-amber-100 p-3 mr-4">
                  <BarChart3 className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">View Reports</h3>
                  <p className="text-sm text-gray-600">Analytics and statistics</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      stat.status === "increase" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Navigation */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md mb-6">
              <CardHeader>
                <CardTitle>Admin Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <nav className="space-y-1">
                  <Link href="/admin">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="h-5 w-5 mr-3" />
                      Dashboard
                    </Button>
                  </Link>
                  <p className="text-xs font-semibold text-gray-500 px-3 pt-4 pb-2">JOBS MANAGEMENT</p>
                  <Link href="/admin/jobs">
                    <Button variant="ghost" className="w-full justify-start">
                      <Briefcase className="h-5 w-5 mr-3" />
                      All Jobs
                    </Button>
                  </Link>
                  <Link href="/admin/jobs/new">
                    <Button variant="ghost" className="w-full justify-start">
                      <PlusCircle className="h-5 w-5 mr-3" />
                      Create Job
                    </Button>
                  </Link>
                  <Link href="/admin/jobs/1/edit">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileEdit className="h-5 w-5 mr-3" />
                      Edit Job
                    </Button>
                  </Link>
                  <p className="text-xs font-semibold text-gray-500 px-3 pt-4 pb-2">APPLICATIONS</p>
                  <Link href="/admin/applications">
                    <Button variant="ghost" className="w-full justify-start">
                      <FileText className="h-5 w-5 mr-3" />
                      All Applications
                    </Button>
                  </Link>
                  <Link href="/admin/applications/1">
                    <Button variant="ghost" className="w-full justify-start">
                      <CheckCircle className="h-5 w-5 mr-3" />
                      Review Application
                    </Button>
                  </Link>
                  <p className="text-xs font-semibold text-gray-500 px-3 pt-4 pb-2">USERS</p>
                  <Link href="/admin/users/101">
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="h-5 w-5 mr-3" />
                      User Profiles
                    </Button>
                  </Link>
                  <p className="text-xs font-semibold text-gray-500 px-3 pt-4 pb-2">SYSTEM</p>
                  <Link href="/admin/reports">
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart3 className="h-5 w-5 mr-3" />
                      Reports
                    </Button>
                  </Link>
                  <Link href="/admin/settings">
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="h-5 w-5 mr-3" />
                      Settings
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-blue-100 p-2 flex-shrink-0">
                      <Bell className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">New application received for Safari Guide position</p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-green-100 p-2 flex-shrink-0">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Candidate Tendai Moyo accepted job offer</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-100 p-2 flex-shrink-0">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">Job posting "Hotel Receptionist" is about to expire</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Dashboard Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="applications" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
              </TabsList>

              <TabsContent value="applications">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest job applications received</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentApplications.map((application) => (
                        <div
                          key={application.id}
                          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <Link href={`/admin/applications/${application.id}`}>
                              <h4 className="font-medium text-gray-900 hover:text-emerald-600">
                                {application.applicant}
                              </h4>
                            </Link>
                            <p className="text-sm text-gray-600">
                              {application.jobTitle} at {application.company}
                            </p>
                            <p className="text-xs text-gray-500">{formatDate(application.date)}</p>
                          </div>
                          <div className="flex items-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(application.status)}`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                            <Link href={`/admin/applications/${application.id}`}>
                              <Button variant="ghost" size="sm" className="ml-2">
                                View
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/admin/applications" className="w-full">
                      <Button variant="outline" className="w-full">
                        View All Applications
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="users">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>Latest registered users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <Link href={`/admin/users/${user.id}`}>
                              <h4 className="font-medium text-gray-900 hover:text-emerald-600">{user.name}</h4>
                            </Link>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-500">Registered: {formatDate(user.registeredDate)}</p>
                          </div>
                          <div className="flex items-center">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                user.profileComplete ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {user.profileComplete ? "Complete Profile" : "Incomplete Profile"}
                            </span>
                            <Link href={`/admin/users/${user.id}`}>
                              <Button variant="ghost" size="sm" className="ml-2">
                                View
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Users
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="jobs">
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle>Recent Jobs</CardTitle>
                    <CardDescription>Latest job postings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentJobs.map((job) => (
                        <div
                          key={job.id}
                          className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
                        >
                          <div>
                            <Link href={`/admin/jobs/${job.id}`}>
                              <h4 className="font-medium text-gray-900 hover:text-emerald-600">{job.title}</h4>
                            </Link>
                            <p className="text-sm text-gray-600">
                              {job.company} • {job.location}
                            </p>
                            <p className="text-xs text-gray-500">Posted: {formatDate(job.postedDate)}</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                              {job.applications} applications
                            </span>
                            <div className="flex ml-2">
                              <Link href={`/admin/jobs/${job.id}`}>
                                <Button variant="ghost" size="sm">
                                  View
                                </Button>
                              </Link>
                              <Link href={`/admin/jobs/${job.id}/edit`}>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link href="/admin/jobs" className="w-full">
                      <Button variant="outline" className="w-full">
                        View All Jobs
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
