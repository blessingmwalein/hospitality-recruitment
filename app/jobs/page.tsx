"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Search, X, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { RootState } from "@/lib/store/store"
import { setFilter, setSearchQuery, clearFilters } from "@/lib/store/slices/jobsSlice"

// Mock data for development
const mockJobs = [
  {
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
    description: "Join our dining team aboard luxury cruise ships...",
    requirements: ["Previous restaurant experience", "Excellent English", "Team player"],
    benefits: ["Free accommodation", "Meals included", "Travel opportunities"],
  },
  {
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
    description: "Provide exceptional guest service at our luxury hotel...",
    requirements: ["Hospitality degree preferred", "Multilingual", "Customer service experience"],
    benefits: ["Health insurance", "Career development", "Staff discounts"],
  },
  {
    id: 3,
    title: "Entertainment Host",
    company: "Norwegian Cruise Line",
    location: "Caribbean Route",
    deadline: "2024-02-25",
    category: "Entertainment",
    type: "Cruise Ship",
    salary: "$2,000-2,500/month",
    featured: true,
    createdAt: "2024-01-03",
    description: "Lead entertainment activities and engage with guests...",
    requirements: ["Performance experience", "Outgoing personality", "Physical fitness"],
    benefits: ["Performance bonuses", "Free accommodation", "International experience"],
  },
  {
    id: 4,
    title: "Sous Chef",
    company: "Celebrity Cruises",
    location: "Alaska Route",
    deadline: "2024-03-01",
    category: "Culinary",
    type: "Cruise Ship",
    salary: "$3,000-3,500/month",
    featured: false,
    createdAt: "2024-01-04",
    description: "Support the head chef in creating exceptional dining experiences...",
    requirements: ["Culinary degree", "3+ years experience", "Food safety certification"],
    benefits: ["Career advancement", "International cuisine exposure", "Free meals"],
  },
  {
    id: 5,
    title: "Spa Therapist",
    company: "Four Seasons Resort",
    location: "Maldives",
    deadline: "2024-03-05",
    category: "Wellness",
    type: "Resort",
    salary: "$2,200-2,800/month",
    featured: true,
    createdAt: "2024-01-05",
    description: "Provide luxury spa treatments in a tropical paradise...",
    requirements: ["Spa certification", "Massage therapy license", "English proficiency"],
    benefits: ["Paradise location", "Tips included", "Professional development"],
  },
  {
    id: 6,
    title: "Guest Relations Officer",
    company: "Hilton Worldwide",
    location: "Singapore",
    deadline: "2024-03-10",
    category: "Guest Services",
    type: "Hotel",
    salary: "$2,800-3,200/month",
    featured: false,
    createdAt: "2024-01-06",
    description: "Ensure exceptional guest experiences and handle special requests...",
    requirements: ["Bachelor's degree", "Customer service experience", "Problem-solving skills"],
    benefits: ["International exposure", "Language training", "Career progression"],
  },
]

const mockFilterOptions = {
  categories: ["Food & Beverage", "Front Office", "Entertainment", "Culinary", "Wellness", "Guest Services"],
  employers: [
    "Royal Caribbean",
    "Marriott International",
    "Norwegian Cruise Line",
    "Celebrity Cruises",
    "Four Seasons Resort",
    "Hilton Worldwide",
  ],
  locations: ["Mediterranean Route", "Dubai, UAE", "Caribbean Route", "Alaska Route", "Maldives", "Singapore"],
  jobTypes: ["Cruise Ship", "Hotel", "Resort"],
}

export default function JobsPage() {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const filters = useSelector((state: RootState) => state.jobs.filters)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(9)

  // Get search query from URL
  useEffect(() => {
    const search = searchParams.get("search") || ""
    if (search !== filters.search) {
      dispatch(setSearchQuery(search))
    }
  }, [searchParams, dispatch, filters.search])

  // Replace the API calls with local state
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)
  const [isLoading, setIsLoading] = useState(false)

  // Filter jobs based on current filters
  useEffect(() => {
    let filtered = [...mockJobs]

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
          job.location.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((job) => filters.category.includes(job.category))
    }

    // Apply employer filter
    if (filters.employer.length > 0) {
      filtered = filtered.filter((job) => filters.employer.includes(job.company))
    }

    // Apply location filter
    if (filters.location.length > 0) {
      filtered = filtered.filter((job) => filters.location.includes(job.location))
    }

    // Apply job type filter
    if (filters.jobType.length > 0) {
      filtered = filtered.filter((job) => filters.jobType.includes(job.type))
    }

    setFilteredJobs(filtered)
  }, [filters])

  // Replace the API data references
  const jobsData = {
    jobs: filteredJobs.slice((page - 1) * pageSize, page * pageSize),
    total: filteredJobs.length,
    totalPages: Math.ceil(filteredJobs.length / pageSize),
  }

  const categories = mockFilterOptions.categories
  const employers = mockFilterOptions.employers
  const locations = mockFilterOptions.locations
  const jobTypes = mockFilterOptions.jobTypes

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchValue = localFilters.search

    // Update URL with search query
    const params = new URLSearchParams(searchParams.toString())
    if (searchValue) {
      params.set("search", searchValue)
    } else {
      params.delete("search")
    }

    router.push(`/jobs?${params.toString()}`)
    dispatch(setSearchQuery(searchValue))
  }

  const handleFilterChange = (type: string, value: string) => {
    const currentValues = [...(localFilters[type as keyof typeof localFilters] as string[])]
    const index = currentValues.indexOf(value)

    if (index === -1) {
      currentValues.push(value)
    } else {
      currentValues.splice(index, 1)
    }

    setLocalFilters({
      ...localFilters,
      [type]: currentValues,
    })
  }

  const applyFilters = () => {
    Object.entries(localFilters).forEach(([key, value]) => {
      if (key !== "search") {
        dispatch(setFilter({ type: key, value: value as string[] }))
      }
    })
    setIsFilterOpen(false)
  }

  const resetFilters = () => {
    dispatch(clearFilters())
    setLocalFilters({
      jobType: [],
      employer: [],
      location: [],
      category: [],
      search: "",
    })
    router.push("/jobs")
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    window.scrollTo(0, 0)
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Hospitality Opportunities</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your perfect position in the world's leading cruise lines and luxury hotels
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for jobs..."
                className="pl-10"
                value={localFilters.search}
                onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                    {Object.values(filters).flat().filter(Boolean).length > 0 && (
                      <Badge className="ml-1 bg-emerald-600">
                        {Object.values(filters).flat().filter(Boolean).length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Jobs</SheetTitle>
                    <SheetDescription>Narrow down your search with specific criteria</SheetDescription>
                  </SheetHeader>
                  <div className="py-6 space-y-6">
                    {/* Job Type Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Job Type</h3>
                      <div className="space-y-2">
                        {jobTypes?.map((type) => (
                          <div key={type} className="flex items-center">
                            <Checkbox
                              id={`type-${type}`}
                              checked={localFilters.jobType.includes(type)}
                              onCheckedChange={() => handleFilterChange("jobType", type)}
                            />
                            <label htmlFor={`type-${type}`} className="ml-2 text-sm">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />

                    {/* Employer Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Employer</h3>
                      <div className="space-y-2">
                        {employers?.map((employer) => (
                          <div key={employer} className="flex items-center">
                            <Checkbox
                              id={`employer-${employer}`}
                              checked={localFilters.employer.includes(employer)}
                              onCheckedChange={() => handleFilterChange("employer", employer)}
                            />
                            <label htmlFor={`employer-${employer}`} className="ml-2 text-sm">
                              {employer}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />

                    {/* Location Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Location</h3>
                      <div className="space-y-2">
                        {locations?.map((location) => (
                          <div key={location} className="flex items-center">
                            <Checkbox
                              id={`location-${location}`}
                              checked={localFilters.location.includes(location)}
                              onCheckedChange={() => handleFilterChange("location", location)}
                            />
                            <label htmlFor={`location-${location}`} className="ml-2 text-sm">
                              {location}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Separator />

                    {/* Category Filter */}
                    <div>
                      <h3 className="font-medium mb-3">Category</h3>
                      <div className="space-y-2">
                        {categories?.map((category) => (
                          <div key={category} className="flex items-center">
                            <Checkbox
                              id={`category-${category}`}
                              checked={localFilters.category.includes(category)}
                              onCheckedChange={() => handleFilterChange("category", category)}
                            />
                            <label htmlFor={`category-${category}`} className="ml-2 text-sm">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset All
                    </Button>
                    <Button onClick={applyFilters} className="bg-emerald-600 hover:bg-emerald-700">
                      Apply Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Search
              </Button>
            </div>
          </form>

          {/* Active Filters */}
          {Object.entries(filters).some(
            ([key, value]) => key !== "search" && Array.isArray(value) && value.length > 0,
          ) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.entries(filters).map(
                ([key, values]) =>
                  Array.isArray(values) &&
                  values.map((value) => (
                    <Badge key={`${key}-${value}`} variant="secondary" className="px-3 py-1">
                      {value}
                      <X
                        className="ml-1 h-3 w-3 cursor-pointer"
                        onClick={() => {
                          const newValues = filters[key as keyof typeof filters].filter((v) => v !== value)
                          dispatch(setFilter({ type: key, value: newValues }))
                        }}
                      />
                    </Badge>
                  )),
              )}
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-gray-500">
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="border-0 shadow-md">
                <CardHeader className="pb-3">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-1"></div>
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : jobsData?.jobs?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No jobs found matching your criteria.</p>
            <Button onClick={resetFilters} variant="outline">
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {jobsData?.jobs?.length || 0} of {jobsData?.total || 0} jobs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {jobsData?.jobs?.map((job: any) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        {job.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {job.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="text-emerald-600 font-medium">{job.company}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Apply by {new Date(job.deadline).toLocaleDateString()}
                      </div>
                      <div className="text-sm font-medium text-gray-900">{job.salary}</div>
                    </div>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => router.push(`/jobs/${job.id}`)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {jobsData?.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button variant="outline" disabled={page === 1} onClick={() => handlePageChange(page - 1)}>
                  Previous
                </Button>

                {[...Array(jobsData.totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={page === i + 1 ? "default" : "outline"}
                    className={page === i + 1 ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  disabled={page === jobsData.totalPages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
