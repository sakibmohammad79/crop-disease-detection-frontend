'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Wheat, 
  Search, 
  TrendingUp, 
  AlertTriangle,
  Plus,
  ArrowUpRight,
  Calendar,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

const FarmerDashboardPage = () => {
  // Mock data - Backend থেকে আসবে
  const stats = {
    totalFields: 5,
    activeFields: 3,
    totalDetections: 24,
    recentDetections: 7,
    healthyPercentage: 78,
    diseaseAlerts: 2,
  }

  const recentDetections = [
    {
      id: '1',
      fieldName: 'North Field',
      cropType: 'Tomato',
      disease: 'Late Blight',
      confidence: 92,
      severity: 'High',
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: '2',
      fieldName: 'South Field',
      cropType: 'Potato',
      disease: 'Healthy',
      confidence: 95,
      severity: 'None',
      date: '2024-01-14',
      status: 'completed',
    },
    {
      id: '3',
      fieldName: 'East Field',
      cropType: 'Wheat',
      disease: 'Leaf Rust',
      confidence: 88,
      severity: 'Moderate',
      date: '2024-01-13',
      status: 'completed',
    },
  ]

  const activeFields = [
    {
      id: '1',
      name: 'North Field',
      cropType: 'Tomato',
      area: 5.5,
      plantingDate: '2023-12-01',
      health: 85,
    },
    {
      id: '2',
      name: 'South Field',
      cropType: 'Potato',
      area: 3.2,
      plantingDate: '2023-11-15',
      health: 92,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s your farm overview
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/farmer/detections/new">
            <Plus className="mr-2 h-4 w-4" />
            New Detection
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fields</CardTitle>
            <Wheat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalFields}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeFields} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detections</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDetections}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.recentDetections} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.healthyPercentage}%</div>
            <Progress value={stats.healthyPercentage} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {stats.diseaseAlerts}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Detections */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Detections</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/farmer/detections">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Your latest crop disease scans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDetections.map((detection) => (
                <div
                  key={detection.id}
                  className="flex items-start justify-between space-x-4 rounded-lg border p-3"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium">{detection.fieldName}</p>
                      <Badge variant="outline" className="text-xs">
                        {detection.cropType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {detection.disease}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{detection.confidence}% confident</span>
                      <span>•</span>
                      <span>{detection.date}</span>
                    </div>
                  </div>
                  <Badge
                    variant={
                      detection.severity === 'High'
                        ? 'destructive'
                        : detection.severity === 'Moderate'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {detection.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Fields */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Fields</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/farmer/fields">
                  View All
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <CardDescription>Fields currently under cultivation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeFields.map((field) => (
                <div
                  key={field.id}
                  className="space-y-3 rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{field.name}</p>
                      <div className="mt-1 flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{field.area} acres</span>
                        <span>•</span>
                        <span>{field.cropType}</span>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {field.health}% healthy
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Health Status</span>
                      <span className="font-medium">{field.health}%</span>
                    </div>
                    <Progress value={field.health} />
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    Planted: {field.plantingDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default FarmerDashboardPage