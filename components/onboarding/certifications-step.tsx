"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, Award } from "lucide-react"
import type { RootState } from "@/lib/store/store"
import { addCertification, removeCertification } from "@/lib/store/slices/profileSlice"

interface CertificationsStepProps {
  onNext: () => void
  onPrevious: () => void
}

const commonCertifications = [
  "STCW Basic Safety Training",
  "Food Safety Certification",
  "First Aid/CPR",
  "Responsible Service of Alcohol",
  "HACCP Certification",
  "Wine & Sommelier Certification",
  "Hospitality Management Certificate",
  "Language Proficiency Certificate",
  "Other",
]

export function CertificationsStep({ onNext, onPrevious }: CertificationsStepProps) {
  const dispatch = useDispatch()
  const certifications = useSelector((state: RootState) => state.profile.formData.certifications)

  const [newCertification, setNewCertification] = useState({
    name: "",
    issuingOrganization: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    neverExpires: false,
  })

  const handleAddCertification = () => {
    if (newCertification.name && newCertification.issuingOrganization) {
      dispatch(addCertification(newCertification))
      setNewCertification({
        name: "",
        issuingOrganization: "",
        issueDate: "",
        expiryDate: "",
        credentialId: "",
        neverExpires: false,
      })
    }
  }

  const handleRemoveCertification = (index: number) => {
    dispatch(removeCertification(index))
  }

  const handleChange = (field: string, value: string | boolean) => {
    setNewCertification({ ...newCertification, [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* Existing Certifications */}
      {certifications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Your Certifications</h3>
          {certifications.map((cert: any, index: number) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-emerald-600 mr-3 mt-0.5" />
                    <div>
                      <CardTitle className="text-base">{cert.name}</CardTitle>
                      <p className="text-sm text-gray-600">{cert.issuingOrganization}</p>
                      <p className="text-sm text-gray-500">
                        Issued: {cert.issueDate}
                        {cert.neverExpires
                          ? " • Never expires"
                          : cert.expiryDate
                            ? ` • Expires: ${cert.expiryDate}`
                            : ""}
                      </p>
                      {cert.credentialId && <p className="text-sm text-gray-500">ID: {cert.credentialId}</p>}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCertification(index)}
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

      {/* Add New Certification */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Add Certification
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="certName">Certification Name</Label>
            <Select value={newCertification.name} onValueChange={(value) => handleChange("name", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select or type certification" />
              </SelectTrigger>
              <SelectContent>
                {commonCertifications.map((cert) => (
                  <SelectItem key={cert} value={cert}>
                    {cert}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {newCertification.name === "Other" && (
              <Input
                className="mt-2"
                placeholder="Enter certification name"
                value={newCertification.name === "Other" ? "" : newCertification.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            )}
          </div>

          <div>
            <Label htmlFor="issuingOrganization">Issuing Organization</Label>
            <Input
              id="issuingOrganization"
              value={newCertification.issuingOrganization}
              onChange={(e) => handleChange("issuingOrganization", e.target.value)}
              className="mt-1"
              placeholder="e.g., IMO, ServSafe, Red Cross"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={newCertification.issueDate}
                onChange={(e) => handleChange("issueDate", e.target.value)}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={newCertification.expiryDate}
                onChange={(e) => handleChange("expiryDate", e.target.value)}
                className="mt-1"
                disabled={newCertification.neverExpires}
              />
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="neverExpires"
                  checked={newCertification.neverExpires}
                  onChange={(e) => handleChange("neverExpires", e.target.checked)}
                  className="mr-2"
                />
                <Label htmlFor="neverExpires" className="text-sm">
                  Never expires
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="credentialId">Credential ID (optional)</Label>
            <Input
              id="credentialId"
              value={newCertification.credentialId}
              onChange={(e) => handleChange("credentialId", e.target.value)}
              className="mt-1"
              placeholder="Certificate number or ID"
            />
          </div>

          <Button
            type="button"
            onClick={handleAddCertification}
            disabled={!newCertification.name || !newCertification.issuingOrganization}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Add Certification
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
