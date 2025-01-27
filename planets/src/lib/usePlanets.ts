import { useQuery } from '@tanstack/react-query';

export const usePlanets = () => {
  return useQuery({
    queryKey: ['planets'],
    queryFn: async () => {
      const res = await fetch('https://swapi.dev/api/planets/');
      return res.json();
    },
  });
};
