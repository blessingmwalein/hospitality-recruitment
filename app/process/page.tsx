import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, Ship, Building2, FileCheck, Users, Calendar, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProcessPage() {
  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      description:
        "Sign up and build your hospitality profile with your experience, education, certifications, and documents.",
      icon: FileCheck,
    },
    {
      id: 2,
      title: "Browse & Apply",
      description:
        "Explore curated job opportunities from top cruise lines and luxury hotels, and apply with just a few clicks.",
      icon: Ship,
    },
    {
      id: 3,
      title: "Interview Process",
      description:
        "Get matched with employers and participate in our streamlined interview process, often conducted virtually.",
      icon: Users,
    },
    {
      id: 4,
      title: "Placement & Preparation",
      description:
        "Receive your job offer, complete necessary paperwork, and prepare for your new role with our guidance.",
      icon: Calendar,
    },
    {
      id: 5,
      title: "Start Your Career",
      description:
        "Begin your hospitality career with confidence, knowing you have our support throughout your journey.",
      icon: Award,
    },
  ]

  const faqs = [
    {
      question: "How long does the application process take?",
      answer:
        "The application process typically takes 2-4 weeks from initial application to job offer, depending on the position and employer requirements.",
    },
    {
      question: "Do I need previous experience to apply?",
      answer:
        "While some positions require previous experience, many entry-level roles are available for students and recent graduates with the right attitude and qualifications.",
    },
    {
      question: "What documents do I need to prepare?",
      answer:
        "You'll need a professional resume/CV, passport-style photo, identification documents, and any relevant certifications. Specific requirements may vary by position and employer.",
    },
    {
      question: "Are there any fees to use your platform?",
      answer:
        "No, our platform is completely free for job seekers. We're committed to connecting talented individuals with quality hospitality opportunities without any charges.",
    },
    {
      question: "What types of contracts are typically offered?",
      answer:
        "Contracts typically range from 6-12 months for cruise ships and 1-2 years for hotels and resorts, with options for renewal based on performance.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Recruitment Process</h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto mb-8">
            We've streamlined the journey from application to placement to help you launch your hospitality career with
            confidence.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our proven 5-step process gets you from application to placement efficiently and professionally
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-24 left-0 right-0 h-0.5 bg-emerald-200 hidden md:block"></div>

            <div className="grid md:grid-cols-5 gap-8">
              {steps.map((step) => (
                <div key={step.id} className="text-center relative">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Expect</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our recruitment process is designed to be transparent, efficient, and supportive. Here's what you can
                expect when you apply through HospitalityJobs:
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <span className="font-medium">Personalized Matching:</span> We match your skills and preferences
                    with the right opportunities.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <span className="font-medium">Dedicated Support:</span> Our team guides you through every step of
                    the process.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <span className="font-medium">Interview Preparation:</span> We provide resources to help you succeed
                    in interviews.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <span className="font-medium">Transparent Communication:</span> Regular updates on your application
                    status.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <span className="font-medium">Pre-Departure Support:</span> Assistance with visas, travel
                    arrangements, and onboarding.
                  </span>
                </li>
              </ul>
            </div>

            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Hospitality recruitment process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Employer Partners */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Employer Partners</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We work with leading hospitality brands worldwide to bring you the best opportunities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            <div className="flex justify-center">
              <Ship className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex justify-center">
              <Building2 className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex justify-center">
              <Ship className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex justify-center">
              <Building2 className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex justify-center">
              <Ship className="h-16 w-16 text-gray-400" />
            </div>
            <div className="flex justify-center">
              <Building2 className="h-16 w-16 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our recruitment process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Hospitality Career?</h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of students who have found their dream jobs through our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-8 py-3">
                Create Free Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/jobs">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-emerald-600 text-lg px-8 py-3"
              >
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
