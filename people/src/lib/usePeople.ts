import { useQuery } from '@tanstack/react-query';

export interface Person {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

export const usePeople = () => {
  return useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const res = await fetch('https://swapi.dev/api/people/');
      if (!res.ok) throw new Error('Failed to fetch people');
      return res.json();
    },
  });
};

export const usePerson = (id: string) => {
  return useQuery<Person>({
    queryKey: ['person', id],
    queryFn: async () => {
      const res = await fetch(`https://swapi.dev/api/people/${id}/`);
      if (!res.ok) throw new Error('Failed to fetch person');
      return res.json();
    },
  });
};
