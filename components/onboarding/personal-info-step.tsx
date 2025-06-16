"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { RootState } from "@/lib/store/store"
import { updatePersonalInfo } from "@/lib/store/slices/profileSlice"

interface PersonalInfoStepProps {
  onNext: () => void
}

export function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const dispatch = useDispatch()
  const personalInfo = useSelector((state: RootState) => state.profile.formData.personalInfo)

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    nationality: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    bio: "",
    ...personalInfo,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(updatePersonalInfo(formData))
    onNext()
  }

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            className="mt-1"
            required
          />
        </div>

        <div>
          <Label htmlFor="nationality">Nationality</Label>
          <Select value={formData.nationality} onValueChange={(value) => handleChange("nationality", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select your nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="fr">France</SelectItem>
              <SelectItem value="es">Spain</SelectItem>
              <SelectItem value="it">Italy</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Street Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          className="mt-1"
          placeholder="123 Main Street"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className="mt-1"
            placeholder="New York"
            required
          />
        </div>

        <div>
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => handleChange("country", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="au">Australia</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => handleChange("postalCode", e.target.value)}
            className="mt-1"
            placeholder="10001"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
            className="mt-1"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
          <Input
            id="emergencyPhone"
            type="tel"
            value={formData.emergencyPhone}
            onChange={(e) => handleChange("emergencyPhone", e.target.value)}
            className="mt-1"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="bio">Personal Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => handleChange("bio", e.target.value)}
          className="mt-1"
          placeholder="Tell us about yourself, your interests, and what motivates you in the hospitality industry..."
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Continue
        </Button>
      </div>
    </form>
  )
}
