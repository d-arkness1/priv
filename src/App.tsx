import React, { useState, useCallback } from 'react';
import { PromptForm } from './components/PromptForm';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { WireframeDisplay } from './components/WireframeDisplay';
import { SignupForm } from './components/wireframes/SignupForm';
import { analyzeSuggestions } from './services/suggestionService';
import { Suggestion } from './types/suggestions';
import { useDebounce } from './hooks/useDebounce';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [isGeneratingWireframe, setIsGeneratingWireframe] = useState(false);
  const debouncedPrompt = useDebounce(prompt, 500);

  const generateSuggestions = useCallback(async (input: string) => {
    if (!input.trim()) return [];
    
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
    return analyzeSuggestions(input);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debouncedPrompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const newSuggestions = await generateSuggestions(debouncedPrompt);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Failed to generate suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSelect = async (suggestion: Suggestion) => {
    setSelectedSuggestion(suggestion);
    setIsGeneratingWireframe(true);
    // Simulate wireframe generation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsGeneratingWireframe(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Sidebar />
      
      <main className="max-w-3xl mx-auto px-4 py-12">
        <PromptForm
          prompt={prompt}
          isLoading={isLoading}
          suggestions={suggestions}
          onPromptChange={setPrompt}
          onSubmit={handleSubmit}
          onSuggestionSelect={handleSuggestionSelect}
        />

        {(selectedSuggestion || isGeneratingWireframe) && (
          <div className="mt-8">
            <WireframeDisplay
              title={selectedSuggestion?.title || ''}
              loading={isGeneratingWireframe}
            >
              <SignupForm />
            </WireframeDisplay>
          </div>
        )}
      </main>
    </div>
  );
}