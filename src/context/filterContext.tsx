// context/FilterContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { FilterContextProps, FilterState } from '../types/filter';

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<FilterState>({
    type: '',
    category: '',
    start: '',
    end: '',
  });

  useEffect(() => {
    // get data from url and store in context
    const nextFilters: FilterState = {
      type: searchParams.get('type') || '',
      category: searchParams.get('category') || '',
      start: searchParams.get('start') || '',
      end: searchParams.get('end') || '',
    };
    setFilters(nextFilters);
  }, [searchParams]);

  const setFilterParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    ['type', 'category', 'start', 'end'].forEach((key) => params.delete(key));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <FilterContext.Provider value={{ ...filters, setFilterParam, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilterContext must be used within a FilterProvider');
  return context;
};
