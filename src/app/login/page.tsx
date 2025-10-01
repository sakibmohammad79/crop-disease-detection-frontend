import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Leaf } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Leaf className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            <div className="space-y-2">
              <Label >Email</Label>
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
              <div className="flex items-center justify-between">
                <Label >Password</Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
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

            {/* <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button> */}
            <Button type="submit" className="w-full" >
                Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Sign up
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

export default LoginPage;