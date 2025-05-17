'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function usePokemonSearch(pokemons, initialParams = {}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState(initialParams.search || '');
  const [selectedType, setSelectedType] = useState(initialParams.type || '');

  const updateURL = (search, type) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (type) params.set('type', type);
    router.push(`/?${params.toString()}`);
  };

  const filteredPokemons = useMemo(() => {
    if (!pokemons) return [];
    
    return pokemons.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = !selectedType || pokemon.types.some(type => 
        type.toLowerCase() === selectedType.toLowerCase()
      );
      return matchesSearch && matchesType;
    });
  }, [pokemons, searchTerm, selectedType]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    updateURL(term, selectedType);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    updateURL(searchTerm, type);
  };

  return {
    searchTerm,
    selectedType,
    filteredPokemons,
    handleSearch,
    handleTypeSelect
  };
}
