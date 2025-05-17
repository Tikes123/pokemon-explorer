const BASE_URL = 'https://pokeapi.co/api/v2';

const fetchWithCache = (url) => {
  return fetch(url, {
    cache: 'force-cache',
    next: { revalidate: 3600 }
  });
};

export async function getPokemonTypes() {
  const response = await fetchWithCache(`${BASE_URL}/type`);
  const data = await response.json();
  return data.results;
}

export async function getPokemonList() {
  const response = await fetchWithCache(`${BASE_URL}/pokemon?limit=151`);
  const data = await response.json();
  return data.results;
}

export async function getPokemonByType(type) {
  const response = await fetchWithCache(`${BASE_URL}/type/${type}`);
  const data = await response.json();
  return data.pokemon.map(p => p.pokemon);
}

export async function getPokemonDetails(nameOrId) {
  const response = await fetchWithCache(`${BASE_URL}/pokemon/${nameOrId}`);
  const data = await response.json();
  return data;
}

export async function getAllPokemonWithDetails() {
  const pokemons = await getPokemonList();
  
  // Fetch all pokemon details in parallel with proper caching
  const detailedPokemons = await Promise.all(
    pokemons.map(async (pokemon) => {
      const details = await getPokemonDetails(pokemon.name);
      return {
        id: details.id,
        name: details.name,
        types: details.types.map(type => type.type.name),
        image: details.sprites.other['official-artwork'].front_default,
        stats: details.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        })),
        abilities: details.abilities.map(ability => ability.ability.name)
      };
    })
  );

  return detailedPokemons;
}
