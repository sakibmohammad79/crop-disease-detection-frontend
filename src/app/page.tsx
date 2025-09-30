import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Leaf, Users, Shield, Zap } from 'lucide-react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          AI-Powered <span className="text-primary">Crop Disease</span> Detection
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your crop images and get instant disease diagnosis with treatment recommendations. 
          Protect your harvest with cutting-edge AI technology.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/auth/register">Start Free Trial</Link>
          </Button>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose CropCare?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Instant Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get disease diagnosis in seconds with our advanced AI models trained on millions of crop images.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Expert Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Receive personalized treatment plans and preventive measures from agricultural experts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your farm data is encrypted and secure. We prioritize your privacy and data protection.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}