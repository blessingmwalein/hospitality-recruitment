"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"
import type { RootState } from "@/lib/store/store"
import { setCurrentStep, setStepCompleted } from "@/lib/store/slices/profileSlice"
import { PersonalInfoStep } from "@/components/onboarding/personal-info-step"
import { ExperienceStep } from "@/components/onboarding/experience-step"
import { EducationStep } from "@/components/onboarding/education-step"
import { CertificationsStep } from "@/components/onboarding/certifications-step"
import { DocumentsStep } from "@/components/onboarding/documents-step"

const steps = [
  { id: 0, title: "Personal Information", description: "Basic details and contact information" },
  { id: 1, title: "Work Experience", description: "Your hospitality work history" },
  { id: 2, title: "Education", description: "Educational background and qualifications" },
  { id: 3, title: "Certifications", description: "Professional certifications and licenses" },
  { id: 4, title: "Documents", description: "Upload your CV and other documents" },
]

export default function OnboardingPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { currentStep, completedSteps } = useSelector((state: RootState) => state.profile)
  const [isCompleting, setIsCompleting] = useState(false)

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    dispatch(setStepCompleted(currentStep))
    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1))
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1))
    }
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    dispatch(setStepCompleted(currentStep))

    // Simulate API call to complete onboarding
    await new Promise((resolve) => setTimeout(resolve, 2000))

    router.push("/dashboard")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep onNext={handleNext} />
      case 1:
        return <ExperienceStep onNext={handleNext} onPrevious={handlePrevious} />
      case 2:
        return <EducationStep onNext={handleNext} onPrevious={handlePrevious} />
      case 3:
        return <CertificationsStep onNext={handleNext} onPrevious={handlePrevious} />
      case 4:
        return <DocumentsStep onComplete={handleComplete} onPrevious={handlePrevious} isCompleting={isCompleting} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Complete Your Profile</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us understand your background so we can match you with the perfect hospitality opportunities.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4 overflow-x-auto pb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      completedSteps[index]
                        ? "bg-emerald-600 text-white"
                        : index === currentStep
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {completedSteps[index] ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-xs font-medium text-gray-900 truncate max-w-24">{step.title}</p>
                  </div>
                </div>
                {index < steps.length - 1 && <div className="w-12 h-0.5 bg-gray-200 mx-4 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          <CardContent>{renderStep()}</CardContent>
        </Card>
      </div>
    </div>
  )
}
