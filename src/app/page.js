import FilterablePokemons from '@/components/client/FilterablePokemons';

export default function PokemonList(props) {
  return (
    <div className="min-h-screen bg-gray-200">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-[#003049]">
          Pokemon Explorer
        </h1>
        <FilterablePokemons searchParams={props.searchParams || {}} />
      </main>
    </div>
  );
}
