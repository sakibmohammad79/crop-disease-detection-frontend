import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { Leaf } from 'lucide-react'
const Header = () => {
    return (
       <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">CropCare</span>
          </div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </nav>
      </header>
    );
};

export default Header;