"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  User,
  Briefcase,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  MessageSquare,
  Star,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { RootState } from "@/lib/store/store"

export default function ApplicationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [applicationStatus, setApplicationStatus] = useState("pending")
  const [adminNote, setAdminNote] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Mock application data with Zimbabwean context
  const application = {
    id: params.id,
    jobTitle: "Safari Lodge Waiter",
    company: "Victoria Falls Safari Lodge",
    location: "Victoria Falls, Zimbabwe",
    department: "Food & Beverage",
    salary: "$600-800/month",
    applicationDate: "2024-01-15T10:30:00Z",
    status: "pending",
    coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the Safari Lodge Waiter position at Victoria Falls Safari Lodge. With over three years of experience in food service at various hospitality establishments in Zimbabwe, I believe I have the skills and passion to excel in this role.

During my time at Meikles Hotel in Harare, I developed strong customer service skills while serving international guests. I am fluent in English and Shona, with basic knowledge of French, which allows me to communicate effectively with guests from various backgrounds.

I am particularly excited about the opportunity to work at Victoria Falls Safari Lodge due to its excellent reputation and the chance to be part of delivering exceptional experiences to visitors at one of Zimbabwe's most iconic destinations.

Thank you for considering my application. I look forward to the possibility of discussing how my experience and enthusiasm would benefit your team.

Sincerely,
Tatenda Moyo`,
    candidate: {
      id: 101,
      name: "Tatenda Moyo",
      email: "tatenda.moyo@example.com",
      phone: "+263 77 123 4567",
      location: "Harare, Zimbabwe",
      photo: "/images/testimonial-tendai.jpg",
      experience: [
        {
          position: "Restaurant Server",
          company: "Meikles Hotel",
          location: "Harare, Zimbabwe",
          startDate: "2022-06",
          endDate: "2023-12",
          description:
            "Provided exceptional customer service in fine dining restaurant, managed tables of up to 8 guests, collaborated with kitchen staff to ensure timely service.",
        },
        {
          position: "Waiter",
          company: "Rainbow Towers",
          location: "Harare, Zimbabwe",
          startDate: "2021-03",
          endDate: "2022-05",
          description:
            "Served guests in hotel restaurant, handled cash and card payments, maintained cleanliness of dining area.",
        },
      ],
      education: [
        {
          degree: "Diploma in Hospitality Management",
          institution: "Harare Polytechnic",
          location: "Harare, Zimbabwe",
          graduationDate: "2021-05",
        },
      ],
      certifications: [
        {
          name: "Food Handler Certification",
          issuer: "Zimbabwe Tourism Authority",
          issueDate: "2023-01",
          expiryDate: "2026-01",
        },
        {
          name: "Basic Safety Training",
          issuer: "Hospitality Association of Zimbabwe",
          issueDate: "2023-03",
          expiryDate: "2028-03",
        },
      ],
      documents: [
        {
          name: "CV.pdf",
          type: "Resume",
          uploadDate: "2024-01-10",
        },
        {
          name: "Passport_Copy.pdf",
          type: "Passport",
          uploadDate: "2024-01-10",
        },
        {
          name: "Medical_Certificate.pdf",
          type: "Medical Certificate",
          uploadDate: "2024-01-10",
        },
      ],
    },
    timeline: [
      {
        status: "applied",
        date: "2024-01-15T10:30:00Z",
        note: "Application submitted",
      },
      {
        status: "reviewed",
        date: "2024-01-16T14:45:00Z",
        note: "Application reviewed by HR",
      },
    ],
    notes: [
      {
        author: "Rumbidzai Ndoro",
        role: "HR Manager",
        date: "2024-01-16T14:45:00Z",
        content: "Candidate has relevant experience in hospitality. Consider for interview.",
      },
    ],
  }

  const handleStatusChange = (status: string) => {
    setApplicationStatus(status)
  }

  const handleAddNote = () => {
    if (!adminNote.trim()) return

    // In a real app, this would be an API call
    setAdminNote("")
    // Add note to the list
  }

  const handleUpdateStatus = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    // Show success message
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending Review</Badge>
      case "shortlisted":
        return <Badge className="bg-blue-100 text-blue-800">Shortlisted</Badge>
      case "interview":
        return <Badge className="bg-purple-100 text-purple-800">Interview Scheduled</Badge>
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
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
          <div className="flex items-center mb-4">
            <Link href="/admin/applications">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Applications
              </Button>
            </Link>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
              <p className="text-gray-600 mt-2">
                Application #{application.id} • Submitted on {formatDate(application.applicationDate)}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link href={`/admin/users/${application.candidate.id}`}>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  View Candidate
                </Button>
              </Link>
              <Link href={`/admin/jobs/1`}>
                <Button variant="outline" size="sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  View Job
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Application Info */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md mb-6">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle>Application for {application.jobTitle}</CardTitle>
                  {getStatusBadge(application.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Company</p>
                      <p className="font-medium">{application.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{application.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Applied On</p>
                      <p className="font-medium">{formatDate(application.applicationDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Salary Range</p>
                      <p className="font-medium">{application.salary}</p>
                    </div>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="details">Application Details</TabsTrigger>
                    <TabsTrigger value="candidate">Candidate Profile</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Cover Letter</h3>
                        <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700">
                          {application.coverLetter}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Documents</h3>
                        <div className="space-y-3">
                          {application.candidate.documents.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                            >
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                <div>
                                  <p className="font-medium text-gray-900">{doc.name}</p>
                                  <p className="text-sm text-gray-600">
                                    {doc.type} • Uploaded {formatDate(doc.uploadDate)}
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="candidate">
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <Image
                            src={application.candidate.photo || "/placeholder.svg"}
                            alt={application.candidate.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{application.candidate.name}</h3>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{application.candidate.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium">{application.candidate.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-gray-400 mr-2" />
                          <div>
                            <p className="text-sm text-gray-600">Phone</p>
                            <p className="font-medium">{application.candidate.phone}</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Work Experience</h3>
                        <div className="space-y-4">
                          {application.candidate.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-4 pb-4">
                              <h4 className="font-bold text-gray-900">{exp.position}</h4>
                              <p className="text-gray-700">
                                {exp.company} • {exp.location}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                              </p>
                              <p className="text-gray-700 mt-2">{exp.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Education</h3>
                        <div className="space-y-4">
                          {application.candidate.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-4 pb-4">
                              <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                              <p className="text-gray-700">
                                {edu.institution} • {edu.location}
                              </p>
                              <p className="text-sm text-gray-600">Graduated: {formatDate(edu.graduationDate)}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Certifications</h3>
                        <div className="space-y-4">
                          {application.candidate.certifications.map((cert, index) => (
                            <div key={index} className="border-l-2 border-gray-200 pl-4 pb-4">
                              <h4 className="font-bold text-gray-900">{cert.name}</h4>
                              <p className="text-gray-700">{cert.issuer}</p>
                              <p className="text-sm text-gray-600">
                                Issued: {formatDate(cert.issueDate)} • Expires: {formatDate(cert.expiryDate)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="timeline">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Application Timeline</h3>
                        <div className="space-y-4">
                          {application.timeline.map((event, index) => (
                            <div key={index} className="flex">
                              <div className="mr-4">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
                                  {event.status === "applied" && <FileText className="h-4 w-4" />}
                                  {event.status === "reviewed" && <CheckCircle className="h-4 w-4" />}
                                  {event.status === "shortlisted" && <Star className="h-4 w-4" />}
                                  {event.status === "interview" && <Calendar className="h-4 w-4" />}
                                  {event.status === "approved" && <CheckCircle className="h-4 w-4" />}
                                  {event.status === "rejected" && <XCircle className="h-4 w-4" />}
                                </div>
                                {index < application.timeline.length - 1 && (
                                  <div className="w-0.5 h-12 bg-gray-200 mx-auto"></div>
                                )}
                              </div>
                              <div className="pb-6">
                                <p className="font-medium text-gray-900">
                                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </p>
                                <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
                                <p className="text-gray-700 mt-1">{event.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-4">Admin Notes</h3>
                        <div className="space-y-4">
                          {application.notes.map((note, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <p className="font-medium text-gray-900">{note.author}</p>
                                  <p className="text-sm text-gray-600">{note.role}</p>
                                </div>
                                <p className="text-xs text-gray-500">{formatDate(note.date)}</p>
                              </div>
                              <p className="text-gray-700">{note.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-md mb-6">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Update Status</Label>
                  <Select value={applicationStatus} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending Review</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interview">Interview Scheduled</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleUpdateStatus} className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Updating..." : "Update Status"}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md mb-6">
              <CardHeader>
                <CardTitle>Add Note</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="note">Admin Note</Label>
                  <Textarea
                    id="note"
                    value={adminNote}
                    onChange={(e) => setAdminNote(e.target.value)}
                    placeholder="Add a note about this application..."
                    rows={4}
                  />
                </div>
                <Button onClick={handleAddNote} className="w-full" disabled={!adminNote.trim()}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Download CV
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
