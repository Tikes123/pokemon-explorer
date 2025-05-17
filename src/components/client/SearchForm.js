'use client';

import { useEffect, useState } from 'react';
import { getPokemonTypes } from '@/lib/api/pokemon';
import { FiSearch } from 'react-icons/fi'; 

export default function SearchForm({ onSearch, onTypeSelect, searchTerm, selectedType }) {
  const [types, setTypes] = useState([]);
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    async function loadTypes() {
      try {
        const pokemonTypes = await getPokemonTypes();
        setTypes(pokemonTypes);
      } catch (error) {
        console.error('Failed to load Pokemon types:', error);
      }
    }
    loadTypes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 items-start py-6">
      <select
        value={selectedType}
        onChange={(e) => onTypeSelect(e.target.value)}
        className="w-full md:w-96 px-4 py-3 rounded-md border border-gray-300 bg-white shadow-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit} className="flex w-full md:w-[600px] md:flex-1">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#003049] text-white font-semibold rounded-r-md hover:bg-[#00253b] transition"
        >
          Search
        </button>
      </form>
    </div>
  );
}
