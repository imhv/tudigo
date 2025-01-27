import { useQuery } from '@tanstack/react-query';

export const usePeople = () => {
  return useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const res = await fetch('https://swapi.dev/api/people/');
      return res.json();
    },
  });
};
