import { useQuery } from '@tanstack/react-query';

export const PlanetsList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['planets'],
    queryFn: async () => {
      const response = await fetch('https://swapi.dev/api/planets/');
      if (!response.ok) throw new Error('Failed to fetch planets');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center w-full justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading planets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">
          Error loading planets.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Explore Star Wars Planets
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {data.results.map((planet: any) => (
            <PlanetCard key={planet.name} planet={planet} />
          ))}
        </div>
      </div>
    </div>
  );
};

const PlanetCard = ({ planet }: { planet: any }) => (
  <div className="rounded-lg w-80 p-4 border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">{planet.name}</h2>
      <ul className="space-y-3 text-sm">
        <li className="flex items-center">
          <span className="text-muted-foreground w-24">Population:</span>
          <span>
            {planet.population === 'unknown' ? 'N/A' : planet.population}
          </span>
        </li>
        <li className="flex items-center">
          <span className="text-muted-foreground w-24">Climate:</span>
          <span>{planet.climate}</span>
        </li>
        <li className="flex items-center">
          <span className="text-muted-foreground w-24">Terrain:</span>
          <span>{planet.terrain}</span>
        </li>
        <li className="flex items-center">
          <span className="text-muted-foreground w-24">Diameter:</span>
          <span>{planet.diameter} km</span>
        </li>
      </ul>
    </div>
  </div>
);
