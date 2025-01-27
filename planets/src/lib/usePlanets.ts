import { useQuery } from '@tanstack/react-query';

export interface Planet {
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: string;
  edited: string;
}

export const usePlanets = () => {
  return useQuery({
    queryKey: ['planets'],
    queryFn: async () => {
      const res = await fetch('https://swapi.dev/api/planets/');
      if (!res.ok) throw new Error('Failed to fetch planets');
      return res.json();
    },
  });
};
