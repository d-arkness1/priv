import React from 'react';
import { Menu, Share2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="h-16 border-b border-gray-200 bg-white shadow-sm">
      <div className="h-full max-w-[1400px] mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-xl font-semibold text-gray-800">Privasim</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </button>
      </div>
    </nav>
  );
}