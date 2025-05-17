'use client';

import { useEffect, useState } from 'react';
import { usePokemonSearch } from '@/hooks/usePokemonSearch';
import { getAllPokemonWithDetails } from '@/lib/api/pokemon';
import SearchForm from './SearchForm';
import PokemonCard from '../server/PokemonCard';

export default function FilterablePokemons({ searchParams }) {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllPokemonWithDetails();
        setPokemons(data);
      } catch (error) {
        console.error('Failed to load Pokemon data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const {
    searchTerm,
    selectedType,
    filteredPokemons,
    handleSearch,
    handleTypeSelect,
  } = usePokemonSearch(pokemons, searchParams);

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 mt-8">
        Loading Pokemon...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <SearchForm
        searchTerm={searchTerm}
        selectedType={selectedType}
        onSearch={handleSearch}
        onTypeSelect={handleTypeSelect}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredPokemons.map((pokemon) => (
          <article key={pokemon.id} className="bg-white shadow-sm overflow-hidden rounded-lg">
            <div className="relative w-full aspect-square mb-4 h-[140px]">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="absolute inset-0 w-full h-full object-contain px-[80px]"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="bg-[#f5f5f5] p-4 shadow-md flex flex-col justify-between h-[190px]">
              <h2 className="text-xl font-semibold capitalize text-[#003049] mt-3">
                {pokemon.name}
              </h2>
              <a 
                href={`/pokemon/${pokemon.name}`}
                className="text-blue-500 hover:text-blue-700 mb-3"
              >
                Details →
              </a>
            </div>
          </article>
        ))}
      </div>

      {filteredPokemons.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No Pokemon found matching your criteria
        </div>
      )}
    </div>
  );
}
