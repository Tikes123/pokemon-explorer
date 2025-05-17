export default function PokemonCard({ pokemon }) {
  const { id, name, image } = pokemon;

  return (
    <div className="bg-white shadow-sm overflow-hidden rounded-lg">
      <div className="relative w-full aspect-square mb-4 h-[140px]">
        {/* Use standard img tag for better no-JS support */}
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-contain px-[80px]"
          loading="eager"
        />
      </div>
      <div className='bg-[#f5f5f5] p-4 shadow-md flex flex-col justify-between h-[190px]'>
        <h2 className="text-xl font-semibold capitalize text-[#003049] mt-3">
          {name}
        </h2>
        <a 
          href={`/pokemon/${name}`}
          className="text-blue-500 hover:text-blue-700 mb-3"
        >
          Details →
        </a>
      </div>
    </div>
  );
}
