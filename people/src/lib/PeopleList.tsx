import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Ruler,
  Weight,
  Scissors,
  Palette,
  Eye,
  Baby,
  User,
} from 'lucide-react';

const PersonCard = ({ person, index }: { person: any; index: number }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/people/${index + 1}`)}
      className="rounded-lg w-80 p-4 border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">{person.name}</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center">
            <span className="text-muted-foreground w-24">Height:</span>
            <span>{person.height} cm</span>
          </li>
          <li className="flex items-center">
            <span className="text-muted-foreground w-24">Mass:</span>
            <span>{person.mass} kg</span>
          </li>
          <li className="flex items-center">
            <span className="text-muted-foreground w-24">Hair Color:</span>
            <span>{person.hair_color}</span>
          </li>
          <li className="flex items-center">
            <span className="text-muted-foreground w-24">Skin Color:</span>
            <span>{person.skin_color}</span>
          </li>
          <li className="flex items-center">
            <span className="text-muted-foreground w-24">Eye Color:</span>
            <span>{person.eye_color}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export const PeopleList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['people'],
    queryFn: async () => {
      const response = await fetch('https://swapi.dev/api/people/');
      if (!response.ok) throw new Error('Failed to fetch people');
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading people...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">
          Error loading people.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Star Wars Characters
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {data.results.map((person: any, index: number) => (
            <PersonCard key={person.name} person={person} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PersonDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ['person', id],
    queryFn: async () => {
      const response = await fetch(`https://swapi.dev/api/people/${id}/`);
      if (!response.ok) throw new Error('Failed to fetch person');
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading person</div>;

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-lg p-4 border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">
              {data.name}
            </h1>
            <div className="space-y-4">
              <InfoRow
                icon={Ruler}
                label="Height"
                value={`${data.height} cm`}
              />
              <InfoRow icon={Weight} label="Mass" value={`${data.mass} kg`} />
              <InfoRow
                icon={Scissors}
                label="Hair Color"
                value={data.hair_color}
              />
              <InfoRow
                icon={Palette}
                label="Skin Color"
                value={data.skin_color}
              />
              <InfoRow icon={Eye} label="Eye Color" value={data.eye_color} />
              <InfoRow icon={Baby} label="Birth Year" value={data.birth_year} />
              <InfoRow icon={User} label="Gender" value={data.gender} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: any;
}) => (
  <div className="flex border-b py-2 items-center">
    <Icon className="w-5 h-5 text-blue-600 mr-2" />
    <span className="font-semibold w-32">{label}:</span>
    <span className="text-gray-700">{value}</span>
  </div>
);
