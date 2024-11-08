import { Suggestion } from '../types/suggestions';

interface SuggestionTemplate {
  category: string;
  context: string[];
  variations: {
    titles: string[];
    descriptions: string[];
  };
}

const suggestionTemplates: SuggestionTemplate[] = [
  {
    category: 'input',
    context: ['form', 'input', 'enter', 'type', 'submit', 'signup', 'login', 'register', 'field'],
    variations: {
      titles: [
        'Advanced Form Builder',
        'Multi-step Form Wizard',
        'Dynamic Form Generator',
        'Smart Input System',
        'Validation Framework'
      ],
      descriptions: [
        'Intelligent form system with real-time validation and error handling',
        'Progressive form wizard with state management and validation',
        'Dynamic form builder with custom field types and layouts',
        'Smart input system with auto-completion and formatting',
        'Comprehensive validation framework with custom rule support'
      ]
    }
  },
  {
    category: 'display',
    context: ['show', 'display', 'view', 'dashboard', 'list', 'grid', 'table', 'chart', 'data'],
    variations: {
      titles: [
        'Interactive Dashboard',
        'Data Grid System',
        'Visual Analytics Board',
        'Content Display Framework',
        'Metrics Visualization'
      ],
      descriptions: [
        'Real-time dashboard with interactive widgets and data visualization',
        'Advanced data grid with sorting, filtering, and custom views',
        'Analytics dashboard with dynamic charts and metrics',
        'Content management system with flexible layouts',
        'Metric tracking system with customizable displays'
      ]
    }
  },
  {
    category: 'navigation',
    context: ['menu', 'nav', 'navigate', 'route', 'link', 'flow', 'path', 'browse'],
    variations: {
      titles: [
        'Smart Navigation System',
        'Dynamic Route Manager',
        'Navigation Framework',
        'Breadcrumb Navigator',
        'Menu Organization Suite'
      ],
      descriptions: [
        'Intelligent navigation with user path tracking and suggestions',
        'Dynamic routing system with nested route support',
        'Navigation framework with state persistence',
        'Advanced breadcrumb system with route history',
        'Menu management with responsive layouts'
      ]
    }
  },
  {
    category: 'layout',
    context: ['layout', 'structure', 'organize', 'arrange', 'grid', 'container', 'section'],
    variations: {
      titles: [
        'Responsive Layout Engine',
        'Dynamic Grid System',
        'Flex Layout Manager',
        'Content Structure Builder',
        'Adaptive Container System'
      ],
      descriptions: [
        'Smart layout engine with responsive breakpoints',
        'Dynamic grid system with auto-arrangement',
        'Flexible layout manager with drag-and-drop support',
        'Content structure builder with nested components',
        'Adaptive container system with dynamic sizing'
      ]
    }
  },
  {
    category: 'interaction',
    context: ['click', 'button', 'action', 'interact', 'modal', 'popup', 'event', 'response'],
    variations: {
      titles: [
        'Interactive Component Suite',
        'Action Management System',
        'Event Handler Framework',
        'Modal Dialog System',
        'User Interaction Engine'
      ],
      descriptions: [
        'Complete suite of interactive components with animations',
        'Action management system with undo/redo support',
        'Event handling framework with custom triggers',
        'Advanced modal system with nested dialogs',
        'User interaction engine with gesture support'
      ]
    }
  }
];

interface ScoredTemplate extends SuggestionTemplate {
  score: number;
}

function calculateRelevanceScore(prompt: string, template: SuggestionTemplate): number {
  const words = prompt.toLowerCase().split(/\s+/);
  let score = 0;
  
  // Calculate context match score
  const contextMatches = template.context.filter(keyword => 
    words.some(word => word.includes(keyword) || keyword.includes(word))
  );
  
  score += (contextMatches.length / template.context.length) * 0.6; // Context weight: 60%
  
  // Calculate word proximity score
  const proximityScore = template.context.reduce((acc, keyword) => {
    const keywordIndex = prompt.toLowerCase().indexOf(keyword);
    if (keywordIndex !== -1) {
      // Higher score for keywords appearing earlier in the prompt
      acc += (1 - keywordIndex / prompt.length) * 0.4; // Proximity weight: 40%
    }
    return acc;
  }, 0);
  
  score += proximityScore;
  
  return score;
}

function getUniqueIdentifier(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function analyzeSuggestions(prompt: string): Suggestion[] {
  // Score all templates based on the prompt
  const scoredTemplates: ScoredTemplate[] = suggestionTemplates.map(template => ({
    ...template,
    score: calculateRelevanceScore(prompt, template)
  }));

  // Sort by score and take top 5
  const topTemplates = scoredTemplates
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // Generate suggestions from top templates
  return topTemplates.map((template, index) => {
    const variationIndex = Math.floor(Math.random() * template.variations.titles.length);
    
    return {
      id: `${template.category}-${getUniqueIdentifier()}`,
      title: template.variations.titles[variationIndex],
      description: template.variations.descriptions[variationIndex]
    };
  });
}