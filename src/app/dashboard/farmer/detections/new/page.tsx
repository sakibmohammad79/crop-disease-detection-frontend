/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import { ArrowLeft, Upload, Camera, X, Loader2, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function NewDetectionPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fieldId: '',
    cropType: '',
    notes: '',
  })

  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [errors, setErrors] = useState<any>({})

  // Mock fields data
  const fields = [
    { id: '1', name: 'North Field', cropType: 'Tomato' },
    { id: '2', name: 'South Field', cropType: 'Potato' },
    { id: '3', name: 'East Field', cropType: 'Wheat' },
  ]

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Please select an image under 5MB')
        return
      }

      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file')
        return
      }

      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setSelectedImage(null)
    setImagePreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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

    if (!selectedImage) newErrors.image = 'Please select an image'
    if (!formData.fieldId) newErrors.fieldId = 'Please select a field'
    if (!formData.cropType) newErrors.cropType = 'Please select a crop type'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast('Please fill all required fields')
      return
    }

    setLoading(true)

    try {
      // Prepare FormData for API
      const formDataToSend = new FormData()
      if (selectedImage) {
        formDataToSend.append('image', selectedImage)
      }
      formDataToSend.append('fieldId', formData.fieldId)
      formDataToSend.append('cropType', formData.cropType)
      if (formData.notes) {
        formDataToSend.append('notes', formData.notes)
      }

      console.log('Submitting detection:', {
        fieldId: formData.fieldId,
        cropType: formData.cropType,
        notes: formData.notes,
        image: selectedImage?.name,
      })

      // TODO: API call to submit detection
      // const response = await fetch('/api/v1/farmers/detections', {
      //   method: 'POST',
      //   body: formDataToSend,
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast('Your image is being processed...')

      // Redirect to detections list or result page
      router.push('/dashboard/farmer/detections')
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit detection')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/farmer">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Detection</h1>
          <p className="text-muted-foreground">
            Upload crop image for disease detection
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>
              Take or upload a clear photo of your crop
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!imagePreview ? (
              <div
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 transition-colors hover:border-muted-foreground/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground" />
                <p className="mb-2 text-sm font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WEBP (max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={imagePreview}
                    alt="Selected crop"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {errors.image && (
              <p className="text-sm text-destructive">{errors.image}</p>
            )}

            {/* Camera Button for Mobile */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.capture = 'environment'
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                      const event = {
                        target: { files: [file] },
                      } as any
                      handleImageSelect(event)
                    }
                  }
                  input.click()
                }}
              >
                <Camera className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detection Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detection Details</CardTitle>
            <CardDescription>
              Provide information about the crop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fieldId">Select Field *</Label>
                <Select
                  value={formData.fieldId}
                  onValueChange={(value) => handleSelectChange('fieldId', value)}
                  disabled={loading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a field" />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map((field) => (
                      <SelectItem key={field.id} value={field.id}>
                        {field.name} - {field.cropType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.fieldId && (
                  <p className="text-sm text-destructive">{errors.fieldId}</p>
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

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any observations or symptoms you've noticed..."
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  disabled={loading}
                  rows={4}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/dashboard/farmer')}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Detection
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card>
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Take photos in good lighting conditions (natural daylight is best)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Focus on the affected area or symptomatic leaves</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Ensure the image is clear and not blurry</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Include multiple leaves or parts if the disease is widespread</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Avoid shadows and reflections in the photo</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}