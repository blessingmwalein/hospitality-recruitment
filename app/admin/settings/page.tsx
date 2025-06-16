"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Globe, Mail, Shield, Database, Bell, Save, Plus, X, Briefcase } from "lucide-react"
import type { RootState } from "@/lib/store/store"

export default function AdminSettingsPage() {
  const router = useRouter()
  const { isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth)
  const [activeTab, setActiveTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/admin/settings")
    } else if (!isAdmin) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isAdmin, router])

  // Mock settings data with African context
  const [settings, setSettings] = useState({
    general: {
      siteName: "Zimbabwe Hospitality Recruitment",
      siteDescription: "Connecting hospitality professionals across Zimbabwe and Southern Africa",
      contactEmail: "info@zimhospitalityrecruitment.co.zw",
      supportEmail: "support@zimhospitalityrecruitment.co.zw",
      phoneNumber: "+263 4 123 4567",
      address: "123 Samora Machel Avenue, Harare, Zimbabwe",
      timezone: "Africa/Harare",
      language: "English",
      currency: "USD",
    },
    email: {
      smtpHost: "mail.zimhospitalityrecruitment.co.zw",
      smtpPort: "587",
      smtpUsername: "noreply@zimhospitalityrecruitment.co.zw",
      smtpPassword: "••••••••",
      fromName: "Zimbabwe Hospitality Recruitment",
      fromEmail: "noreply@zimhospitalityrecruitment.co.zw",
      enableEmailNotifications: true,
      enableWelcomeEmails: true,
      enableApplicationNotifications: true,
    },
    notifications: {
      enablePushNotifications: true,
      enableEmailNotifications: true,
      enableSMSNotifications: false,
      notifyOnNewApplications: true,
      notifyOnJobPostings: true,
      notifyOnUserRegistrations: true,
      dailyReportEmails: true,
      weeklyReportEmails: true,
    },
    security: {
      requireEmailVerification: true,
      enableTwoFactorAuth: false,
      passwordMinLength: 8,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      enableCaptcha: true,
      allowedFileTypes: ["pdf", "doc", "docx", "jpg", "png"],
      maxFileSize: 5,
    },
    integrations: {
      googleAnalyticsId: "GA-XXXXXXXXX",
      facebookPixelId: "",
      linkedinInsightTag: "",
      enableSocialLogin: true,
      enableGoogleLogin: true,
      enableFacebookLogin: false,
      enableLinkedInLogin: true,
    },
    billing: {
      currency: "USD",
      taxRate: 15,
      invoicePrefix: "ZHR",
      paymentMethods: ["bank_transfer", "mobile_money"],
      enableAutomaticBilling: true,
      billingCycle: "monthly",
    },
    jobSettings: {
      autoExpireJobs: true,
      defaultJobExpiry: 30,
      requireJobApproval: false,
      maxJobsPerEmployer: 10,
      featuredJobPrice: 50,
      urgentJobPrice: 25,
      jobCategories: [
        "Food & Beverage",
        "Front Office",
        "Housekeeping",
        "Entertainment",
        "Safari Guide",
        "Management",
        "Kitchen",
        "Security",
        "Maintenance",
        "Tour Operations",
      ],
      jobTypes: [
        "Safari Lodge",
        "Hotel",
        "Resort",
        "Restaurant",
        "Cruise Ship",
        "Conference Center",
        "Game Reserve",
        "Backpacker Lodge",
      ],
    },
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [name]: value,
      },
    })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSettings({
      ...settings,
      email: {
        ...settings.email,
        [name]: value,
      },
    })
  }

  const handleNotificationToggle = (key: string, value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value,
      },
    })
  }

  const handleSecurityChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: value,
      },
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    // Show success message
  }

  const addJobCategory = (category: string) => {
    if (category && !settings.jobSettings.jobCategories.includes(category)) {
      setSettings({
        ...settings,
        jobSettings: {
          ...settings.jobSettings,
          jobCategories: [...settings.jobSettings.jobCategories, category],
        },
      })
    }
  }

  const removeJobCategory = (category: string) => {
    setSettings({
      ...settings,
      jobSettings: {
        ...settings.jobSettings,
        jobCategories: settings.jobSettings.jobCategories.filter((cat) => cat !== category),
      },
    })
  }

  const addJobType = (type: string) => {
    if (type && !settings.jobSettings.jobTypes.includes(type)) {
      setSettings({
        ...settings,
        jobSettings: {
          ...settings.jobSettings,
          jobTypes: [...settings.jobSettings.jobTypes, type],
        },
      })
    }
  }

  const removeJobType = (type: string) => {
    setSettings({
      ...settings,
      jobSettings: {
        ...settings.jobSettings,
        jobTypes: settings.jobSettings.jobTypes.filter((t) => t !== type),
      },
    })
  }

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
              <p className="text-gray-600 mt-2">Configure platform settings and preferences</p>
            </div>
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-2" />
              {isSubmitting ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      name="siteName"
                      value={settings.general.siteName}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={settings.general.contactEmail}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input
                      id="supportEmail"
                      name="supportEmail"
                      type="email"
                      value={settings.general.supportEmail}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={settings.general.phoneNumber}
                      onChange={handleGeneralChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={settings.general.timezone}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, timezone: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Harare">Africa/Harare (CAT)</SelectItem>
                        <SelectItem value="Africa/Johannesburg">Africa/Johannesburg (SAST)</SelectItem>
                        <SelectItem value="Africa/Nairobi">Africa/Nairobi (EAT)</SelectItem>
                        <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={settings.general.currency}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          general: { ...settings.general, currency: value },
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="ZWL">ZWL - Zimbabwean Dollar</SelectItem>
                        <SelectItem value="ZAR">ZAR - South African Rand</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      name="siteDescription"
                      value={settings.general.siteDescription}
                      onChange={handleGeneralChange}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={settings.general.address}
                      onChange={handleGeneralChange}
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Settings Tab */}
          <TabsContent value="email">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Email Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input id="smtpHost" name="smtpHost" value={settings.email.smtpHost} onChange={handleEmailChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input id="smtpPort" name="smtpPort" value={settings.email.smtpPort} onChange={handleEmailChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      name="smtpUsername"
                      value={settings.email.smtpUsername}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      name="smtpPassword"
                      type="password"
                      value={settings.email.smtpPassword}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromName">From Name</Label>
                    <Input id="fromName" name="fromName" value={settings.email.fromName} onChange={handleEmailChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail">From Email</Label>
                    <Input
                      id="fromEmail"
                      name="fromEmail"
                      type="email"
                      value={settings.email.fromEmail}
                      onChange={handleEmailChange}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableEmailNotifications">Enable Email Notifications</Label>
                        <p className="text-sm text-gray-600">Send email notifications to users</p>
                      </div>
                      <Switch
                        id="enableEmailNotifications"
                        checked={settings.email.enableEmailNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, enableEmailNotifications: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableWelcomeEmails">Welcome Emails</Label>
                        <p className="text-sm text-gray-600">Send welcome emails to new users</p>
                      </div>
                      <Switch
                        id="enableWelcomeEmails"
                        checked={settings.email.enableWelcomeEmails}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, enableWelcomeEmails: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enableApplicationNotifications">Application Notifications</Label>
                        <p className="text-sm text-gray-600">Notify users about application status changes</p>
                      </div>
                      <Switch
                        id="enableApplicationNotifications"
                        checked={settings.email.enableApplicationNotifications}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            email: { ...settings.email, enableApplicationNotifications: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-gray-600">Enable browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.enablePushNotifications}
                      onCheckedChange={(checked) => handleNotificationToggle("enablePushNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-gray-600">Send notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.enableEmailNotifications}
                      onCheckedChange={(checked) => handleNotificationToggle("enableEmailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-gray-600">Send notifications via SMS</p>
                    </div>
                    <Switch
                      checked={settings.notifications.enableSMSNotifications}
                      onCheckedChange={(checked) => handleNotificationToggle("enableSMSNotifications", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Admin Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>New Applications</Label>
                        <p className="text-sm text-gray-600">Notify when new applications are submitted</p>
                      </div>
                      <Switch
                        checked={settings.notifications.notifyOnNewApplications}
                        onCheckedChange={(checked) => handleNotificationToggle("notifyOnNewApplications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Job Postings</Label>
                        <p className="text-sm text-gray-600">Notify when new jobs are posted</p>
                      </div>
                      <Switch
                        checked={settings.notifications.notifyOnJobPostings}
                        onCheckedChange={(checked) => handleNotificationToggle("notifyOnJobPostings", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>User Registrations</Label>
                        <p className="text-sm text-gray-600">Notify when new users register</p>
                      </div>
                      <Switch
                        checked={settings.notifications.notifyOnUserRegistrations}
                        onCheckedChange={(checked) => handleNotificationToggle("notifyOnUserRegistrations", checked)}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Report Emails</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Daily Reports</Label>
                        <p className="text-sm text-gray-600">Receive daily activity reports</p>
                      </div>
                      <Switch
                        checked={settings.notifications.dailyReportEmails}
                        onCheckedChange={(checked) => handleNotificationToggle("dailyReportEmails", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Receive weekly summary reports</p>
                      </div>
                      <Switch
                        checked={settings.notifications.weeklyReportEmails}
                        onCheckedChange={(checked) => handleNotificationToggle("weeklyReportEmails", checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Email Verification Required</Label>
                      <p className="text-sm text-gray-600">Require users to verify their email address</p>
                    </div>
                    <Switch
                      checked={settings.security.requireEmailVerification}
                      onCheckedChange={(checked) => handleSecurityChange("requireEmailVerification", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Enable 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={settings.security.enableTwoFactorAuth}
                      onCheckedChange={(checked) => handleSecurityChange("enableTwoFactorAuth", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable CAPTCHA</Label>
                      <p className="text-sm text-gray-600">Show CAPTCHA on login and registration forms</p>
                    </div>
                    <Switch
                      checked={settings.security.enableCaptcha}
                      onCheckedChange={(checked) => handleSecurityChange("enableCaptcha", checked)}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                    <Input
                      id="passwordMinLength"
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => handleSecurityChange("passwordMinLength", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => handleSecurityChange("sessionTimeout", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => handleSecurityChange("maxLoginAttempts", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={settings.security.maxFileSize}
                      onChange={(e) => handleSecurityChange("maxFileSize", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Allowed File Types</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {settings.security.allowedFileTypes.map((type) => (
                      <Badge key={type} variant="secondary" className="pl-2 pr-1 py-1.5">
                        {type}
                        <button
                          type="button"
                          className="ml-1 text-gray-500 hover:text-gray-700"
                          onClick={() => {
                            const updatedTypes = settings.security.allowedFileTypes.filter((t) => t !== type)
                            handleSecurityChange("allowedFileTypes", updatedTypes)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add file type (e.g., pdf)" id="newFileType" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById("newFileType") as HTMLInputElement
                        if (input.value) {
                          const updatedTypes = [...settings.security.allowedFileTypes, input.value.toLowerCase()]
                          handleSecurityChange("allowedFileTypes", updatedTypes)
                          input.value = ""
                        }
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Jobs Tab */}
          <TabsContent value="jobs">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Job Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-expire Jobs</Label>
                      <p className="text-sm text-gray-600">Automatically expire jobs after specified days</p>
                    </div>
                    <Switch
                      checked={settings.jobSettings.autoExpireJobs}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          jobSettings: { ...settings.jobSettings, autoExpireJobs: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Job Approval</Label>
                      <p className="text-sm text-gray-600">Jobs must be approved before going live</p>
                    </div>
                    <Switch
                      checked={settings.jobSettings.requireJobApproval}
                      onCheckedChange={(checked) =>
                        setSettings({
                          ...settings,
                          jobSettings: { ...settings.jobSettings, requireJobApproval: checked },
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="defaultJobExpiry">Default Job Expiry (days)</Label>
                    <Input
                      id="defaultJobExpiry"
                      type="number"
                      value={settings.jobSettings.defaultJobExpiry}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          jobSettings: { ...settings.jobSettings, defaultJobExpiry: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxJobsPerEmployer">Max Jobs per Employer</Label>
                    <Input
                      id="maxJobsPerEmployer"
                      type="number"
                      value={settings.jobSettings.maxJobsPerEmployer}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          jobSettings: { ...settings.jobSettings, maxJobsPerEmployer: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="featuredJobPrice">Featured Job Price ($)</Label>
                    <Input
                      id="featuredJobPrice"
                      type="number"
                      value={settings.jobSettings.featuredJobPrice}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          jobSettings: { ...settings.jobSettings, featuredJobPrice: Number.parseInt(e.target.value) },
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Job Categories</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {settings.jobSettings.jobCategories.map((category) => (
                        <Badge key={category} variant="secondary" className="pl-2 pr-1 py-1.5">
                          {category}
                          <button
                            type="button"
                            className="ml-1 text-gray-500 hover:text-gray-700"
                            onClick={() => removeJobCategory(category)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Add job category" id="newJobCategory" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById("newJobCategory") as HTMLInputElement
                          if (input.value) {
                            addJobCategory(input.value)
                            input.value = ""
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Job Types</Label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {settings.jobSettings.jobTypes.map((type) => (
                        <Badge key={type} variant="secondary" className="pl-2 pr-1 py-1.5">
                          {type}
                          <button
                            type="button"
                            className="ml-1 text-gray-500 hover:text-gray-700"
                            onClick={() => removeJobType(type)}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Add job type" id="newJobType" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const input = document.getElementById("newJobType") as HTMLInputElement
                          if (input.value) {
                            addJobType(input.value)
                            input.value = ""
                          }
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Third-party Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Analytics</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                      <Input
                        id="googleAnalyticsId"
                        value={settings.integrations.googleAnalyticsId}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            integrations: { ...settings.integrations, googleAnalyticsId: e.target.value },
                          })
                        }
                        placeholder="GA-XXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixelId"
                        value={settings.integrations.facebookPixelId}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            integrations: { ...settings.integrations, facebookPixelId: e.target.value },
                          })
                        }
                        placeholder="123456789012345"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Login</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Enable Social Login</Label>
                        <p className="text-sm text-gray-600">Allow users to login with social accounts</p>
                      </div>
                      <Switch
                        checked={settings.integrations.enableSocialLogin}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            integrations: { ...settings.integrations, enableSocialLogin: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Google Login</Label>
                        <p className="text-sm text-gray-600">Enable Google OAuth login</p>
                      </div>
                      <Switch
                        checked={settings.integrations.enableGoogleLogin}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            integrations: { ...settings.integrations, enableGoogleLogin: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Facebook Login</Label>
                        <p className="text-sm text-gray-600">Enable Facebook OAuth login</p>
                      </div>
                      <Switch
                        checked={settings.integrations.enableFacebookLogin}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            integrations: { ...settings.integrations, enableFacebookLogin: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>LinkedIn Login</Label>
                        <p className="text-sm text-gray-600">Enable LinkedIn OAuth login</p>
                      </div>
                      <Switch
                        checked={settings.integrations.enableLinkedInLogin}
                        onCheckedChange={(checked) =>
                          setSettings({
                            ...settings,
                            integrations: { ...settings.integrations, enableLinkedInLogin: checked },
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Payment Methods</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="bank_transfer" defaultChecked />
                          <Label htmlFor="bank_transfer">Bank Transfer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="mobile_money" defaultChecked />
                          <Label htmlFor="mobile_money">Mobile Money (EcoCash, OneMoney)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="credit_card" />
                          <Label htmlFor="credit_card">Credit Card</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="taxRate">Tax Rate (%)</Label>
                        <Input
                          id="taxRate"
                          type="number"
                          value={settings.billing.taxRate}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              billing: { ...settings.billing, taxRate: Number.parseInt(e.target.value) },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoicePrefix">Invoice Prefix</Label>
                        <Input
                          id="invoicePrefix"
                          value={settings.billing.invoicePrefix}
                          onChange={(e) =>
                            setSettings({
                              ...settings,
                              billing: { ...settings.billing, invoicePrefix: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
