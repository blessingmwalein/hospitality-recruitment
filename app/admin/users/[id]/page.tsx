"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  FileText,
  ArrowLeft,
  Download,
  Globe,
  Briefcase,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function UserProfilePage() {
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

  // Mock user data
  const user = {
    id: params.id,
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1995-06-15",
      nationality: "American",
      address: "123 Main St, New York, NY 10001",
      languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
      profileImage: "/placeholder.svg?height=100&width=100",
    },
    accountInfo: {
      joinDate: "2024-01-10T10:00:00Z",
      lastLogin: "2024-01-20T14:30:00Z",
      status: "active",
      emailVerified: true,
      profileCompleted: 95,
    },
    experience: [
      {
        id: 1,
        position: "Restaurant Server",
        company: "The Grand Hotel",
        location: "New York, NY",
        startDate: "2022-06",
        endDate: "2023-12",
        description:
          "Provided exceptional customer service in fine dining restaurant, managed tables of up to 8 guests, collaborated with kitchen staff to ensure timely service.",
      },
      {
        id: 2,
        position: "Front Desk Associate",
        company: "Marriott Downtown",
        location: "New York, NY",
        startDate: "2021-03",
        endDate: "2022-05",
        description:
          "Handled guest check-ins and check-outs, resolved customer complaints, managed reservations system, provided concierge services.",
      },
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Hospitality Management",
        institution: "Cornell University School of Hotel Administration",
        location: "Ithaca, NY",
        graduationDate: "2021-05",
        gpa: "3.8",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "ServSafe Food Handler Certification",
        issuer: "National Restaurant Association",
        issueDate: "2023-01",
        expiryDate: "2026-01",
      },
      {
        id: 2,
        name: "STCW Basic Safety Training",
        issuer: "Maritime Training Institute",
        issueDate: "2023-03",
        expiryDate: "2028-03",
      },
    ],
    documents: [
      {
        id: 1,
        name: "Resume.pdf",
        type: "Resume",
        uploadDate: "2024-01-10",
        size: "245 KB",
      },
      {
        id: 2,
        name: "Passport_Copy.pdf",
        type: "Passport",
        uploadDate: "2024-01-10",
        size: "1.2 MB",
      },
      {
        id: 3,
        name: "Medical_Certificate.pdf",
        type: "Medical Certificate",
        uploadDate: "2024-01-10",
        size: "890 KB",
      },
    ],
    applications: [
      {
        id: 1,
        jobTitle: "Cruise Ship Waiter",
        company: "Royal Caribbean",
        appliedDate: "2024-01-15",
        status: "pending",
      },
      {
        id: 2,
        jobTitle: "Hotel Receptionist",
        company: "Marriott International",
        appliedDate: "2024-01-12",
        status: "interview",
      },
      {
        id: 3,
        jobTitle: "Restaurant Server",
        company: "Celebrity Cruises",
        appliedDate: "2024-01-08",
        status: "rejected",
      },
    ],
    preferences: {
      jobTypes: ["Cruise Ship", "Luxury Hotel"],
      locations: ["Caribbean", "Mediterranean", "Asia Pacific"],
      positions: ["Food & Beverage", "Guest Services", "Entertainment"],
      salaryRange: "$2000-3000/month",
      availability: "Immediately",
    },
    activityLog: [
      {
        date: "2024-01-20T14:30:00Z",
        action: "Profile Updated",
        description: "Updated work experience section",
      },
      {
        date: "2024-01-18T09:15:00Z",
        action: "Document Uploaded",
        description: "Uploaded medical certificate",
      },
      {
        date: "2024-01-15T10:00:00Z",
        action: "Job Application",
        description: "Applied for Cruise Ship Waiter position",
      },
      {
        date: "2024-01-12T16:45:00Z",
        action: "Job Application",
        description: "Applied for Hotel Receptionist position",
      },
    ],
  }

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
      case "active":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
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
            <Link href="/admin/users">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Users
              </Button>
            </Link>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-600 mt-2">
                {user.personalInfo.firstName} {user.personalInfo.lastName} • ID: {user.id}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <span
                className={`px-3 py-1 text-sm rounded-full flex items-center ${getStatusColor(user.accountInfo.status)}`}
              >
                {getStatusIcon(user.accountInfo.status)}
                <span className="ml-1 capitalize">{user.accountInfo.status}</span>
              </span>
              <Button variant="outline">Send Message</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Summary */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {user.personalInfo.firstName} {user.personalInfo.lastName}
                  </h2>
                  <p className="text-gray-600 mb-4">Hospitality Professional</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {user.personalInfo.email}
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {user.personalInfo.phone}
                    </div>
                    <div className="flex items-center justify-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {user.personalInfo.nationality}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Member Since</label>
                    <p className="text-gray-900">{new Date(user.accountInfo.joinDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Login</label>
                    <p className="text-gray-900">{new Date(user.accountInfo.lastLogin).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email Verified</label>
                    <p className="text-gray-900">{user.accountInfo.emailVerified ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Profile Completion</label>
                    <div className="flex items-center mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-emerald-600 h-2 rounded-full"
                          style={{ width: `${user.accountInfo.profileCompleted}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{user.accountInfo.profileCompleted}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{user.applications.length}</p>
                    <p className="text-xs text-gray-600">Applications</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{user.experience.length}</p>
                    <p className="text-xs text-gray-600">Work Experience</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{user.certifications.length}</p>
                    <p className="text-xs text-gray-600">Certifications</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-emerald-600">{user.documents.length}</p>
                    <p className="text-xs text-gray-600">Documents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.personalInfo.languages.map((language, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">First Name</label>
                    <p className="text-gray-900">{user.personalInfo.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="text-gray-900">{user.personalInfo.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900">{new Date(user.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nationality</label>
                    <p className="text-gray-900">{user.personalInfo.nationality}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{user.personalInfo.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Applications */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Job Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-4 py-3">Job Title</th>
                        <th className="px-4 py-3">Company</th>
                        <th className="px-4 py-3">Applied</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {user.applications.map((application) => (
                        <tr key={application.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{application.jobTitle}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{application.company}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {new Date(application.appliedDate).toLocaleDateString()}
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

            {/* Work Experience */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Work Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {user.experience.map((exp, index) => (
                    <div key={exp.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div>
                        <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                        <p className="text-emerald-600 font-medium">{exp.company}</p>
                        <p className="text-sm text-gray-600 mb-2">
                          {exp.location} • {exp.startDate} - {exp.endDate}
                        </p>
                        <p className="text-gray-700">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-emerald-600 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-600">
                        {edu.location} • Graduated {edu.graduationDate} • GPA: {edu.gpa}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.certifications.map((cert, index) => (
                    <div key={cert.id}>
                      {index > 0 && <Separator className="my-4" />}
                      <div>
                        <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                        <p className="text-emerald-600 font-medium">{cert.issuer}</p>
                        <p className="text-sm text-gray-600">
                          Issued: {cert.issueDate} • Expires: {cert.expiryDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Preferences */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Job Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Preferred Job Types</label>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.jobTypes.map((type, index) => (
                        <Badge key={index} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Preferred Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.locations.map((location, index) => (
                        <Badge key={index} variant="secondary">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Preferred Positions</label>
                    <div className="flex flex-wrap gap-2">
                      {user.preferences.positions.map((position, index) => (
                        <Badge key={index} variant="secondary">
                          {position}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Salary Range</label>
                    <p className="text-gray-900">{user.preferences.salaryRange}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Availability</label>
                    <p className="text-gray-900">{user.preferences.availability}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Activity Log */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.activityLog.map((activity, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full mt-1.5"></div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(activity.date).toLocaleDateString()} at{" "}
                          {new Date(activity.date).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
