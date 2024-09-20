import React from 'react';

interface PlanetInfoProps {
  planet: {
    name: string;
    description: string;
  };
  onClose: () => void;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, onClose }) => {
  return (
    <div className="absolute top-5 right-5 bg-black bg-opacity-75 text-white p-4 rounded max-w-md">
      <h2 className="text-xl font-bold mb-2">{planet.name}</h2>
      <p className="mb-4">{planet.description}</p>
      <button 
        onClick={onClose}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Close
      </button>
    </div>
  );
};

export default PlanetInfo;