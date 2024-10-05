import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <div className="space-y-4">
        <Link to="/explore" className="block px-6 py-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors">
          Single Player
        </Link>
        <Link to="/multiplayer" className="block px-6 py-3 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition-colors">
          Multiplayer
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
