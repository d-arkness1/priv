import React from 'react';
import { Suggestion } from '../types/suggestions';
import { Lightbulb } from 'lucide-react';

interface SuggestionDropdownProps {
  isVisible: boolean;
  isLoading: boolean;
  suggestions: Suggestion[];
  onSuggestionSelect: (suggestion: Suggestion) => void;
}

export function SuggestionDropdown({ 
  isVisible, 
  isLoading, 
  suggestions,
  onSuggestionSelect 
}: SuggestionDropdownProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute left-0 right-0 top-full mt-1 transform-gpu transition-all duration-150 ease-out">
      <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="max-h-[240px] overflow-y-auto">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-gray-100 animate-pulse" />
                  <div className="flex-1">
                    <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              </div>
            ))
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onSuggestionSelect(suggestion)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-[#00A3FF]/10 text-[#00A3FF]">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">
                      {suggestion.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-sm text-gray-500">
              No suggestions found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}