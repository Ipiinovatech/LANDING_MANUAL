"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface ProductFiltersProps {
  currentFilter: 'all' | 'varios' | 'todos';
  onFilterChange: (filter: 'all' | 'varios' | 'todos') => void;
}

export function ProductFilters({ currentFilter, onFilterChange }: ProductFiltersProps) {
  const { language } = useLanguage();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <button
        onClick={() => onFilterChange('todos')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${currentFilter === 'todos'
            ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg'
            : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200'
          }`}
      >
        {language === "es" ? "Todos los Productos" : "All Products"}
      </button>
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${currentFilter === 'all'
            ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg'
            : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200'
          }`}
      >
        AI Connect
      </button>
      <button
        onClick={() => onFilterChange('varios')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
          ${currentFilter === 'varios'
            ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--accent-blue)] text-white shadow-lg'
            : 'bg-white/80 text-gray-700 hover:bg-white/90 border border-gray-200'
          }`}
      >
        {language === "es" ? "Varios" : "Others"}
      </button>
    </div>
  );
}