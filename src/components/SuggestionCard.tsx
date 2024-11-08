import React from 'react';
import { Lightbulb } from 'lucide-react';

interface SuggestionCardProps {
  title: string;
  description: string;
}

export function SuggestionCard({ title, description }: SuggestionCardProps) {
  return (
    <div className="p-6 rounded-lg bg-white border border-gray-200 hover:border-[#00A3FF]/50 transition-colors shadow-sm hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-[#00A3FF]/10 text-[#00A3FF]">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
}