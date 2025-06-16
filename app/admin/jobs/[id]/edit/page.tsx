"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function EditJobPage() {
  const router = useRouter()
  const params = useParams()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState("basic")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock job data with African context
  const initialJobData = {
    id: params.id,
    title: "Safari Lodge Waiter",
    company: "Victoria Falls Safari Lodge",
    location: "Victoria Falls, Zimbabwe",
    department: "Food & Beverage",
    type: "Safari Lodge",
    status: "active",
    salary: "$600-800/month",
    contractLength: "12 months",
    postedDate: "2024-01-10T10:00:00Z",
    deadline: "2024-02-15T23:59:59Z",
    description: `We are seeking enthusiastic and professional waiters to join our Food & Beverage team at our luxury safari lodge in Victoria Falls. This is an excellent opportunity for hospitality professionals to gain experience while working in one of Africa's most beautiful destinations.

As a Safari Lodge Waiter, you will be responsible for providing exceptional dining service to our international guests in our restaurant venues. You will work as part of a diverse team and have the opportunity to develop your skills in a fast-paced, multicultural environment.

This position offers competitive compensation, accommodation and meals, medical coverage, and the chance to work in the stunning Victoria Falls region.`,
    requirements: [
      "Previous experience in food service or hospitality (minimum 1 year)",
      "Excellent English communication skills (additional languages preferred)",
      "Physical fitness and ability to work long hours",
      "Valid Zimbabwean ID or work permit",
      "Food handling certification (or willingness to obtain)",
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
      "Competitive monthly salary ($600-800)",
      "Shared staff accommodation",
      "All meals provided while on duty",
      "Medical aid contribution",
      "Staff recreation facilities and activities",
      "Opportunity to work in a premier tourist destination",
      "Professional development and training programs",
      "End-of-contract bonus based on performance",
      "Staff discounts on lodge services and activities",
      "Transport allowance",
    ],
    recruiter: {
      name: "Tatenda Moyo",
      email: "recruitment@victoriafallssafarilodge.co.zw",
      phone: "+263 83 284 3211",
      title: "Recruitment Manager",
    },
  }

  const [jobData, setJobData] = useState(initialJobData)

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setJobData({
      ...jobData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    router.push(`/admin/jobs/${jobData.id}`)
  }

  const handleAddRequirement = () => {
    setJobData({
      ...jobData,
      requirements: [...jobData.requirements, ""],
    })
  }

  const handleUpdateRequirement = (index: number, value: string) => {
    const updatedRequirements = [...jobData.requirements]
    updatedRequirements[index] = value
    setJobData({
      ...jobData,
      requirements: updatedRequirements,
    })
  }

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = [...jobData.requirements]
    updatedRequirements.splice(index, 1)
    setJobData({
      ...jobData,
      requirements: updatedRequirements,
    })
  }

  const handleAddResponsibility = () => {
    setJobData({
      ...jobData,
      responsibilities: [...jobData.responsibilities, ""],
    })
  }

  const handleUpdateResponsibility = (index: number, value: string) => {
    const updatedResponsibilities = [...jobData.responsibilities]
    updatedResponsibilities[index] = value
    setJobData({
      ...jobData,
      responsibilities: updatedResponsibilities,
    })
  }

  const handleRemoveResponsibility = (index: number) => {
    const updatedResponsibilities = [...jobData.responsibilities]
    updatedResponsibilities.splice(index, 1)
    setJobData({
      ...jobData,
      responsibilities: updatedResponsibilities,
    })
  }

  const handleAddBenefit = () => {
    setJobData({
      ...jobData,
      benefits: [...jobData.benefits, ""],
    })
  }

  const handleUpdateBenefit = (index: number, value: string) => {
    const updatedBenefits = [...jobData.benefits]
    updatedBenefits[index] = value
    setJobData({
      ...jobData,
      benefits: updatedBenefits,
    })
  }

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = [...jobData.benefits]
    updatedBenefits.splice(index, 1)
    setJobData({
      ...jobData,
      benefits: updatedBenefits,
    })
  }

  if (!isAuthenticated || !isAdmin) {
    router.push("/login?redirect=/admin")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href={`/admin/jobs/${jobData.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Job Details
              </Button>
            </Link>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Job</h1>
              <p className="text-gray-600 mt-2">Update job details and requirements</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Job Details</TabsTrigger>
              <TabsTrigger value="requirements">Requirements</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter Info</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input id="title" name="title" value={jobData.title} onChange={handleBasicInfoChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        value={jobData.company}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={jobData.location}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={jobData.department}
                        onValueChange={(value) => setJobData({ ...jobData, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                          <SelectItem value="Front Office">Front Office</SelectItem>
                          <SelectItem value="Housekeeping">Housekeeping</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Safari Guide">Safari Guide</SelectItem>
                          <SelectItem value="Management">Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Job Type</Label>
                      <Select value={jobData.type} onValueChange={(value) => setJobData({ ...jobData, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Safari Lodge">Safari Lodge</SelectItem>
                          <SelectItem value="Hotel">Hotel</SelectItem>
                          <SelectItem value="Resort">Resort</SelectItem>
                          <SelectItem value="Cruise Ship">Cruise Ship</SelectItem>
                          <SelectItem value="Restaurant">Restaurant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={jobData.status}
                        onValueChange={(value) => setJobData({ ...jobData, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary">Salary Range</Label>
                      <Input
                        id="salary"
                        name="salary"
                        value={jobData.salary}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contractLength">Contract Length</Label>
                      <Input
                        id="contractLength"
                        name="contractLength"
                        value={jobData.contractLength}
                        onChange={handleBasicInfoChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Application Deadline</Label>
                      <Input
                        id="deadline"
                        name="deadline"
                        type="date"
                        value={jobData.deadline.split("T")[0]}
                        onChange={(e) => setJobData({ ...jobData, deadline: `${e.target.value}T23:59:59Z` })}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Job Details Tab */}
            <TabsContent value="details">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={jobData.description}
                      onChange={handleBasicInfoChange}
                      rows={10}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md mt-6">
                <CardHeader>
                  <CardTitle>Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobData.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={responsibility}
                        onChange={(e) => handleUpdateResponsibility(index, e.target.value)}
                        placeholder={`Responsibility ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveResponsibility(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={handleAddResponsibility}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Responsibility
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md mt-6">
                <CardHeader>
                  <CardTitle>Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobData.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => handleUpdateBenefit(index, e.target.value)}
                        placeholder={`Benefit ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveBenefit(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={handleAddBenefit}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Benefit
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Job Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={requirement}
                        onChange={(e) => handleUpdateRequirement(index, e.target.value)}
                        placeholder={`Requirement ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveRequirement(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-full" onClick={handleAddRequirement}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Requirement
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recruiter Info Tab */}
            <TabsContent value="recruiter">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Recruiter Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="recruiterName">Name</Label>
                      <Input
                        id="recruiterName"
                        value={jobData.recruiter.name}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            recruiter: { ...jobData.recruiter, name: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recruiterTitle">Title</Label>
                      <Input
                        id="recruiterTitle"
                        value={jobData.recruiter.title}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            recruiter: { ...jobData.recruiter, title: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recruiterEmail">Email</Label>
                      <Input
                        id="recruiterEmail"
                        type="email"
                        value={jobData.recruiter.email}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            recruiter: { ...jobData.recruiter, email: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="recruiterPhone">Phone</Label>
                      <Input
                        id="recruiterPhone"
                        value={jobData.recruiter.phone}
                        onChange={(e) =>
                          setJobData({
                            ...jobData,
                            recruiter: { ...jobData.recruiter, phone: e.target.value },
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-end space-x-4">
            <Link href={`/admin/jobs/${jobData.id}`}>
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
