"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapPin, Calendar, DollarSign, Users, Clock, Building2, Ship, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

// Mock job data
const mockJobData: Record<string, any> = {
  "1": {
    id: 1,
    title: "Cruise Ship Waiter",
    company: "Royal Caribbean",
    location: "Mediterranean Route",
    deadline: "2024-02-15",
    category: "Food & Beverage",
    type: "Cruise Ship",
    salary: "$1,800-2,200/month",
    featured: true,
    createdAt: "2024-01-01",
    description: `<p>Join our dynamic dining team aboard one of the world's most luxurious cruise ships sailing the beautiful Mediterranean. As a Cruise Ship Waiter, you'll provide exceptional dining service to international guests while experiencing the adventure of a lifetime.</p>
    
    <p>You'll work in our main dining rooms, specialty restaurants, and room service operations, ensuring every guest has an unforgettable culinary experience. This position offers incredible opportunities for personal growth, cultural exchange, and professional development in the hospitality industry.</p>
    
    <p>Our ships feature state-of-the-art facilities, and you'll be part of a diverse, international crew. We provide comprehensive training, competitive compensation, and the chance to visit some of the world's most beautiful destinations.</p>`,
    requirements: [
      "Previous restaurant or food service experience (minimum 1 year)",
      "Excellent English communication skills (written and spoken)",
      "Strong teamwork and interpersonal skills",
      "Physical ability to work long hours and lift up to 25 lbs",
      "Flexibility to work various shifts including evenings and weekends",
      "Professional appearance and positive attitude",
      "Basic knowledge of wine and beverage service preferred",
    ],
    benefits: [
      "Free accommodation in crew quarters",
      "All meals provided",
      "Medical insurance coverage",
      "Opportunity to visit multiple countries",
      "Career advancement opportunities",
      "International work experience",
      "End-of-contract bonus",
      "Crew recreational facilities access",
    ],
    contractLength: "6-8 months",
    employmentType: "Full-time Contract",
    startDate: "2024-03-01",
    applicationCount: 45,
    employerInfo: {
      industry: "Cruise Line",
      description:
        "Royal Caribbean is a global leader in the cruise industry, operating one of the largest fleets of innovative ships. We're committed to providing extraordinary vacation experiences and creating opportunities for our crew members to grow professionally while exploring the world.",
      website: "https://www.royalcaribbean.com",
    },
  },
  "2": {
    id: 2,
    title: "Hotel Receptionist",
    company: "Marriott International",
    location: "Dubai, UAE",
    deadline: "2024-02-20",
    category: "Front Office",
    type: "Hotel",
    salary: "$2,500-3,000/month",
    featured: false,
    createdAt: "2024-01-02",
    description: `<p>Join the prestigious Marriott International team in the vibrant city of Dubai as a Hotel Receptionist. You'll be the first point of contact for our distinguished guests, providing exceptional service that exceeds expectations and creates memorable experiences.</p>
    
    <p>Working in one of Dubai's premier hotels, you'll handle guest check-ins and check-outs, manage reservations, and assist with various guest inquiries and requests. This role offers excellent exposure to luxury hospitality operations and international clientele.</p>
    
    <p>Dubai offers an incredible lifestyle with tax-free income, world-class amenities, and a multicultural environment. This position is perfect for hospitality professionals looking to advance their careers in one of the world's most dynamic cities.</p>`,
    requirements: [
      "Hospitality or Tourism degree preferred",
      "Minimum 2 years front desk experience",
      "Fluency in English; Arabic or other languages advantageous",
      "Excellent customer service and communication skills",
      "Proficiency in hotel management systems (Opera preferred)",
      "Professional appearance and demeanor",
      "Ability to work flexible shifts including nights and weekends",
    ],
    benefits: [
      "Tax-free salary",
      "Health and dental insurance",
      "Annual flight allowance",
      "Accommodation assistance",
      "Career development programs",
      "Employee discounts worldwide",
      "Multicultural work environment",
      "Performance bonuses",
    ],
    contractLength: "2 years",
    employmentType: "Full-time",
    startDate: "2024-03-15",
    applicationCount: 32,
    employerInfo: {
      industry: "Luxury Hotels",
      description:
        "Marriott International is a leading global lodging company with more than 7,000 properties across 131 countries and territories. We're committed to providing exceptional guest experiences and fostering a culture of excellence among our associates.",
      website: "https://www.marriott.com",
    },
  },
}

export default function SingleJobPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)

  // Replace the API call
  const job = mockJobData[jobId]
  const isLoading = false
  const error = !job

  const [isApplying, setIsApplying] = useState(false)

  const handleApply = async () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/jobs/${jobId}`)
      return
    }

    setIsApplying(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setApplicationSubmitted(true)
    setIsApplyDialogOpen(false)
    setIsApplying(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link href="/jobs">
            <Button className="bg-emerald-600 hover:bg-emerald-700">Browse All Jobs</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/jobs" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Jobs
        </Link>

        {/* Job Header */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader className="pb-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                    {job.type}
                  </Badge>
                  <Badge variant="outline">{job.category}</Badge>
                  {job.featured && <Badge className="bg-yellow-100 text-yellow-700">Featured</Badge>}
                </div>
                <CardTitle className="text-2xl md:text-3xl mb-2">{job.title}</CardTitle>
                <CardDescription className="text-lg text-emerald-600 font-medium mb-4">{job.company}</CardDescription>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Apply by {new Date(job.deadline).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {applicationSubmitted ? (
                  <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Application Submitted
                  </div>
                ) : (
                  <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                        Apply Now
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Apply for {job.title}</DialogTitle>
                        <DialogDescription>
                          {isAuthenticated
                            ? "Are you sure you want to apply for this position? Your profile information will be sent to the employer."
                            : "You need to be logged in to apply for this job."}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          onClick={handleApply}
                          disabled={isApplying}
                          className="bg-emerald-600 hover:bg-emerald-700"
                        >
                          {isApplying ? "Applying..." : isAuthenticated ? "Confirm Application" : "Login to Apply"}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}

                <div className="text-sm text-gray-500 text-center">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Posted {new Date(job.createdAt || Date.now()).toLocaleDateString()}
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <div dangerouslySetInnerHTML={{ __html: job.description || "No description available." }} />
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements?.map((requirement: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  )) || <li>No specific requirements listed.</li>}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Employer Info */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {job.type === "Cruise Ship" ? (
                    <Ship className="h-5 w-5 mr-2" />
                  ) : (
                    <Building2 className="h-5 w-5 mr-2" />
                  )}
                  Employer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">{job.company}</h4>
                  <p className="text-sm text-gray-600">{job.employerInfo?.industry || "Hospitality & Tourism"}</p>
                </div>

                {job.employerInfo?.description && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">About the Company</h5>
                    <p className="text-sm text-gray-600">{job.employerInfo.description}</p>
                  </div>
                )}

                {job.employerInfo?.website && (
                  <div>
                    <a
                      href={job.employerInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 text-sm"
                    >
                      Visit Company Website →
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contract Details */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Contract Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Salary Range</span>
                  <span className="font-medium">{job.salary}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Contract Length</span>
                  <span className="font-medium">{job.contractLength || "6-8 months"}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Employment Type</span>
                  <span className="font-medium">{job.employmentType || "Full-time"}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date</span>
                  <span className="font-medium">
                    {job.startDate ? new Date(job.startDate).toLocaleDateString() : "Flexible"}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Application Stats */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Application Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Applications</span>
                  <span className="font-medium">{job.applicationCount || 0}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Remaining</span>
                  <span className="font-medium text-orange-600">
                    {Math.max(0, Math.ceil((new Date(job.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))}{" "}
                    days
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
