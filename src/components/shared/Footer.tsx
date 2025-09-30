import React from 'react';
import { Leaf } from 'lucide-react'
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">CropCare</span>
          </div>
          <p className="text-gray-400">
            © 2024 CropCare. Empowering farmers with AI technology.
          </p>
        </div>
      </footer>
    );
};

export default Footer;