import React from 'react';
import { Loader2 } from 'lucide-react';

interface WireframeDisplayProps {
  title: string;
  loading: boolean;
  children: React.ReactNode;
}

export function WireframeDisplay({ title, loading, children }: WireframeDisplayProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#00A3FF] mx-auto mb-4" />
          <p className="text-gray-500">Generating wireframe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}