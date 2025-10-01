import React from 'react';
import { Leaf } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link';

const RegisterPage
 = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join CropCare AI to protect your crops
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                // {...register('name')}
                // disabled={loading}
              />
              {/* {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="farmer@example.com"
                // {...register('email')}
                // disabled={loading}
              />
              {/* {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Input
                id="phone"
                placeholder="+880 1234567890"
                // {...register('phone')}
                // disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select
                // onValueChange={(value) => setValue('role', value as 'FARMER' | 'USER')}
                // disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FARMER">Farmer</SelectItem>
                  <SelectItem value="USER">Regular User</SelectItem>
                </SelectContent>
              </Select>
              {/* {errors.role && (
                <p className="text-sm text-destructive">{errors.role.message}</p>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                // {...register('password')}
                // disabled={loading}
              />
              {/* {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )} */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                // {...register('confirmPassword')}
                // disabled={loading}
              />
              {/* {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )} */}
            </div>

            <Button type="submit" className="w-full" >
              {/* {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )} */}
              Create Account
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
    );
};

export default RegisterPage
;