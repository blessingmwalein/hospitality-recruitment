"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Bell, Briefcase, FileText, User, Calendar, MapPin, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock data for dashboard
  const mockApplications = [
    {
      id: 1,
      job: {
        id: 1,
        title: "Cruise Ship Waiter",
        company: "Royal Caribbean",
        location: "Mediterranean Route",
      },
      status: "shortlisted",
      appliedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      job: {
        id: 2,
        title: "Hotel Receptionist",
        company: "Marriott International",
        location: "Dubai, UAE",
      },
      status: "pending",
      appliedAt: "2024-01-20T14:30:00Z",
    },
    {
      id: 3,
      job: {
        id: 3,
        title: "Entertainment Host",
        company: "Norwegian Cruise Line",
        location: "Caribbean Route",
      },
      status: "rejected",
      appliedAt: "2024-01-10T09:15:00Z",
    },
  ]

  const mockProfile = {
    firstName: "John",
    personalInfo: { name: "John Doe", email: "john@example.com" },
    experience: [{ title: "Waiter", company: "Local Restaurant" }],
    education: [{ degree: "Hospitality Management", school: "Tourism College" }],
    certifications: [{ name: "Food Safety", issuer: "ServSafe" }],
    documents: [{ name: "Resume.pdf", type: "cv" }],
  }

  // Replace the API hooks
  const applications = mockApplications
  const applicationsLoading = false
  const profile = mockProfile
  const profileLoading = false

  // const { data: applications, isLoading: applicationsLoading } = useGetUserApplicationsQuery()
  // const { data: profile, isLoading: profileLoading } = useGetProfileQuery()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "shortlisted":
        return "bg-blue-100 text-blue-700"
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const profileCompleteness = profile
    ? Math.round(
        ((profile.personalInfo ? 20 : 0) +
          (profile.experience?.length > 0 ? 20 : 0) +
          (profile.education?.length > 0 ? 20 : 0) +
          (profile.certifications?.length > 0 ? 20 : 0) +
          (profile.documents?.length > 0 ? 20 : 0)) /
          1,
      )
    : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.firstName || "Student"}!</h1>
          <p className="text-gray-600 mt-2">Track your applications and manage your hospitality career journey.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Briefcase className="h-8 w-8 text-emerald-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">{applications?.length || 0}</p>
                      <p className="text-sm text-gray-600">Total Applications</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {applications?.filter((app: any) => app.status === "shortlisted").length || 0}
                      </p>
                      <p className="text-sm text-gray-600">Shortlisted</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Calendar className="h-8 w-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-gray-900">
                        {applications?.filter((app: any) => app.status === "pending").length || 0}
                      </p>
                      <p className="text-sm text-gray-600">Pending Review</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Applications */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Track the status of your job applications</CardDescription>
                  </div>
                  <Link href="/dashboard/applications">
                    <Button variant="outline">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {applicationsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                ) : applications?.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven't applied to any jobs yet.</p>
                    <Link href="/jobs">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Browse Jobs</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications?.slice(0, 5).map((application: any) => (
                      <div
                        key={application.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{application.job.title}</h4>
                          <p className="text-sm text-gray-600">{application.job.company}</p>
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <MapPin className="h-3 w-3 mr-1" />
                            {application.job.location}
                            <span className="mx-2">•</span>
                            Applied {new Date(application.appliedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusColor(application.status)}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </Badge>
                          <Link href={`/jobs/${application.job.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Recent Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Application Status Update</p>
                      <p className="text-sm text-gray-600">
                        Your application for Cruise Ship Waiter at Royal Caribbean has been shortlisted.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New Job Match</p>
                      <p className="text-sm text-gray-600">
                        We found 3 new jobs that match your profile and preferences.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Profile Reminder</p>
                      <p className="text-sm text-gray-600">
                        Complete your profile to increase your chances of getting hired.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Completeness */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Profile Completeness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{profileCompleteness}% Complete</span>
                      <span className="text-sm text-gray-500">{profileCompleteness}/100</span>
                    </div>
                    <Progress value={profileCompleteness} className="h-2" />
                  </div>

                  {profileCompleteness < 100 && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">Complete your profile to improve your job prospects:</p>
                      <ul className="text-sm space-y-1">
                        {!profile?.personalInfo && <li className="text-gray-500">• Add personal information</li>}
                        {!profile?.experience?.length && <li className="text-gray-500">• Add work experience</li>}
                        {!profile?.education?.length && <li className="text-gray-500">• Add education details</li>}
                        {!profile?.certifications?.length && <li className="text-gray-500">• Add certifications</li>}
                        {!profile?.documents?.length && <li className="text-gray-500">• Upload documents</li>}
                      </ul>
                      <Link href="/dashboard/profile">
                        <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 mt-3">
                          Complete Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/jobs">
                  <Button variant="outline" className="w-full justify-start">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Button>
                </Link>
                <Link href="/dashboard/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
                <Link href="/dashboard/documents">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Documents
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Job Recommendations */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
                <CardDescription>Jobs matching your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-900">Hotel Receptionist</h4>
                    <p className="text-xs text-gray-600">Marriott International • Dubai</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Hotel
                      </Badge>
                      <Link href="/jobs/1">
                        <Button size="sm" variant="ghost" className="text-xs">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="p-3 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-sm text-gray-900">Cruise Ship Bartender</h4>
                    <p className="text-xs text-gray-600">Norwegian Cruise Line • Caribbean</p>
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="secondary" className="text-xs">
                        Cruise Ship
                      </Badge>
                      <Link href="/jobs/2">
                        <Button size="sm" variant="ghost" className="text-xs">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <Link href="/jobs">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Recommendations
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
