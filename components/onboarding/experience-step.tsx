"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { RootState } from "@/lib/store/store"
import { addExperience, removeExperience } from "@/lib/store/slices/profileSlice"

interface ExperienceStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function ExperienceStep({ onNext, onPrevious }: ExperienceStepProps) {
  const dispatch = useDispatch()
  const experiences = useSelector((state: RootState) => state.profile.formData.experience)

  const [newExperience, setNewExperience] = useState({
    jobTitle: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    type: "",
  })

  const handleAddExperience = () => {
    if (newExperience.jobTitle && newExperience.company) {
      dispatch(addExperience(newExperience))
      setNewExperience({
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
        type: "",
      })
    }
  }

  const handleRemoveExperience = (index: number) => {
    dispatch(removeExperience(index))
  }

  const handleChange = (field: string, value: string | boolean) => {
    setNewExperience({ ...newExperience, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Existing Experiences */}
      {experiences.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Your Experience</h3>
          {experiences.map((exp: any, index: number) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{exp.jobTitle}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {exp.company} • {exp.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveExperience(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              {exp.description && (
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700">{exp.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Add New Experience */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Work Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={newExperience.jobTitle}
                onChange={(e) => handleChange("jobTitle", e.target.value)}
                className="mt-1"
                placeholder="e.g., Waiter, Receptionist, Chef"
              />
            </div>

            <div>
              <Label htmlFor="company">Company/Employer</Label>
              <Input
                id="company"
                value={newExperience.company}
                onChange={(e) => handleChange("company", e.target.value)}
                className="mt-1"
                placeholder="e.g., Marriott Hotel, Royal Caribbean"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newExperience.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="mt-1"
                placeholder="e.g., Miami, FL or Mediterranean"
              />
            </div>

            <div>
              <Label htmlFor="type">Experience Type</Label>
              <Select value={newExperience.type} onValueChange={(value) => handleChange("type", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="cruise">Cruise Ship</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                  <SelectItem value="other">Other Hospitality</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newExperience.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newExperience.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="mt-1"
                disabled={newExperience.current}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="current"
                  checked={newExperience.current}
                  onChange={(e) => handleChange("current", e.target.checked)}
                  className="mr-2"
                />
                <Label htmlFor="current" className="text-sm">
                  I currently work here
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={newExperience.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="mt-1"
              placeholder="Describe your responsibilities and achievements..."
              rows={3}
            />
          </div>

          <Button
            type="button"
            onClick={handleAddExperience}
            disabled={!newExperience.jobTitle || !newExperience.company}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Add Experience
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700">
          Continue
        </Button>
      </div>
    </div>
  )
}
