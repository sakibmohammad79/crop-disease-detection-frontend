'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Plus,
  Search,
  MapPin,
  Calendar,
  Wheat,
  Edit,
  Trash2,
  Eye,
} from 'lucide-react'
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

const FieldsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCrop, setFilterCrop] = useState('all')

  // Mock data - Backend থেকে আসবে
  const fields = [
    {
      id: '1',
      name: 'North Field',
      cropType: 'Tomato',
      area: 5.5,
      plantingDate: '2023-12-01',
      expectedHarvest: '2024-03-15',
      location: 'Rajshahi District',
      health: 85,
      status: 'active',
      soilType: 'loamy',
      irrigationType: 'drip',
      totalDetections: 12,
    },
    {
      id: '2',
      name: 'South Field',
      cropType: 'Potato',
      area: 3.2,
      plantingDate: '2023-11-15',
      expectedHarvest: '2024-02-28',
      location: 'Rajshahi District',
      health: 92,
      status: 'active',
      soilType: 'clay',
      irrigationType: 'sprinkler',
      totalDetections: 8,
    },
    {
      id: '3',
      name: 'East Field',
      cropType: 'Wheat',
      area: 7.8,
      plantingDate: '2023-10-20',
      expectedHarvest: '2024-04-10',
      location: 'Rajshahi District',
      health: 76,
      status: 'active',
      soilType: 'loamy',
      irrigationType: 'surface',
      totalDetections: 15,
    },
    {
      id: '4',
      name: 'West Field',
      cropType: 'Rice',
      area: 4.0,
      plantingDate: '2023-09-05',
      expectedHarvest: '2024-01-20',
      location: 'Rajshahi District',
      health: 95,
      status: 'harvested',
      soilType: 'silt',
      irrigationType: 'manual',
      totalDetections: 20,
    },
  ]

  const filteredFields = fields.filter((field) => {
    const matchesSearch = field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         field.cropType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCrop = filterCrop === 'all' || field.cropType.toLowerCase() === filterCrop.toLowerCase()
    return matchesSearch && matchesCrop
  })

  const handleDelete = (fieldId: string) => {
    // TODO: API call to delete field
    console.log('Delete field:', fieldId)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Fields</h1>
          <p className="text-muted-foreground">
            Manage your agricultural fields and crops
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/farmer/fields/new">
            <Plus className="mr-2 h-4 w-4" />
            Add New Field
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by field name or crop type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
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

      {/* Fields Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredFields.map((field) => (
          <Card key={field.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{field.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{field.cropType}</Badge>
                    <Badge
                      variant={field.status === 'active' ? 'default' : 'secondary'}
                    >
                      {field.status}
                    </Badge>
                  </div>
                </div>
                <Wheat className="h-8 w-8 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Field Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Area</span>
                  <span className="font-medium">{field.area} acres</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Soil Type</span>
                  <span className="font-medium capitalize">{field.soilType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Irrigation</span>
                  <span className="font-medium capitalize">{field.irrigationType}</span>
                </div>
              </div>

              {/* Health Status */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Health Status</span>
                  <span className="font-medium">{field.health}%</span>
                </div>
                <Progress value={field.health} />
              </div>

              {/* Dates */}
              <div className="space-y-2 border-t pt-3 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-3 w-3" />
                  Planted: {field.plantingDate}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-3 w-3" />
                  Harvest: {field.expectedHarvest}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="mr-2 h-3 w-3" />
                  {field.location}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between border-t pt-3 text-sm">
                <span className="text-muted-foreground">Total Detections</span>
                <Badge variant="secondary">{field.totalDetections}</Badge>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link href={`/dashboard/farmer/fields/${field.id}`}>
                    <Eye className="mr-2 h-3 w-3" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/farmer/fields/${field.id}/edit`}>
                    <Edit className="h-3 w-3" />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Field</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{field.name}&quot;? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(field.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredFields.length === 0 && (
        <Card className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <Wheat className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No fields found</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              {searchQuery || filterCrop !== 'all'
                ? 'Try adjusting your filters'
                : 'Get started by adding your first field'}
            </p>
            <Button asChild>
              <Link href="/dashboard/farmer/fields/new">
                <Plus className="mr-2 h-4 w-4" />
                Add New Field
              </Link>
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}

export default FieldsPage;