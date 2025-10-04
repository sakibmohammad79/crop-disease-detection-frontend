/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Bell,
  Lock,
  Globe,
  Moon,
  Trash2,
  Shield,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
} from 'lucide-react'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // Settings state
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    detectionAlerts: true,
    weeklyReport: false,
    diseaseAlerts: true,
    
    // Preferences
    language: 'en',
    theme: 'light',
    
    // Privacy
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [passwordErrors, setPasswordErrors] = useState<any>({})

  const handleSettingChange = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      // TODO: API call to save settings
      console.log('Saving settings:', settings)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast.success('Your preferences have been updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const validatePassword = () => {
    const errors: any = {}

    if (!passwordData.oldPassword) {
      errors.oldPassword = 'Current password is required'
    }

    if (!passwordData.newPassword || passwordData.newPassword.length < 6) {
      errors.newPassword = 'New password must be at least 6 characters'
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords don't match"
    }

    setPasswordErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChangePassword = async () => {
    if (!validatePassword()) {
      toast.error( 'Please check your password fields')
      return
    }

    setLoading(true)
    try {
      // TODO: API call to change password
      console.log('Changing password')

      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success('Your password has been updated successfully')

      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error: any) {
      toast.error(error.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setLoading(true)
    try {
      // TODO: API call to delete account
      console.log('Deleting account')

      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Your account has been permanently deleted')

      // Redirect to login
      // router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked: any) =>
                  handleSettingChange('emailNotifications', checked)
                }
              />
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get push notifications on your device
                </p>
              </div>
              <Switch
                id="pushNotifications"
                checked={settings.pushNotifications}
                onCheckedChange={(checked : any) =>
                  handleSettingChange('pushNotifications', checked)
                }
              />
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="detectionAlerts">Detection Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Alert when detection is complete
                </p>
              </div>
              <Switch
                id="detectionAlerts"
                checked={settings.detectionAlerts}
                onCheckedChange={(checked: any) =>
                  handleSettingChange('detectionAlerts', checked)
                }
              />
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="diseaseAlerts">Disease Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Critical disease detection alerts
                </p>
              </div>
              <Switch
                id="diseaseAlerts"
                checked={settings.diseaseAlerts}
                onCheckedChange={(checked: any) =>
                  handleSettingChange('diseaseAlerts', checked)
                }
              />
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklyReport">Weekly Report</Label>
                <p className="text-sm text-muted-foreground">
                  Receive weekly farm summary
                </p>
              </div>
              <Switch
                id="weeklyReport"
                checked={settings.weeklyReport}
                onCheckedChange={(checked: any) =>
                  handleSettingChange('weeklyReport', checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>
                  Customize your app experience
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSettingChange('language', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                  <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => handleSettingChange('theme', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator className="my-4" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Email</Label>
                <p className="text-sm text-muted-foreground">
                  Display email in public profile
                </p>
              </div>
              <Switch
                checked={settings.showEmail}
                onCheckedChange={(checked: any) =>
                  handleSettingChange('showEmail', checked)
                }
              />
            </div>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Phone</Label>
                <p className="text-sm text-muted-foreground">
                  Display phone in public profile
                </p>
              </div>
              <Switch
                checked={settings.showPhone}
                onCheckedChange={(checked: any) =>
                  handleSettingChange('showPhone', checked)
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Settings */}
      <Card>
        <CardContent className="pt-6">
          <Button onClick={handleSaveSettings} disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>

      {/* Security Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Change Password */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Lock className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your account password
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="oldPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? 'text' : 'password'}
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, oldPassword: e.target.value })
                  }
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.oldPassword && (
                <p className="text-sm text-destructive">
                  {passwordErrors.oldPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  placeholder="Enter new password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {passwordErrors.newPassword && (
                <p className="text-sm text-destructive">
                  {passwordErrors.newPassword}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Confirm new password"
              />
              {passwordErrors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Changing Password...' : 'Change Password'}
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-destructive" />
              <div>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-destructive/50 p-4">
              <h4 className="mb-2 font-semibold">Delete Account</h4>
              <p className="mb-4 text-sm text-muted-foreground">
                Once you delete your account, there is no going back. All your data,
                fields, and detection history will be permanently deleted.
              </p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your
                      account and remove all your data from our servers including:
                      <ul className="mt-2 list-inside list-disc">
                        <li>All your fields information</li>
                        <li>Detection history and results</li>
                        <li>Profile and farmer data</li>
                        <li>All associated records</li>
                      </ul>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Yes, Delete My Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="mb-2 font-semibold">Export Data</h4>
              <p className="mb-4 text-sm text-muted-foreground">
                Download a copy of all your data including fields, detections, and
                profile information.
              </p>
              <Button variant="outline" className="w-full">
                Export My Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}