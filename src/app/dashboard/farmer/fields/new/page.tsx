/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

const NewFieldPage = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    cropType: '',
    area: '',
    plantingDate: '',
    expectedHarvest: '',
    location: '',
    soilType: '',
    irrigationType: '',
    notes: '',
  })

  const [errors, setErrors] = useState<any>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.name) newErrors.name = 'Field name is required'
    if (!formData.cropType) newErrors.cropType = 'Crop type is required'
    if (!formData.area || parseFloat(formData.area) <= 0) {
      newErrors.area = 'Valid area is required'
    }
    if (!formData.plantingDate) newErrors.plantingDate = 'Planting date is required'
    if (!formData.location) newErrors.location = 'Location is required'
    if (!formData.soilType) newErrors.soilType = 'Soil type is required'
    if (!formData.irrigationType) newErrors.irrigationType = 'Irrigation type is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)

    try {
      // TODO: API call to create field
      const fieldData = {
        ...formData,
        area: parseFloat(formData.area),
      }

      console.log('Creating field:', fieldData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success("Your field has been added successfully")

      router.push('/dashboard/farmer/fields')
    } catch (error: any) {
      toast.error(error.message || 'Failed to create field')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/farmer/fields">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Field</h1>
          <p className="text-muted-foreground">
            Register a new field for crop management
          </p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Field Information</CardTitle>
          <CardDescription>
            Enter details about your agricultural field
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Field Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., North Field"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropType">Crop Type *</Label>
                  <Select
                    value={formData.cropType}
                    onValueChange={(value) => handleSelectChange('cropType', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tomato">Tomato</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="corn">Corn</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.cropType && (
                    <p className="text-sm text-destructive">{errors.cropType}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="area">Area (acres) *</Label>
                  <Input
                    id="area"
                    name="area"
                    type="number"
                    step="0.1"
                    placeholder="5.5"
                    value={formData.area}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.area && (
                    <p className="text-sm text-destructive">{errors.area}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Rajshahi District"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.location && (
                    <p className="text-sm text-destructive">{errors.location}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Cultivation Dates</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="plantingDate">Planting Date *</Label>
                  <Input
                    id="plantingDate"
                    name="plantingDate"
                    type="date"
                    value={formData.plantingDate}
                    onChange={handleChange}
                    disabled={loading}
                  />
                  {errors.plantingDate && (
                    <p className="text-sm text-destructive">{errors.plantingDate}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedHarvest">Expected Harvest Date</Label>
                  <Input
                    id="expectedHarvest"
                    name="expectedHarvest"
                    type="date"
                    value={formData.expectedHarvest}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Farm Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Farm Details</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type *</Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => handleSelectChange('soilType', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loamy">Loamy</SelectItem>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="peaty">Peaty</SelectItem>
                      <SelectItem value="chalky">Chalky</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.soilType && (
                    <p className="text-sm text-destructive">{errors.soilType}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="irrigationType">Irrigation Type *</Label>
                  <Select
                    value={formData.irrigationType}
                    onValueChange={(value) => handleSelectChange('irrigationType', value)}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select irrigation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drip">Drip Irrigation</SelectItem>
                      <SelectItem value="sprinkler">Sprinkler</SelectItem>
                      <SelectItem value="surface">Surface Irrigation</SelectItem>
                      <SelectItem value="manual">Manual Irrigation</SelectItem>
                      <SelectItem value="rainfed">Rainfed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.irrigationType && (
                    <p className="text-sm text-destructive">{errors.irrigationType}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Any additional information about this field..."
                  value={formData.notes}
                  onChange={handleChange}
                  disabled={loading}
                  rows={4}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/dashboard/farmer/fields')}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Field'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewFieldPage;