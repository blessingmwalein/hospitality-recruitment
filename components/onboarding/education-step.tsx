"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import type { RootState } from "@/lib/store/store"
import { addEducation, removeEducation } from "@/lib/store/slices/profileSlice"

interface EducationStepProps {
  onNext: () => void
  onPrevious: () => void
}

export function EducationStep({ onNext, onPrevious }: EducationStepProps) {
  const dispatch = useDispatch()
  const education = useSelector((state: RootState) => state.profile.formData.education)

  const [newEducation, setNewEducation] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    current: false,
    gpa: "",
    location: "",
  })

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      dispatch(addEducation(newEducation))
      setNewEducation({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        current: false,
        gpa: "",
        location: "",
      })
    }
  }

  const handleRemoveEducation = (index: number) => {
    dispatch(removeEducation(index))
  }

  const handleChange = (field: string, value: string | boolean) => {
    setNewEducation({ ...newEducation, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Existing Education */}
      {education.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Your Education</h3>
          {education.map((edu: any, index: number) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">{edu.degree}</CardTitle>
                    <p className="text-sm text-gray-600">
                      {edu.institution} • {edu.location}
                    </p>
                    <p className="text-sm text-gray-500">
                      {edu.fieldOfStudy} • {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveEducation(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {/* Add New Education */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                value={newEducation.institution}
                onChange={(e) => handleChange("institution", e.target.value)}
                className="mt-1"
                placeholder="e.g., Cornell University, Glion Institute"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newEducation.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className="mt-1"
                placeholder="e.g., Ithaca, NY"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree</Label>
              <Select value={newEducation.degree} onValueChange={(value) => handleChange("degree", value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select degree" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School Diploma</SelectItem>
                  <SelectItem value="associate">Associate Degree</SelectItem>
                  <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                  <SelectItem value="master">Master's Degree</SelectItem>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="certificate">Certificate</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="fieldOfStudy">Field of Study</Label>
              <Input
                id="fieldOfStudy"
                value={newEducation.fieldOfStudy}
                onChange={(e) => handleChange("fieldOfStudy", e.target.value)}
                className="mt-1"
                placeholder="e.g., Hospitality Management, Culinary Arts"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newEducation.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={newEducation.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="mt-1"
                disabled={newEducation.current}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="current"
                  checked={newEducation.current}
                  onChange={(e) => handleChange("current", e.target.checked)}
                  className="mr-2"
                />
                <Label htmlFor="current" className="text-sm">
                  Currently studying
                </Label>
              </div>
            </div>

            <div>
              <Label htmlFor="gpa">GPA (optional)</Label>
              <Input
                id="gpa"
                value={newEducation.gpa}
                onChange={(e) => handleChange("gpa", e.target.value)}
                className="mt-1"
                placeholder="e.g., 3.8"
              />
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddEducation}
            disabled={!newEducation.institution || !newEducation.degree}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Add Education
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
