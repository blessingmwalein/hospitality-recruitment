"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Ship, Eye, EyeOff, ShieldAlert } from "lucide-react"
import { setCredentials, mockLogin } from "@/lib/store/slices/authSlice"

export default function AdminLoginPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // For demo purposes, check if the email contains "admin"
      if (!formData.email.includes("admin")) {
        throw new Error("Invalid admin credentials")
      }

      const result = await mockLogin(formData)
      dispatch(setCredentials(result))
      router.push("/admin")
    } catch (err: any) {
      setError("Login failed. Please check your admin credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Demo credentials helper
  const fillDemoCredentials = () => {
    setFormData({
      email: "admin@example.com",
      password: "admin123",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <Ship className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">HospitalityJobs</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-sm text-gray-600">
            <ShieldAlert className="inline-block h-4 w-4 mr-1" />
            Restricted access for administrators only
          </p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Sign in to admin dashboard</CardTitle>
            <CardDescription>Enter your admin credentials to access the management system</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Demo Notice */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">
                <strong>Demo Mode:</strong> For demo purposes, use any email containing "admin" to log in as an
                administrator.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={fillDemoCredentials}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                Fill Demo Admin Credentials
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Admin Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="admin@example.com"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700">
                {isLoading ? "Signing in..." : "Sign in to Admin"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link href="/login" className="text-sm text-emerald-600 hover:text-emerald-500">
            Return to regular login
          </Link>
        </div>
      </div>
    </div>
  )
}
