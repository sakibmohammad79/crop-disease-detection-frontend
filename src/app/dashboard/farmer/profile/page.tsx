/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { toast } from 'sonner'
// import { useAppSelector } from '@/lib/store/hooks'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Wheat,
  TrendingUp,
} from 'lucide-react'

export default function ProfilePage() {

//   const { user } = useAppSelector((state: any) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock farmer data - Backend থেকে আসবে
  const [profileData, setProfileData] = useState({
    name: 'Abdul Karim',
    email: 'kalponic779@gmail.com',
    phone: '01712345678',
    address: 'Rajshahi, Bangladesh',
    bio: 'Experienced farmer specializing in rice and wheat cultivation',
    profileImage: '',
    farmerProfile: {
      farmSize: 7.5,
      farmingExperience: 12,
      farmLocation: 'Rajshahi District',
      soilType: 'loamy',
      irrigationType: 'drip',
      cropTypes: ['rice', 'wheat'],
    },
    stats: {
      totalFields: 5,
      totalDetections: 24,
      memberSince: '2023-01-15',
    },
  })

  const [editedData, setEditedData] = useState({ ...profileData })

  const handleEdit = () => {
    setIsEditing(true)
    setEditedData({ ...profileData })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedData({ ...profileData })
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: API call to update profile
      console.log('Updating profile:', editedData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setProfileData(editedData)
      setIsEditing(false)

      toast('Your profile has been updated successfully')
    } catch (error: any) {
      toast(error.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setEditedData({
      ...editedData,
      [field]: value,
    })
  }

  const handleFarmerProfileChange = (field: string, value: any) => {
    setEditedData({
      ...editedData,
      farmerProfile: {
        ...editedData.farmerProfile,
        [field]: value,
      },
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and farmer details
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={handleEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Profile Overview */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.profileImage} />
                    <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-bold">{profileData.name}</h2>
                <p className="text-sm text-muted-foreground">{profileData.email}</p>
                <Badge className="mt-2" variant="secondary">
                  Farmer
                </Badge>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Member since</span>
                  <span className="ml-auto font-medium">
                    {formatDate(profileData.stats.memberSince)}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <Wheat className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Total Fields</span>
                  <span className="ml-auto font-medium">
                    {profileData.stats.totalFields}
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="mr-3 h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Detections</span>
                  <span className="ml-auto font-medium">
                    {profileData.stats.totalDetections}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Farming Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Farm Size</span>
                <span className="font-medium">
                  {profileData.farmerProfile.farmSize} acres
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-medium">
                  {profileData.farmerProfile.farmingExperience} years
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Soil Type</span>
                <span className="font-medium capitalize">
                  {profileData.farmerProfile.soilType}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Irrigation</span>
                <span className="font-medium capitalize">
                  {profileData.farmerProfile.irrigationType}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Editable Information */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Your basic contact and personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="name"
                      value={isEditing ? editedData.name : profileData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={isEditing ? editedData.email : profileData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={isEditing ? editedData.phone : profileData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="address"
                      value={isEditing ? editedData.address : profileData.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={isEditing ? editedData.bio : profileData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Farmer Profile */}
          <Card>
            <CardHeader>
              <CardTitle>Farmer Profile</CardTitle>
              <CardDescription>
                Details about your farming activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size (acres)</Label>
                  <Input
                    id="farmSize"
                    type="number"
                    step="0.1"
                    value={
                      isEditing
                        ? editedData.farmerProfile.farmSize
                        : profileData.farmerProfile.farmSize
                    }
                    onChange={(e) =>
                      handleFarmerProfileChange('farmSize', parseFloat(e.target.value))
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmingExperience">Experience (years)</Label>
                  <Input
                    id="farmingExperience"
                    type="number"
                    value={
                      isEditing
                        ? editedData.farmerProfile.farmingExperience
                        : profileData.farmerProfile.farmingExperience
                    }
                    onChange={(e) =>
                      handleFarmerProfileChange(
                        'farmingExperience',
                        parseInt(e.target.value)
                      )
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmLocation">Farm Location</Label>
                <Input
                  id="farmLocation"
                  value={
                    isEditing
                      ? editedData.farmerProfile.farmLocation
                      : profileData.farmerProfile.farmLocation
                  }
                  onChange={(e) =>
                    handleFarmerProfileChange('farmLocation', e.target.value)
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Input
                    id="soilType"
                    value={
                      isEditing
                        ? editedData.farmerProfile.soilType
                        : profileData.farmerProfile.soilType
                    }
                    onChange={(e) =>
                      handleFarmerProfileChange('soilType', e.target.value)
                    }
                    disabled={!isEditing}
                    className="capitalize"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigationType">Irrigation Type</Label>
                  <Input
                    id="irrigationType"
                    value={
                      isEditing
                        ? editedData.farmerProfile.irrigationType
                        : profileData.farmerProfile.irrigationType
                    }
                    onChange={(e) =>
                      handleFarmerProfileChange('irrigationType', e.target.value)
                    }
                    disabled={!isEditing}
                    className="capitalize"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Crop Types</Label>
                <div className="flex flex-wrap gap-2">
                  {profileData.farmerProfile.cropTypes.map((crop) => (
                    <Badge key={crop} variant="secondary"className="capitalize">
                        {crop}
                    </Badge>
                    ))}
                </div>
             </div>
           </CardContent>
        </Card>
     </div>
    </div>
</div>
)
}