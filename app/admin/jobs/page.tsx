"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Eye, Edit, Trash2, MapPin, Calendar, DollarSign, Users, Building2 } from "lucide-react"
import Link from "next/link"
import type { RootState } from "@/lib/store/store"

export default function AdminJobsPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Mock jobs data
  const jobs = [
    {
      id: 1,
      title: "Cruise Ship Waiter",
      company: "Royal Caribbean",
      location: "Mediterranean Route",
      department: "Food & Beverage",
      type: "Cruise Ship",
      status: "active",
      salary: "$1,800-2,200/month",
      postedDate: "2024-01-10T10:00:00Z",
      deadline: "2024-02-15T23:59:59Z",
      applications: 24,
      views: 156,
    },
    {
      id: 2,
      title: "Hotel Receptionist",
      company: "Marriott International",
      location: "Dubai, UAE",
      department: "Front Office",
      type: "Luxury Hotel",
      status: "active",
      salary: "$2,500-3,000/month",
      postedDate: "2024-01-08T14:30:00Z",
      deadline: "2024-02-20T23:59:59Z",
      applications: 18,
      views: 89,
    },
    {
      id: 3,
      title: "Entertainment Host",
      company: "Norwegian Cruise Line",
      location: "Caribbean Route",
      department: "Entertainment",
      type: "Cruise Ship",
      status: "active",
      salary: "$2,000-2,500/month",
      postedDate: "2024-01-05T09:15:00Z",
      deadline: "2024-02-10T23:59:59Z",
      applications: 32,
      views: 203,
    },
    {
      id: 4,
      title: "Sous Chef",
      company: "Celebrity Cruises",
      location: "Alaska Route",
      department: "Culinary",
      type: "Cruise Ship",
      status: "closed",
      salary: "$3,000-3,500/month",
      postedDate: "2023-12-15T16:45:00Z",
      deadline: "2024-01-15T23:59:59Z",
      applications: 45,
      views: 312,
    },
    {
      id: 5,
      title: "Spa Therapist",
      company: "Four Seasons Resort",
      location: "Maldives",
      department: "Spa & Wellness",
      type: "Resort",
      status: "draft",
      salary: "$2,200-2,800/month",
      postedDate: "2024-01-12T11:20:00Z",
      deadline: "2024-02-25T23:59:59Z",
      applications: 0,
      views: 0,
    },
    {
      id: 6,
      title: "Guest Services Manager",
      company: "Hilton Worldwide",
      location: "Singapore",
      department: "Guest Services",
      type: "Luxury Hotel",
      status: "active",
      salary: "$3,500-4,000/month",
      postedDate: "2024-01-03T08:00:00Z",
      deadline: "2024-02-05T23:59:59Z",
      applications: 12,
      views: 67,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700"
      case "closed":
        return "bg-gray-100 text-gray-700"
      case "draft":
        return "bg-yellow-100 text-yellow-700"
      case "paused":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesType = typeFilter === "all" || job.type.toLowerCase().replace(" ", "-") === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: jobs.length,
    active: jobs.filter((job) => job.status === "active").length,
    draft: jobs.filter((job) => job.status === "draft").length,
    closed: jobs.filter((job) => job.status === "closed").length,
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
              <p className="text-gray-600 mt-2">Manage all job postings on the platform</p>
            </div>
            <Link href="/admin/jobs/new">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Create New Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building2 className="h-8 w-8 text-emerald-600" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  <p className="text-sm text-gray-600">Total Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                  <p className="text-sm text-gray-600">Active Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                  <p className="text-sm text-gray-600">Draft Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stats.closed}</p>
                  <p className="text-sm text-gray-600">Closed Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-md mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search jobs by title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="cruise-ship">Cruise Ship</SelectItem>
                    <SelectItem value="luxury-hotel">Luxury Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Jobs ({filteredJobs.length})</CardTitle>
            <CardDescription>Manage and monitor all job postings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-4 py-3">Job Details</th>
                    <th className="px-4 py-3">Company & Location</th>
                    <th className="px-4 py-3">Type & Department</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Applications</th>
                    <th className="px-4 py-3">Posted</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{job.title}</div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{job.company}</div>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          <Badge variant="secondary" className="text-xs">
                            {job.type}
                          </Badge>
                          <div className="text-sm text-gray-600">{job.department}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(job.status)}`}>
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-sm font-medium text-gray-900">{job.applications}</span>
                          <span className="text-sm text-gray-500 ml-1">/ {job.views} views</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <Link href={`/admin/jobs/${job.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/jobs/${job.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
