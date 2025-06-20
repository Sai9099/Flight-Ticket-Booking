import React from 'react';
import { Link } from 'react-router-dom';
import { Plane as PlaneCrash, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <PlaneCrash className="h-24 w-24 mx-auto text-primary-600 mb-6" />
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-secondary-600 mb-8">
          Oops! It looks like this flight has been delayed indefinitely. 
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary inline-flex items-center">
          <Home className="h-5 w-5 mr-2" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;