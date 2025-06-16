"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function NewJobPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    department: "",
    type: "",
    salary: "",
    contractLength: "",
    deadline: "",
    description: "",
    requirements: [""],
    responsibilities: [""],
    benefits: [""],
    recruiterName: "",
    recruiterEmail: "",
    recruiterPhone: "",
    recruiterTitle: "",
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].map((item: string, i: number) => (i === index ? value : item)),
    }))
  }

  const addArrayItem = (field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field as keyof typeof prev], ""],
    }))
  }

  const removeArrayItem = (field: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].filter((_: string, i: number) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would make an API call
    console.log("Creating job:", formData)
    alert("Job created successfully!")
    router.push("/admin/jobs")
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/admin/jobs">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Job</h1>
            <p className="text-gray-600 mt-2">Add a new job posting to the platform</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details about the job position</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., Cruise Ship Waiter"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="e.g., Royal Caribbean"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g., Mediterranean Route"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                      <SelectItem value="front-office">Front Office</SelectItem>
                      <SelectItem value="housekeeping">Housekeeping</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="spa-wellness">Spa & Wellness</SelectItem>
                      <SelectItem value="guest-services">Guest Services</SelectItem>
                      <SelectItem value="culinary">Culinary</SelectItem>
                      <SelectItem value="deck-technical">Deck & Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Job Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cruise-ship">Cruise Ship</SelectItem>
                      <SelectItem value="luxury-hotel">Luxury Hotel</SelectItem>
                      <SelectItem value="resort">Resort</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="yacht">Yacht</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="salary">Salary Range *</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                    placeholder="e.g., $1,800-2,200/month"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contractLength">Contract Length</Label>
                  <Input
                    id="contractLength"
                    value={formData.contractLength}
                    onChange={(e) => handleInputChange("contractLength", e.target.value)}
                    placeholder="e.g., 6-8 months"
                  />
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange("deadline", e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Provide a detailed description of the position</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter a detailed job description..."
                  rows={8}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
              <CardDescription>List the qualifications and requirements for this position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={requirement}
                      onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                      placeholder="Enter a requirement..."
                      className="flex-1"
                    />
                    {formData.requirements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem("requirements", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("requirements")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Requirement
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
              <CardDescription>Outline the main duties and responsibilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={responsibility}
                      onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                      placeholder="Enter a responsibility..."
                      className="flex-1"
                    />
                    {formData.responsibilities.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem("responsibilities", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("responsibilities")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Responsibility
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Benefits & Perks</CardTitle>
              <CardDescription>List the benefits and perks offered with this position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={benefit}
                      onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                      placeholder="Enter a benefit..."
                      className="flex-1"
                    />
                    {formData.benefits.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem("benefits", index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem("benefits")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Benefit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recruiter Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Recruiter Information</CardTitle>
              <CardDescription>Contact information for the hiring manager</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="recruiterName">Recruiter Name *</Label>
                  <Input
                    id="recruiterName"
                    value={formData.recruiterName}
                    onChange={(e) => handleInputChange("recruiterName", e.target.value)}
                    placeholder="e.g., Jennifer Wilson"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="recruiterTitle">Title *</Label>
                  <Input
                    id="recruiterTitle"
                    value={formData.recruiterTitle}
                    onChange={(e) => handleInputChange("recruiterTitle", e.target.value)}
                    placeholder="e.g., Senior Recruitment Manager"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="recruiterEmail">Email *</Label>
                  <Input
                    id="recruiterEmail"
                    type="email"
                    value={formData.recruiterEmail}
                    onChange={(e) => handleInputChange("recruiterEmail", e.target.value)}
                    placeholder="e.g., j.wilson@company.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="recruiterPhone">Phone</Label>
                  <Input
                    id="recruiterPhone"
                    value={formData.recruiterPhone}
                    onChange={(e) => handleInputChange("recruiterPhone", e.target.value)}
                    placeholder="e.g., +1 (555) 987-6543"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/jobs">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Create Job
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
