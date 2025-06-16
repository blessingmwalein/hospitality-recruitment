"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Briefcase, Star, ArrowRight, CheckCircle, Globe, Award, TrendingUp, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const stats = [
    { label: "Active Jobs", value: "150+", icon: Briefcase },
    { label: "Registered Candidates", value: "2,500+", icon: Users },
    { label: "Successful Placements", value: "800+", icon: CheckCircle },
    { label: "Partner Hotels & Lodges", value: "120+", icon: MapPin },
  ]

  const destinations = [
    {
      name: "Victoria Falls",
      image: "/images/victoria-falls-hotel.jpg",
      jobs: 45,
      description: "World-renowned destination with luxury safari lodges and hotels",
    },
    {
      name: "Cape Town",
      image: "/images/cape-town-hotel.jpg",
      jobs: 38,
      description: "Vibrant city with world-class hotels and restaurants",
    },
    {
      name: "Harare",
      image: "/images/african-hospitality-hero.jpg",
      jobs: 32,
      description: "Zimbabwe's capital with premium hotels and conference centers",
    },
  ]

  const testimonials = [
    {
      name: "Tendai Mukamuri",
      role: "Restaurant Manager",
      company: "Victoria Falls Safari Lodge",
      image: "/images/testimonial-tendai.jpg",
      quote:
        "This platform connected me with my dream job at Victoria Falls Safari Lodge. The process was smooth and professional from application to placement.",
    },
    {
      name: "Chipo Nyathi",
      role: "Front Office Supervisor",
      company: "Meikles Hotel",
      image: "/images/testimonial-chipo.jpg",
      quote:
        "After completing my hospitality degree, I found an amazing opportunity through this platform. The team helped me prepare for interviews and negotiate my contract.",
    },
  ]

  const featuredJobs = [
    {
      id: 1,
      title: "Safari Lodge Waiter",
      company: "Victoria Falls Safari Lodge",
      location: "Victoria Falls, Zimbabwe",
      type: "Full-time",
      salary: "$600-800/month",
      posted: "2 days ago",
      featured: true,
    },
    {
      id: 2,
      title: "Hotel Receptionist",
      company: "Meikles Hotel",
      location: "Harare, Zimbabwe",
      type: "Full-time",
      salary: "$700-900/month",
      posted: "3 days ago",
      featured: true,
    },
    {
      id: 3,
      title: "Chef de Partie",
      company: "Rainbow Towers",
      location: "Harare, Zimbabwe",
      type: "Full-time",
      salary: "$900-1200/month",
      posted: "1 week ago",
      featured: false,
    },
    {
      id: 4,
      title: "Safari Guide",
      company: "Wilderness Safaris",
      location: "Hwange National Park, Zimbabwe",
      type: "Full-time",
      salary: "$800-1000/month",
      posted: "5 days ago",
      featured: true,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center py-20 md:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url('/images/hero-hospitality.jpg')`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Zimbabwe Hospitality <span className="text-emerald-400">Recruitment</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Connecting talented hospitality professionals with premier hotels, safari lodges, and resorts across
            Zimbabwe and Southern Africa
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8">
                Browse Jobs
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Job Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover exciting hospitality careers across Zimbabwe's most prestigious establishments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredJobs.map((job) => (
              <Link href={`/jobs/${job.id}`} key={job.id}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      {job.featured && (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Featured</Badge>
                      )}
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{job.type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm">{job.salary}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Posted {job.posted}</span>
                      <Button variant="ghost" size="sm" className="text-emerald-600 hover:text-emerald-700 p-0">
                        View Details <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/jobs">
              <Button variant="outline" size="lg" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
                View All Jobs <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Destinations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore opportunities in these popular hospitality hotspots across Southern Africa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <div className="aspect-w-16 aspect-h-9 w-full h-80 relative">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                  <p className="text-gray-200 mb-3">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge className="bg-white/20 text-white hover:bg-white/30">
                      {destination.jobs} jobs available
                    </Badge>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-0">
                      Explore <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in connecting hospitality talent with premier employers across Zimbabwe and beyond
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Local Expertise</h3>
                <p className="text-gray-600">
                  Deep understanding of Zimbabwe's hospitality industry and regional market needs
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Placements</h3>
                <p className="text-gray-600">
                  Carefully vetted opportunities with reputable hotels, lodges, and resorts
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Career Growth</h3>
                <p className="text-gray-600">
                  Opportunities for professional development and advancement in your hospitality career
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-md">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Support</h3>
                <p className="text-gray-600">
                  Guidance throughout your job search, application, and onboarding process
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from hospitality professionals who found their dream jobs through our platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <p className="text-emerald-600 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Hospitality Career?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join thousands of hospitality professionals who have found their dream jobs through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-8">
                Create Account
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
