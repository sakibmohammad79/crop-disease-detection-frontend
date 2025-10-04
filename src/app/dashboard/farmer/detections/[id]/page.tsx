'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Wheat,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Share2,
  Printer,
} from 'lucide-react'
import Image from 'next/image'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert'

export default function DetectionDetailsPage() {
  const params = useParams()
//   const router = useRouter()
  const detectionId = params.id

  // Mock data - Backend থেকে আসবে
  const detection = {
    id: detectionId,
    fieldName: 'North Field',
    fieldId: '1',
    cropType: 'Tomato',
    disease: 'Late Blight',
    confidence: 92,
    severity: 'High',
    status: 'completed',
    imageUrl: '/placeholder-crop.jpg',
    notes: 'Noticed yellowing leaves with brown spots spreading rapidly',
    location: {
      latitude: 24.3745,
      longitude: 88.6042,
      address: 'Rajshahi District',
    },
    createdAt: '2024-01-15T10:30:00',
    processedAt: '2024-01-15T10:30:45',
    recommendations: [
      {
        title: 'Immediate Action',
        description: 'Remove and destroy infected plants to prevent spread',
        priority: 'high',
      },
      {
        title: 'Treatment',
        description: 'Apply copper-based fungicide (Bordeaux mixture) every 7-10 days',
        priority: 'high',
      },
      {
        title: 'Prevention',
        description: 'Improve air circulation by proper plant spacing',
        priority: 'medium',
      },
      {
        title: 'Monitoring',
        description: 'Inspect plants daily for new symptoms',
        priority: 'medium',
      },
    ],
    symptoms: [
      'Brown spots on leaves with yellow halos',
      'White fungal growth on leaf undersides',
      'Rapid spread during humid conditions',
      'Fruit rot in advanced stages',
    ],
    mlServiceResponse: {
      modelVersion: 'v2.1.0',
      processingTime: '850ms',
      alternativeDiseases: [
        { name: 'Early Blight', probability: 5 },
        { name: 'Septoria Leaf Spot', probability: 3 },
      ],
    },
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'destructive'
      case 'Moderate':
        return 'default'
      case 'Low':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share detection')
  }

  const handleDownload = () => {
    // TODO: Implement download report
    console.log('Download report')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/farmer/detections">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Detection Details</h1>
            <p className="text-muted-foreground">
              Analysis results for {detection.fieldName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Image & Basic Info */}
        <div className="space-y-6 lg:col-span-1">
          {/* Image */}
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-square overflow-hidden rounded-t-lg">
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <Image
                    src="/placeholder.svg"
                    alt="Crop detection"
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Captured on</span>
                  <span className="text-sm font-medium">
                    {formatDate(detection.createdAt)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Detection Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Field</span>
                <Button variant="link" size="sm" asChild className="h-auto p-0">
                  <Link href={`/dashboard/farmer/fields/${detection.fieldId}`}>
                    {detection.fieldName}
                  </Link>
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Crop Type</span>
                <Badge variant="outline">{detection.cropType}</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge variant="secondary" className="capitalize">
                  {detection.status}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-medium">{detection.confidence}%</span>
                </div>
                <Progress value={detection.confidence} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Severity</span>
                <Badge variant={getSeverityColor(detection.severity)}>
                  {detection.severity}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          {detection.location && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{detection.location.address}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {detection.location.latitude.toFixed(4)}, {detection.location.longitude.toFixed(4)}
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Results & Recommendations */}
        <div className="space-y-6 lg:col-span-2">
          {/* Disease Alert */}
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disease Detected: {detection.disease}</AlertTitle>
            <AlertDescription>
              This is a {detection.severity.toLowerCase()} severity disease that requires immediate attention.
              Follow the recommendations below to prevent further damage.
            </AlertDescription>
          </Alert>

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle>Observed Symptoms</CardTitle>
              <CardDescription>
                Key indicators identified in the analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {detection.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm">{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Treatment Recommendations</CardTitle>
              <CardDescription>
                Follow these steps to manage the disease effectively
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {detection.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-lg border p-4"
                >
                  <div className="flex-shrink-0">
                    {getPriorityIcon(recommendation.priority)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{recommendation.title}</h4>
                      <Badge
                        variant={
                          recommendation.priority === 'high'
                            ? 'destructive'
                            : 'secondary'
                        }
                        className="text-xs"
                      >
                        {recommendation.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {recommendation.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Farmer Notes */}
          {detection.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Your Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{detection.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Alternative Predictions */}
          {detection.mlServiceResponse.alternativeDiseases.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Alternative Predictions</CardTitle>
                <CardDescription>
                  Other possible diseases detected with lower confidence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {detection.mlServiceResponse.alternativeDiseases.map(
                    (alt, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{alt.name}</span>
                          <span className="text-muted-foreground">
                            {alt.probability}%
                          </span>
                        </div>
                        <Progress value={alt.probability} className="h-2" />
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model Version</span>
                <span className="font-mono">
                  {detection.mlServiceResponse.modelVersion}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processing Time</span>
                <span>{detection.mlServiceResponse.processingTime}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processed At</span>
                <span>{formatDate(detection.processedAt)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button variant="outline" asChild>
                <Link href={`/dashboard/farmer/fields/${detection.fieldId}`}>
                  <Wheat className="mr-2 h-4 w-4" />
                  View Field
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/farmer/detections/new">
                  <Calendar className="mr-2 h-4 w-4" />
                  New Detection
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}