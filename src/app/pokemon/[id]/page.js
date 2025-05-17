import { getPokemonDetails } from '@/lib/api/pokemon';

export const dynamic = 'force-dynamic';

export default async function PokemonDetails({ params }) {
  const pokemon = await getPokemonDetails(params.id);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6">
          <a 
            href="/"
            className="text-[#00B894] hover:text-[#00a884]"
          >
            ← Back
          </a>
        </div>
        
        <div className='flex justify-center'>
          <div className="overflow-hidden rounded-lg max-w-[320px]">
            <div className="bg-[#7FFFD4] p-4">
              <div className="relative w-full aspect-square">
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt={pokemon.name}
                  className="w-full h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
            <div className="bg-[#FFB347] p-6">
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Name: </span>
                  <span className="capitalize">{pokemon.name}</span>
                </div>
                <div>
                  <span className="font-semibold">Type: </span>
                  <span>{pokemon.types.map(t => t.type.name).join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold">Stats: </span>
                  <span>{pokemon.stats.map(s => s.stat.name).join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold">Abilities: </span>
                  <span>{pokemon.abilities.map(a => a.ability.name).join(', ')}</span>
                </div>
                <div>
                  <span className="font-semibold">Some Moves: </span>
                  <span>{pokemon.moves.slice(0, 5).map(m => m.move.name).join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
