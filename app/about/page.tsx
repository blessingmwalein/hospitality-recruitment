import { Button } from "@/components/ui/card"
import { Ship, Globe, Users, TrendingUp, Award, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "Former cruise line HR director with 15+ years in hospitality recruitment.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "Head of Partnerships",
      bio: "Built relationships with major cruise lines and hotel chains worldwide.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Elena Rodriguez",
      role: "Student Success Manager",
      bio: "Dedicated to helping students navigate their hospitality career journey.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "James Wilson",
      role: "Employer Relations",
      bio: "Works directly with employers to create opportunities for our candidates.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Connecting talent with international hospitality careers across continents.",
    },
    {
      icon: Users,
      title: "Student-First Approach",
      description: "Prioritizing the needs and growth of hospitality students and graduates.",
    },
    {
      icon: TrendingUp,
      title: "Career Development",
      description: "Supporting long-term professional growth beyond the initial placement.",
    },
    {
      icon: Award,
      title: "Quality Placements",
      description: "Partnering only with reputable employers who value and develop talent.",
    },
    {
      icon: Heart,
      title: "Inclusive Culture",
      description: "Embracing diversity and creating opportunities for all backgrounds.",
    },
    {
      icon: Ship,
      title: "Industry Expertise",
      description: "Deep understanding of the unique needs of the hospitality sector.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About HospitalityJobs</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            We're on a mission to connect hospitality talent with exceptional career opportunities worldwide.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="HospitalityJobs team"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                HospitalityJobs was founded in 2018 by a team of industry professionals who recognized the unique
                challenges faced by hospitality students and recent graduates seeking quality international
                opportunities.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a small initiative to help hospitality students find internships has grown into a
                comprehensive platform connecting talented individuals with premier employers in the cruise line and
                luxury hotel sectors worldwide.
              </p>
              <p className="text-lg text-gray-600">
                Today, we've helped thousands of candidates launch successful careers in hospitality, creating lasting
                relationships between exceptional talent and industry-leading employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide our approach to hospitality recruitment
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                <value.icon className="h-12 w-12 text-emerald-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate professionals behind HospitalityJobs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-64 mx-auto rounded-full overflow-hidden mb-6">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Making a difference in the hospitality industry and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-emerald-600 mb-4">5,000+</p>
              <p className="text-xl font-medium text-gray-900 mb-2">Successful Placements</p>
              <p className="text-gray-600">Candidates placed in quality hospitality positions worldwide</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-emerald-600 mb-4">50+</p>
              <p className="text-xl font-medium text-gray-900 mb-2">Global Partners</p>
              <p className="text-gray-600">Premier cruise lines and luxury hotels trust our candidates</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-emerald-600 mb-4">30+</p>
              <p className="text-xl font-medium text-gray-900 mb-2">Countries</p>
              <p className="text-gray-600">Creating opportunities across continents and cultures</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from students and employers who've worked with us
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "HospitalityJobs transformed my career path. Their team guided me through every step of the process,
                from application to placement on a luxury cruise line. I'm now living my dream of traveling the world
                while doing what I love."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-gray-900">Maria Santos</p>
                  <p className="text-sm text-gray-600">Cruise Ship Bartender, Royal Caribbean</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">
                "As an employer, we've been consistently impressed with the quality of candidates from HospitalityJobs.
                They understand our needs and culture, sending us well-prepared professionals who are ready to excel in
                the luxury hospitality environment."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <p className="font-medium text-gray-900">Robert Chen</p>
                  <p className="text-sm text-gray-600">HR Director, Marriott International</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Whether you're a student looking for opportunities or an employer seeking talent, we're here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              {/* <Button className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3">Create Account</Button> */}
            </Link>
            <Link href="/contact">
              {/* <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-3"
              >
                Contact Us
              </Button> */}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
