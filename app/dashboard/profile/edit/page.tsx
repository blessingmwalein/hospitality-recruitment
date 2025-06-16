"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Plus, Trash2, Upload, X } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function EditProfilePage() {
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [date, setDate] = useState<Date>()

  // Mock profile data based on Zimbabwean context
  const mockProfile = {
    personalInfo: {
      firstName: "Tendai",
      lastName: "Moyo",
      email: user?.email || "tendai.moyo@example.com",
      phone: "+263 77 123 4567",
      dateOfBirth: "1995-06-15",
      nationality: "Zimbabwean",
      address: "123 Samora Machel Ave, Harare",
      languages: ["English", "Shona", "Ndebele"],
    },
    experience: [
      {
        id: 1,
        position: "Restaurant Server",
        company: "Victoria Falls Hotel",
        location: "Victoria Falls, Zimbabwe",
        startDate: "2022-06",
        endDate: "2023-12",
        description:
          "Provided exceptional customer service in fine dining restaurant, managed tables of up to 8 guests, collaborated with kitchen staff to ensure timely service.",
      },
      {
        id: 2,
        position: "Front Desk Associate",
        company: "Meikles Hotel",
        location: "Harare, Zimbabwe",
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
        institution: "University of Zimbabwe",
        location: "Harare, Zimbabwe",
        graduationDate: "2021-05",
        gpa: "3.8",
      },
    ],
    certifications: [
      {
        id: 1,
        name: "Food Handler Certification",
        issuer: "Zimbabwe Tourism Authority",
        issueDate: "2023-01",
        expiryDate: "2026-01",
      },
      {
        id: 2,
        name: "Basic Safety Training",
        issuer: "Hospitality Association of Zimbabwe",
        issueDate: "2023-03",
        expiryDate: "2028-03",
      },
    ],
    documents: [
      {
        id: 1,
        name: "CV.pdf",
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
      jobTypes: ["Cruise Ship", "Safari Lodge"],
      locations: ["Southern Africa", "East Africa", "Middle East"],
      positions: ["Food & Beverage", "Guest Services", "Tour Guide"],
      salaryRange: "$800-1500/month",
      availability: "Immediately",
    },
  }

  const [formData, setFormData] = useState(mockProfile)

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    router.push("/dashboard/profile")
  }

  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    }

    setFormData({
      ...formData,
      experience: [...formData.experience, newExperience],
    })
  }

  const handleExperienceChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      experience: formData.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const handleRemoveExperience = (id: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((exp) => exp.id !== id),
    })
  }

  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
    }

    setFormData({
      ...formData,
      education: [...formData.education, newEducation],
    })
  }

  const handleEducationChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      education: formData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const handleRemoveEducation = (id: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((edu) => edu.id !== id),
    })
  }

  const handleAddCertification = () => {
    const newCertification = {
      id: Date.now(),
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
    }

    setFormData({
      ...formData,
      certifications: [...formData.certifications, newCertification],
    })
  }

  const handleCertificationChange = (id: number, field: string, value: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    })
  }

  const handleRemoveCertification = (id: number) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter((cert) => cert.id !== id),
    })
  }

  const handleAddLanguage = (language: string) => {
    if (language && !formData.personalInfo.languages.includes(language)) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          languages: [...formData.personalInfo.languages, language],
        },
      })
    }
  }

  const handleRemoveLanguage = (language: string) => {
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        languages: formData.personalInfo.languages.filter((lang) => lang !== language),
      },
    })
  }

  if (!isAuthenticated) {
    router.push("/login?redirect=/dashboard/profile/edit")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
              <p className="text-gray-600 mt-2">Update your personal information and preferences</p>
            </div>
            <Link href="/dashboard/profile">
              <Button variant="outline">Cancel</Button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-8">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.personalInfo.firstName}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.personalInfo.lastName}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.personalInfo.email}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.personalInfo.phone}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            id="dateOfBirth"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nationality">Nationality</Label>
                      <Input
                        id="nationality"
                        name="nationality"
                        value={formData.personalInfo.nationality}
                        onChange={handlePersonalInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.personalInfo.address}
                        onChange={handlePersonalInfoChange}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Languages</Label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {formData.personalInfo.languages.map((language) => (
                          <Badge key={language} variant="secondary" className="pl-2 pr-1 py-1.5">
                            {language}
                            <button
                              type="button"
                              className="ml-1 text-gray-500 hover:text-gray-700"
                              onClick={() => handleRemoveLanguage(language)}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => handleAddLanguage(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Add language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Shona">Shona</SelectItem>
                            <SelectItem value="Ndebele">Ndebele</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="Portuguese">Portuguese</SelectItem>
                            <SelectItem value="Swahili">Swahili</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Work Experience Tab */}
            <TabsContent value="experience">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.experience.map((exp, index) => (
                    <div key={exp.id} className="space-y-4">
                      {index > 0 && <Separator className="my-6" />}
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Experience #{index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveExperience(exp.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`position-${exp.id}`}>Position</Label>
                          <Input
                            id={`position-${exp.id}`}
                            value={exp.position}
                            onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`company-${exp.id}`}>Company</Label>
                          <Input
                            id={`company-${exp.id}`}
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`location-${exp.id}`}>Location</Label>
                          <Input
                            id={`location-${exp.id}`}
                            value={exp.location}
                            onChange={(e) => handleExperienceChange(exp.id, "location", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                            <Input
                              id={`startDate-${exp.id}`}
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => handleExperienceChange(exp.id, "startDate", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                            <Input
                              id={`endDate-${exp.id}`}
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => handleExperienceChange(exp.id, "endDate", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`description-${exp.id}`}>Description</Label>
                          <Textarea
                            id={`description-${exp.id}`}
                            value={exp.description}
                            onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={handleAddExperience}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education Tab */}
            <TabsContent value="education">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.education.map((edu, index) => (
                    <div key={edu.id} className="space-y-4">
                      {index > 0 && <Separator className="my-6" />}
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Education #{index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveEducation(edu.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`degree-${edu.id}`}>Degree/Certificate</Label>
                          <Input
                            id={`degree-${edu.id}`}
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`institution-${edu.id}`}>Institution</Label>
                          <Input
                            id={`institution-${edu.id}`}
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`location-${edu.id}`}>Location</Label>
                          <Input
                            id={`location-${edu.id}`}
                            value={edu.location}
                            onChange={(e) => handleEducationChange(edu.id, "location", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`graduationDate-${edu.id}`}>Graduation Date</Label>
                          <Input
                            id={`graduationDate-${edu.id}`}
                            type="month"
                            value={edu.graduationDate}
                            onChange={(e) => handleEducationChange(edu.id, "graduationDate", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`gpa-${edu.id}`}>GPA/Grade</Label>
                          <Input
                            id={`gpa-${edu.id}`}
                            value={edu.gpa}
                            onChange={(e) => handleEducationChange(edu.id, "gpa", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={handleAddEducation}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {formData.certifications.map((cert, index) => (
                    <div key={cert.id} className="space-y-4">
                      {index > 0 && <Separator className="my-6" />}
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Certification #{index + 1}</h3>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveCertification(cert.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor={`name-${cert.id}`}>Certification Name</Label>
                          <Input
                            id={`name-${cert.id}`}
                            value={cert.name}
                            onChange={(e) => handleCertificationChange(cert.id, "name", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`issuer-${cert.id}`}>Issuing Organization</Label>
                          <Input
                            id={`issuer-${cert.id}`}
                            value={cert.issuer}
                            onChange={(e) => handleCertificationChange(cert.id, "issuer", e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`issueDate-${cert.id}`}>Issue Date</Label>
                            <Input
                              id={`issueDate-${cert.id}`}
                              type="month"
                              value={cert.issueDate}
                              onChange={(e) => handleCertificationChange(cert.id, "issueDate", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`expiryDate-${cert.id}`}>Expiry Date</Label>
                            <Input
                              id={`expiryDate-${cert.id}`}
                              type="month"
                              value={cert.expiryDate}
                              onChange={(e) => handleCertificationChange(cert.id, "expiryDate", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={handleAddCertification}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md mt-6">
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    {formData.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center">
                          <div>
                            <p className="font-medium text-gray-900">{doc.name}</p>
                            <p className="text-sm text-gray-600">
                              {doc.type} • Uploaded {doc.uploadDate}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                    <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
                    <Button variant="outline" size="sm" className="mt-4">
                      Upload Document
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Job Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Preferred Job Types</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cruise-ship">Cruise Ship</SelectItem>
                          <SelectItem value="safari-lodge">Safari Lodge</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="resort">Resort</SelectItem>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.preferences.jobTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="pl-2 pr-1 py-1.5">
                            {type}
                            <button type="button" className="ml-1 text-gray-500 hover:text-gray-700">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Locations</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="southern-africa">Southern Africa</SelectItem>
                          <SelectItem value="east-africa">East Africa</SelectItem>
                          <SelectItem value="west-africa">West Africa</SelectItem>
                          <SelectItem value="middle-east">Middle East</SelectItem>
                          <SelectItem value="europe">Europe</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.preferences.locations.map((location) => (
                          <Badge key={location} variant="secondary" className="pl-2 pr-1 py-1.5">
                            {location}
                            <button type="button" className="ml-1 text-gray-500 hover:text-gray-700">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Positions</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select positions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                          <SelectItem value="guest-services">Guest Services</SelectItem>
                          <SelectItem value="tour-guide">Tour Guide</SelectItem>
                          <SelectItem value="housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.preferences.positions.map((position) => (
                          <Badge key={position} variant="secondary" className="pl-2 pr-1 py-1.5">
                            {position}
                            <button type="button" className="ml-1 text-gray-500 hover:text-gray-700">
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryRange">Salary Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={formData.preferences.salaryRange} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="$500-800/month">$500-800/month</SelectItem>
                          <SelectItem value="$800-1500/month">$800-1500/month</SelectItem>
                          <SelectItem value="$1500-2500/month">$1500-2500/month</SelectItem>
                          <SelectItem value="$2500+/month">$2500+/month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder={formData.preferences.availability} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediately">Immediately</SelectItem>
                          <SelectItem value="In 2 weeks">In 2 weeks</SelectItem>
                          <SelectItem value="In 1 month">In 1 month</SelectItem>
                          <SelectItem value="In 2-3 months">In 2-3 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end space-x-4">
            <Link href="/dashboard/profile">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
