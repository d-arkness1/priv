import React from 'react';
import { Mail, Lock, User } from 'lucide-react';

export function SignupForm() {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent"
            placeholder="John Doe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="email"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="password"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button className="w-full bg-[#00A3FF] text-white py-2 rounded-lg hover:bg-[#0093e9] transition-colors">
        Create Account
      </button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <a href="#" className="text-[#00A3FF] hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}