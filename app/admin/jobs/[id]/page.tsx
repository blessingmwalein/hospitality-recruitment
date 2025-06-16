"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Building2,
  Clock,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function JobDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Mock job data
  const job = {
    id: params.id,
    title: "Cruise Ship Waiter",
    company: "Royal Caribbean",
    location: "Mediterranean Route",
    department: "Food & Beverage",
    type: "Cruise Ship",
    status: "active",
    salary: "$1,800-2,200/month",
    contractLength: "6-8 months",
    postedDate: "2024-01-10T10:00:00Z",
    deadline: "2024-02-15T23:59:59Z",
    description: `We are seeking enthusiastic and professional waiters to join our Food & Beverage team aboard our Mediterranean cruise ships. This is an excellent opportunity for hospitality professionals to gain international experience while traveling to beautiful destinations.

As a Cruise Ship Waiter, you will be responsible for providing exceptional dining service to our guests in various restaurant venues. You will work as part of a diverse international team and have the opportunity to develop your skills in a fast-paced, multicultural environment.

This position offers competitive compensation, free accommodation and meals, medical coverage, and the chance to visit multiple Mediterranean ports including Barcelona, Rome, Naples, and the Greek Islands.`,
    requirements: [
      "Previous experience in food service or hospitality (minimum 1 year)",
      "Excellent English communication skills (additional languages preferred)",
      "Physical fitness and ability to work long hours",
      "Valid passport with at least 18 months validity",
      "STCW Basic Safety Training certification (or willingness to obtain)",
      "Flexibility to work various shifts including evenings and weekends",
      "Professional appearance and positive attitude",
      "Ability to work in a multicultural environment",
    ],
    responsibilities: [
      "Provide exceptional table service to guests in assigned dining venues",
      "Take food and beverage orders accurately and efficiently",
      "Serve meals and beverages according to company standards",
      "Maintain cleanliness and organization of dining areas",
      "Assist with setup and breakdown of dining venues",
      "Handle guest inquiries and special requests professionally",
      "Work collaboratively with kitchen and bar staff",
      "Follow all safety and sanitation procedures",
      "Participate in training programs and team meetings",
      "Maintain professional appearance and demeanor at all times",
    ],
    benefits: [
      "Competitive monthly salary ($1,800-2,200)",
      "Free accommodation in shared crew cabin",
      "All meals provided",
      "Medical and dental coverage",
      "Crew recreation facilities and activities",
      "Opportunity to visit multiple Mediterranean destinations",
      "Professional development and training programs",
      "End-of-contract bonus based on performance",
      "Crew discounts on ship services and shore excursions",
      "Repatriation flights provided",
    ],
    applications: [
      {
        id: 1,
        applicant: "John Smith",
        appliedDate: "2024-01-15",
        status: "pending",
        experience: "2 years",
        rating: 4.5,
      },
      {
        id: 2,
        applicant: "Maria Garcia",
        appliedDate: "2024-01-14",
        status: "shortlisted",
        experience: "3 years",
        rating: 4.8,
      },
      {
        id: 3,
        applicant: "David Chen",
        appliedDate: "2024-01-13",
        status: "interview",
        experience: "1.5 years",
        rating: 4.2,
      },
      {
        id: 4,
        applicant: "Sarah Johnson",
        appliedDate: "2024-01-12",
        status: "approved",
        experience: "4 years",
        rating: 4.9,
      },
      {
        id: 5,
        applicant: "Michael Brown",
        appliedDate: "2024-01-11",
        status: "rejected",
        experience: "6 months",
        rating: 3.8,
      },
    ],
    stats: {
      totalApplications: 24,
      pendingApplications: 8,
      shortlistedApplications: 6,
      interviewApplications: 4,
      approvedApplications: 3,
      rejectedApplications: 3,
      views: 156,
      averageRating: 4.3,
    },
    recruiter: {
      name: "Jennifer Wilson",
      email: "j.wilson@royalcaribbean.com",
      phone: "+1 (555) 987-6543",
      title: "Senior Recruitment Manager",
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
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
      case "closed":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "pending":
      case "shortlisted":
      case "interview":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "closed":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/admin/jobs">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
              <p className="text-gray-600 mt-2">
                {job.company} • {job.location}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 text-sm rounded-full flex items-center ${getStatusColor(job.status)}`}>
                {getStatusIcon(job.status)}
                <span className="ml-1 capitalize">{job.status}</span>
              </span>
              <Link href={`/admin/jobs/${job.id}/edit`}>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Link href={`/jobs/${job.id}`}>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Job Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Company</label>
                      <p className="text-gray-900">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Location</label>
                      <p className="text-gray-900">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Salary</label>
                      <p className="text-gray-900">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Contract Length</label>
                      <p className="text-gray-900">{job.contractLength}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Posted Date</label>
                      <p className="text-gray-900">{new Date(job.postedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <label className="text-sm font-medium text-gray-500">Application Deadline</label>
                      <p className="text-gray-900">{new Date(job.deadline).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge variant="secondary">{job.department}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Responsibilities */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Key Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3 flex-shrink-0 mt-2"></div>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Benefits & Perks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recent Applications */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Applications</CardTitle>
                  <Link href={`/admin/jobs/${job.id}/applications`}>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Applicant</th>
                        <th className="px-4 py-3">Applied</th>
                        <th className="px-4 py-3">Experience</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {job.applications.slice(0, 5).map((application) => (
                        <tr key={application.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{application.applicant}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {application.experience}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(application.status)}`}>
                              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <Link href={`/admin/applications/${application.id}`}>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-6">
            {/* Job Stats */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Application Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Applications</span>
                    <span className="text-lg font-bold text-gray-900">{job.stats.totalApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending Review</span>
                    <span className="text-sm font-medium text-yellow-600">{job.stats.pendingApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shortlisted</span>
                    <span className="text-sm font-medium text-blue-600">{job.stats.shortlistedApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">In Interview</span>
                    <span className="text-sm font-medium text-purple-600">{job.stats.interviewApplications}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved</span>
                    <span className="text-sm font-medium text-green-600">{job.stats.approvedApplications}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Profile Views</span>
                    <span className="text-sm font-medium text-gray-900">{job.stats.views}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Rating</span>
                    <span className="text-sm font-medium text-gray-900">{job.stats.averageRating}/5.0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href={`/admin/jobs/${job.id}/edit`}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Job
                  </Button>
                </Link>
                <Link href={`/admin/jobs/${job.id}/applications`}>
                  <Button variant="outline" className="w-full">
                    <Users className="h-4 w-4 mr-2" />
                    View All Applications
                  </Button>
                </Link>
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="outline" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Page
                  </Button>
                </Link>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Close Job
                </Button>
              </CardContent>
            </Card>

            {/* Recruiter Info */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recruiter Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-gray-900">{job.recruiter.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Title</label>
                    <p className="text-gray-900">{job.recruiter.title}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-gray-900">{job.recruiter.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-gray-900">{job.recruiter.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Application Rate</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Conversion Rate</span>
                      <span>12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "12%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Quality Score</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
