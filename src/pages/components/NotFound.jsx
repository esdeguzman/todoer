import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-6xl font-bold text-white mb-4">404</h1>
      <p className="text-xl text-white">Oops! Page not found.</p>
      <p className="text-white mt-2">The page you're looking for might have been removed or is temporarily unavailable.</p>
      <a href="/" className="text-blue-300 hover:underline mt-4">Go back to homepage</a>
    </div>
  );
};

export default NotFound;
