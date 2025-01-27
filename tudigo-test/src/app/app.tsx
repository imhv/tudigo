import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import { PlanetsList } from '@starwars/planets';
import { PeopleList, PersonDetail } from '@starwars/people';
import { Globe2, Users } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="mb-4 text-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {isLast ? (
                <span className="font-medium capitalize">{name}</span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-blue-600 hover:text-blue-800 capitalize"
                >
                  {name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const App = () => (
  <div className="p-4">
    <Breadcrumb />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/planets" element={<PlanetsList />} />
      <Route path="/people" element={<PeopleList />} />
      <Route path="/people/:id" element={<PersonDetail />} />
    </Routes>
  </div>
);

const HomePage = () => (
  <div className="min-h-screen">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-600">
        Tudigo Star Wars
      </h1>
      <div className="grid md:grid-cols-2 gap-8 px-4">
        {/* Planets Card */}
        <Link
          to="/planets"
          className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all p-8"
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="rounded-full bg-blue-50 p-4">
              <Globe2 className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-blue-600">
              Planets
            </h2>
            <p className="text-center text-muted-foreground">
              Explore the diverse worlds of the Star Wars universe
            </p>
            <span className="inline-flex items-center text-blue-600">
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </Link>

        {/* People Card */}
        <Link
          to="/people"
          className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all p-8"
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="rounded-full bg-blue-50 p-4">
              <Users className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-blue-600">
              Characters
            </h2>
            <p className="text-center text-muted-foreground">
              Meet the iconic characters that shape the Star Wars saga
            </p>
            <span className="inline-flex items-center text-blue-600">
              View all
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </div>
  </div>
);

export default App;
