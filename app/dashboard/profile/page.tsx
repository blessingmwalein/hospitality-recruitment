"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
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
  Edit,
  Download,
  Globe,
} from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function ProfilePage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const { profile } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/dashboard/profile")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  // Mock profile data based on the onboarding flow
  const mockProfile = {
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      email: user.email,
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1995-06-15",
      nationality: "American",
      address: "123 Main St, New York, NY 10001",
      languages: ["English (Native)", "Spanish (Conversational)", "French (Basic)"],
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
      },
      {
        id: 2,
        name: "Passport_Copy.pdf",
        type: "Passport",
        uploadDate: "2024-01-10",
      },
      {
        id: 3,
        name: "Medical_Certificate.pdf",
        type: "Medical Certificate",
        uploadDate: "2024-01-10",
      },
    ],
    preferences: {
      jobTypes: ["Cruise Ship", "Luxury Hotel"],
      locations: ["Caribbean", "Mediterranean", "Asia Pacific"],
      positions: ["Food & Beverage", "Guest Services", "Entertainment"],
      salaryRange: "$2000-3000/month",
      availability: "Immediately",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
            </div>
            <Link href="/dashboard/profile/edit">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Summary */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {mockProfile.personalInfo.firstName} {mockProfile.personalInfo.lastName}
                  </h2>
                  <p className="text-gray-600 mb-4">Hospitality Professional</p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center">
                      <Mail className="h-4 w-4 mr-2" />
                      {mockProfile.personalInfo.email}
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      {mockProfile.personalInfo.phone}
                    </div>
                    <div className="flex items-center justify-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {mockProfile.personalInfo.nationality}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">{mockProfile.experience.length}</p>
                      <p className="text-xs text-gray-600">Work Experience</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-emerald-600">{mockProfile.certifications.length}</p>
                      <p className="text-xs text-gray-600">Certifications</p>
                    </div>
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
                  {mockProfile.personalInfo.languages.map((language, index) => (
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
                    <p className="text-gray-900">{mockProfile.personalInfo.firstName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Name</label>
                    <p className="text-gray-900">{mockProfile.personalInfo.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                    <p className="text-gray-900">
                      {new Date(mockProfile.personalInfo.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Nationality</label>
                    <p className="text-gray-900">{mockProfile.personalInfo.nationality}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Address</label>
                    <p className="text-gray-900">{mockProfile.personalInfo.address}</p>
                  </div>
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
                  {mockProfile.experience.map((exp, index) => (
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
                  {mockProfile.education.map((edu) => (
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
                  {mockProfile.certifications.map((cert, index) => (
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
                  {mockProfile.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-sm text-gray-600">
                            {doc.type} • Uploaded {doc.uploadDate}
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
                      {mockProfile.preferences.jobTypes.map((type, index) => (
                        <Badge key={index} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Preferred Locations</label>
                    <div className="flex flex-wrap gap-2">
                      {mockProfile.preferences.locations.map((location, index) => (
                        <Badge key={index} variant="secondary">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Preferred Positions</label>
                    <div className="flex flex-wrap gap-2">
                      {mockProfile.preferences.positions.map((position, index) => (
                        <Badge key={index} variant="secondary">
                          {position}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Salary Range</label>
                    <p className="text-gray-900">{mockProfile.preferences.salaryRange}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 mb-2 block">Availability</label>
                    <p className="text-gray-900">{mockProfile.preferences.availability}</p>
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
