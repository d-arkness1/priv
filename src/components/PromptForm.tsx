import React, { useCallback, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { SuggestionDropdown } from './SuggestionDropdown';
import { Suggestion } from '../types/suggestions';

interface PromptFormProps {
  prompt: string;
  isLoading: boolean;
  suggestions: Suggestion[];
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSuggestionSelect: (suggestion: Suggestion) => void;
}

export function PromptForm({ 
  prompt, 
  isLoading, 
  suggestions,
  onPromptChange, 
  onSubmit,
  onSuggestionSelect
}: PromptFormProps) {
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (form) {
          form.requestSubmit();
        }
      } else if (e.key === 'Escape') {
        setIsDropdownVisible(false);
      }
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownVisible(true);
    onSubmit(e);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onSuggestionSelect(suggestion);
    setIsDropdownVisible(false);
    onPromptChange(suggestion.title);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <form ref={formRef} onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a prompt to visualize data flow..."
            className="w-full pl-12 pr-32 h-12 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 
              placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3FF] focus:border-transparent
              disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-lg bg-[#00A3FF] text-white font-medium 
            hover:bg-[#0093e9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span className="sr-only">Loading...</span>
            </span>
          ) : (
            'Visualize'
          )}
        </button>

        <SuggestionDropdown
          isVisible={isDropdownVisible && (isLoading || suggestions.length > 0)}
          isLoading={isLoading}
          suggestions={suggestions}
          onSuggestionSelect={handleSuggestionClick}
        />
      </form>
      <div className="absolute -bottom-6 left-0 right-0 text-center">
        <span className="text-sm text-gray-400">Press Esc to cancel</span>
      </div>
    </div>
  );
}