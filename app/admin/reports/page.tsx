"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, TrendingUp, Users, Briefcase, MapPin, CheckCircle, XCircle, Clock } from "lucide-react"
import type { RootState } from "@/lib/store/store"

export default function ReportsPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin/reports")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Mock data for reports with African context
  const applicationData = [
    { month: "Jan", applications: 45 },
    { month: "Feb", applications: 52 },
    { month: "Mar", applications: 61 },
    { month: "Apr", applications: 58 },
    { month: "May", applications: 63 },
    { month: "Jun", applications: 72 },
    { month: "Jul", applications: 80 },
    { month: "Aug", applications: 85 },
    { month: "Sep", applications: 78 },
    { month: "Oct", applications: 92 },
    { month: "Nov", applications: 105 },
    { month: "Dec", applications: 98 },
  ]

  const statusData = [
    { name: "Pending", value: 35 },
    { name: "Shortlisted", value: 25 },
    { name: "Interview", value: 18 },
    { name: "Approved", value: 15 },
    { name: "Rejected", value: 22 },
  ]

  const COLORS = ["#FFBB28", "#0088FE", "#8884D8", "#00C49F", "#FF8042"]

  const jobTypeData = [
    { name: "Safari Lodge", value: 42 },
    { name: "Hotel", value: 35 },
    { name: "Resort", value: 28 },
    { name: "Restaurant", value: 18 },
    { name: "Cruise Ship", value: 12 },
  ]

  const locationData = [
    { name: "Victoria Falls", applications: 45 },
    { name: "Harare", applications: 38 },
    { name: "Bulawayo", applications: 32 },
    { name: "Kariba", applications: 25 },
    { name: "Nyanga", applications: 20 },
    { name: "Masvingo", applications: 18 },
  ]

  const userRegistrationData = [
    { month: "Jan", registrations: 28 },
    { month: "Feb", registrations: 32 },
    { month: "Mar", registrations: 36 },
    { month: "Apr", registrations: 30 },
    { month: "May", registrations: 34 },
    { month: "Jun", registrations: 38 },
    { month: "Jul", registrations: 42 },
    { month: "Aug", registrations: 46 },
    { month: "Sep", registrations: 40 },
    { month: "Oct", registrations: 48 },
    { month: "Nov", registrations: 52 },
    { month: "Dec", registrations: 44 },
  ]

  const placementData = [
    { month: "Jan", placements: 12 },
    { month: "Feb", placements: 15 },
    { month: "Mar", placements: 18 },
    { month: "Apr", placements: 16 },
    { month: "May", placements: 19 },
    { month: "Jun", placements: 22 },
    { month: "Jul", placements: 25 },
    { month: "Aug", placements: 28 },
    { month: "Sep", placements: 24 },
    { month: "Oct", placements: 30 },
    { month: "Nov", placements: 32 },
    { month: "Dec", placements: 27 },
  ]

  const topEmployers = [
    { name: "Victoria Falls Safari Lodge", placements: 28 },
    { name: "Meikles Hotel", placements: 24 },
    { name: "Rainbow Towers", placements: 22 },
    { name: "A'Zambezi River Lodge", placements: 18 },
    { name: "Elephant Hills Resort", placements: 16 },
  ]

  const stats = [
    {
      title: "Total Applications",
      value: "1,247",
      change: "+12.5%",
      icon: Briefcase,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8.2%",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Successful Placements",
      value: "268",
      change: "+15.3%",
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "Active Jobs",
      value: "156",
      change: "+5.7%",
      icon: MapPin,
      color: "text-purple-600",
    },
  ]

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-2">Platform performance and insights</p>
            </div>
            <div className="flex space-x-3">
              <Select defaultValue="last-12-months">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last-7-days">Last 7 days</SelectItem>
                  <SelectItem value="last-30-days">Last 30 days</SelectItem>
                  <SelectItem value="last-3-months">Last 3 months</SelectItem>
                  <SelectItem value="last-12-months">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${stat.color} font-medium`}>{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Application Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={applicationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="applications" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Application Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Applications by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="applications" fill="#059669" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Job Type Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={jobTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {jobTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>User Registration Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userRegistrationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="registrations" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>User Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium">Total Registered Users</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">892</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <TrendingUp className="h-5 w-5 text-green-600 mr-3" />
                      <span className="font-medium">Active This Month</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">634</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-600 mr-3" />
                      <span className="font-medium">Profile Completed</span>
                    </div>
                    <span className="text-xl font-bold text-emerald-600">756</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-orange-600 mr-3" />
                      <span className="font-medium">Pending Verification</span>
                    </div>
                    <span className="text-xl font-bold text-orange-600">48</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Job Posting Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Briefcase className="h-5 w-5 text-blue-600 mr-3" />
                        <span className="font-medium">Total Jobs Posted</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600">156</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                        <span className="font-medium">Active Jobs</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">89</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-orange-600 mr-3" />
                        <span className="font-medium">Draft Jobs</span>
                      </div>
                      <span className="text-xl font-bold text-orange-600">12</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-600 mr-3" />
                        <span className="font-medium">Closed Jobs</span>
                      </div>
                      <span className="text-xl font-bold text-red-600">55</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Top Hiring Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topEmployers.map((employer, index) => (
                      <div key={employer.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-bold text-emerald-600">{index + 1}</span>
                          </div>
                          <span className="font-medium text-gray-900">{employer.name}</span>
                        </div>
                        <span className="text-sm font-bold text-emerald-600">{employer.placements} placements</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Placements Tab */}
          <TabsContent value="placements">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Successful Placements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={placementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="placements" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Placement Success Rate</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">21.5%</div>
                    <p className="text-gray-600">Overall Success Rate</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Safari Lodge</span>
                      <span className="text-sm font-bold text-emerald-600">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Hotel</span>
                      <span className="text-sm font-bold text-emerald-600">24%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Resort</span>
                      <span className="text-sm font-bold text-emerald-600">19%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Restaurant</span>
                      <span className="text-sm font-bold text-emerald-600">16%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cruise Ship</span>
                      <span className="text-sm font-bold text-emerald-600">12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Platform Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Average Time to Hire</span>
                    <span className="text-xl font-bold text-blue-600">18 days</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Application Response Rate</span>
                    <span className="text-xl font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">User Satisfaction Score</span>
                    <span className="text-xl font-bold text-emerald-600">4.6/5</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Platform Uptime</span>
                    <span className="text-xl font-bold text-purple-600">99.8%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Revenue Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Monthly Revenue</span>
                    <span className="text-xl font-bold text-green-600">$12,450</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Revenue per Placement</span>
                    <span className="text-xl font-bold text-blue-600">$465</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Client Retention Rate</span>
                    <span className="text-xl font-bold text-emerald-600">92%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium">Growth Rate</span>
                    <span className="text-xl font-bold text-purple-600">+15.3%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
