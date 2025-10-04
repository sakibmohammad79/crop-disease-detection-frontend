'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Search,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'

export default function DetectionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCrop, setFilterCrop] = useState('all')

  // Mock data
  const detections = [
    {
      id: '1',
      fieldName: 'North Field',
      cropType: 'Tomato',
      disease: 'Late Blight',
      confidence: 92,
      severity: 'High',
      status: 'completed',
      imageUrl: '/placeholder-crop.jpg',
      createdAt: '2024-01-15T10:30:00',
      processedAt: '2024-01-15T10:30:45',
    },
    {
      id: '2',
      fieldName: 'South Field',
      cropType: 'Potato',
      disease: 'Healthy',
      confidence: 95,
      severity: 'None',
      status: 'completed',
      imageUrl: '/placeholder-crop.jpg',
      createdAt: '2024-01-14T14:20:00',
      processedAt: '2024-01-14T14:20:30',
    },
    {
      id: '3',
      fieldName: 'East Field',
      cropType: 'Wheat',
      disease: 'Leaf Rust',
      confidence: 88,
      severity: 'Moderate',
      status: 'completed',
      imageUrl: '/placeholder-crop.jpg',
      createdAt: '2024-01-13T09:15:00',
      processedAt: '2024-01-13T09:15:50',
    },
    {
      id: '4',
      fieldName: 'North Field',
      cropType: 'Tomato',
      disease: 'Processing...',
      confidence: 0,
      severity: 'Unknown',
      status: 'processing',
      imageUrl: '/placeholder-crop.jpg',
      createdAt: '2024-01-15T16:45:00',
      processedAt: null,
    },
  ]

  const filteredDetections = detections.filter((detection) => {
    const matchesSearch =
      detection.fieldName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detection.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      detection.disease.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || detection.status === filterStatus
    const matchesCrop =
      filterCrop === 'all' ||
      detection.cropType.toLowerCase() === filterCrop.toLowerCase()
    return matchesSearch && matchesStatus && matchesCrop
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'processing':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Detections</h1>
          <p className="text-muted-foreground">
            View and manage your crop disease detection history
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/farmer/detections/new">
            <Plus className="mr-2 h-4 w-4" />
            New Detection
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Detections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{detections.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {detections.filter((d) => d.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Processing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {detections.filter((d) => d.status === 'processing').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Diseases Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {
                detections.filter(
                  (d) => d.disease !== 'Healthy' && d.status === 'completed'
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by field, crop, or disease..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterCrop} onValueChange={setFilterCrop}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="tomato">Tomato</SelectItem>
                <SelectItem value="potato">Potato</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Detections Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detection History</CardTitle>
          <CardDescription>
            All your crop disease detection records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Field</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead>Disease</TableHead>
                <TableHead>Confidence</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDetections.map((detection) => (
                <TableRow key={detection.id}>
                  <TableCell>
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <Image
                          src="/placeholder.svg"
                          alt="Crop"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {detection.fieldName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{detection.cropType}</Badge>
                  </TableCell>
                  <TableCell>{detection.disease}</TableCell>
                  <TableCell>
                    {detection.confidence > 0 ? `${detection.confidence}%` : '-'}
                  </TableCell>
                  <TableCell>
                    {detection.severity !== 'Unknown' ? (
                      <Badge variant={getSeverityColor(detection.severity)}>
                        {detection.severity}
                      </Badge>
                    ) : (
                      '-'
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-3 w-3" />
                      {formatDate(detection.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(detection.status)}
                      <span className="capitalize">{detection.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/farmer/detections/${detection.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Empty State */}
          {filteredDetections.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold">No detections found</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {searchQuery || filterStatus !== 'all' || filterCrop !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Start by uploading your first crop image'}
              </p>
              <Button asChild>
                <Link href="/dashboard/farmer/detections/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Detection
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}