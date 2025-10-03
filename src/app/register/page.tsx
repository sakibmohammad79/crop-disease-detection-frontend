/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Leaf, Loader2, X } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cropOptions, irrigationTypeOptions, soilTypeOptions } from '@/types'
import { registerFarmer } from '@/services/actions/registerFarmer'

import { loginFarmer } from '@/services/actions/loginFarmer'

const RegisterPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    photo: '',
    // Farmer Profile
    cropTypes: [] as string[],
    farmSize: '',
    farmingExperience: '',
    farmLocation: '',
    soilType: '',
    irrigationType: '',
  })

  const [errors, setErrors] = useState<any>({})

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error for this field
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  // Handle select change
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  // Handle multi-select for crops
  const handleCropSelect = (value: string) => {
    if (!formData.cropTypes.includes(value)) {
      setFormData({
        ...formData,
        cropTypes: [...formData.cropTypes, value],
      })
      if (errors.cropTypes) {
        setErrors({ ...errors, cropTypes: '' })
      }
    }
  }

  const removeCrop = (index: number) => {
    setFormData({
      ...formData,
      cropTypes: formData.cropTypes.filter((_, i) => i !== index),
    })
  }

  // Get label for display
  const getCropLabel = (value: string) => {
    return cropOptions.find(opt => opt.value === value)?.label || value
  }

  // Basic validation
  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name || formData.name.length < 1) {
      newErrors.name = 'Name is required'
    }
    if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters'
    }

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password.length > 50) {
      newErrors.password = 'Password must be less than 50 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match"
    }

    if (formData.phone && !/^(\+8801|8801|01)[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid Bangladesh phone number'
    }

    if (formData.photo && formData.photo.trim() !== '') {
      try {
        new URL(formData.photo)
      } catch {
        newErrors.photo = 'Invalid photo URL'
      }
    }

    if (formData.cropTypes.length === 0) {
      newErrors.cropTypes = 'At least one crop type is required'
    }

    if (formData.farmSize && parseFloat(formData.farmSize) <= 0) {
      newErrors.farmSize = 'Farm size must be positive'
    }

    if (formData.farmingExperience) {
      const exp = parseInt(formData.farmingExperience)
      if (exp < 0) {
        newErrors.farmingExperience = 'Experience cannot be negative'
      }
      if (exp > 100) {
        newErrors.farmingExperience = 'Experience seems unrealistic'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error('Please fill all required fields correctly')
      return
    }

    setLoading(true)

    // Prepare data for backend matching schema
    const registerData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      phone: formData.phone || undefined,
      address: formData.address || undefined,
      photo: formData.photo || undefined,
      farmerProfile: {
        cropTypes: formData.cropTypes,
        farmSize: formData.farmSize ? parseFloat(formData.farmSize) : undefined,
        farmingExperience: formData.farmingExperience ? parseInt(formData.farmingExperience) : undefined,
        farmLocation: formData.farmLocation || undefined,
        soilType: formData.soilType || undefined,
        irrigationType: formData.irrigationType || undefined,
      },
    }

    try {
    const res = await registerFarmer(registerData);
    if (!res.success) {
      if(res.message == "Duplicate entry found"){
        toast.error("This email already registered. Please try another!");
      }
      else{
        toast.error(res.message || "Registration failed.");
      }
      return;
    }
    const result = await loginFarmer({
      email: registerData.email,
      password: registerData.password,
    });

    if(result?.data?.accessToken) {
      toast.success(res.message || "Registration successful!");
      router.push("/");
    }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error occurred");
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Farmer Registration</CardTitle>
          <CardDescription>
            Join CropCare AI to protect your crops with AI technology
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Abdul Karim"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="farmer@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="01712345678"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Rajshahi, Bangladesh"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive">{errors.address}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo URL (Optional)</Label>
                <Input
                  id="photo"
                  name="photo"
                  placeholder="https://example.com/photo.jpg"
                  value={formData.photo}
                  onChange={handleChange}
                  disabled={loading}
                />
                {errors.photo && (
                  <p className="text-sm text-destructive">{errors.photo}</p>
                )}
              </div>
            </div>

            {/* Farmer Profile */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-semibold">Farm Information</h3>

              {/* Crop Types - Multi Select */}
              <div className="space-y-2">
                <Label htmlFor="cropTypes">Crop Types *</Label>
                <Select
                  value=""
                  onValueChange={handleCropSelect}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop types" />
                  </SelectTrigger>
                  <SelectContent>
                    {cropOptions.map((option) => (
                      <SelectItem 
                        key={option.value} 
                        value={option.value}
                        disabled={formData.cropTypes.includes(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {formData.cropTypes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.cropTypes.map((crop, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{getCropLabel(crop)}</span>
                        <button
                          type="button"
                          onClick={() => removeCrop(index)}
                          className="ml-1 hover:bg-green-200 rounded-full p-0.5"
                          disabled={loading}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {errors.cropTypes && (
                  <p className="text-sm text-destructive">{errors.cropTypes}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmSize">Farm Size (acres) (Optional)</Label>
                  <Input
                    id="farmSize"
                    name="farmSize"
                    type="number"
                    step="0.1"
                    placeholder="7.5"
                    value={formData.farmSize}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.farmSize && (
                    <p className="text-sm text-destructive">{errors.farmSize}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmingExperience">Farming Experience (years) (Optional)</Label>
                  <Input
                    id="farmingExperience"
                    name="farmingExperience"
                    type="number"
                    placeholder="12"
                    value={formData.farmingExperience}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.farmingExperience && (
                    <p className="text-sm text-destructive">{errors.farmingExperience}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmLocation">Farm Location (Optional)</Label>
                <Input
                  id="farmLocation"
                  name="farmLocation"
                  placeholder="Rajshahi District"
                  value={formData.farmLocation}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Soil Type - Single Select */}
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type (Optional)</Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => handleSelectChange('soilType', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.soilType && (
                    <p className="text-sm text-destructive">{errors.soilType}</p>
                  )}
                </div>

                {/* Irrigation Type - Single Select */}
                <div className="space-y-2">
                  <Label htmlFor="irrigationType">Irrigation Type (Optional)</Label>
                  <Select
                    value={formData.irrigationType}
                    onValueChange={(value) => handleSelectChange('irrigationType', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {irrigationTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.irrigationType && (
                    <p className="text-sm text-destructive">{errors.irrigationType}</p>
                  )}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating your farmer account...
                </>
              ) : (
                'Create Farmer Account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </div>
          <div className="text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              ← Back to Home
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RegisterPage