import React, { useState } from "react";
import { planets } from "../../lib/const";

interface PlanetGridItemProps {
	name: string;
	textureMap: string;
	isSelected: boolean;
	onSelect: (name: string) => void;
}

const PlanetGridItem: React.FC<PlanetGridItemProps> = ({
	name,
	textureMap,
	isSelected,
	onSelect,
}) => {
	return (
		<div
			className={`w-24 h-24 m-2 flex flex-col items-center justify-center cursor-pointer rounded-lg ${
				isSelected ? "border-4 border-white" : "border border-gray-600"
			}`}
			onClick={() => onSelect(name)}
		>
			<div
				className="w-16 h-16 rounded-full bg-cover bg-center mb-2"
				style={{ backgroundImage: `url(${textureMap})` }}
			></div>
			<span className="text-white text-sm">{name}</span>
		</div>
	);
};

interface SimpleSolarSystemProps {
	onSave: (selectedPlanet: string) => void;
}

const SimpleSolarSystem: React.FC<SimpleSolarSystemProps> = ({ onSave }) => {
	const [selectedPlanet, setSelectedPlanet] = useState<string>("");

	const handlePlanetSelect = (name: string) => {
		setSelectedPlanet(name);
	};

	return (
		<div className="w-full h-full bg-[#3CADD525] opacity-50 hover:opacity-100 transition-opacity duration-300 p-4 relative">
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-items-center">
				{planets.map((planet) => (
					<PlanetGridItem
						key={planet.name}
						name={planet.name}
						textureMap={planet.textureMap}
						onSelect={handlePlanetSelect}
						isSelected={selectedPlanet === planet.name}
					/>
				))}
			</div>
			<button
				className="absolute bottom-4 right-4 left-4 bg-[#3C79D5] text-white px-4 py-2 rounded"
				onClick={() => onSave(selectedPlanet)}
				disabled={!selectedPlanet}
			>
				Save
			</button>
		</div>
	);
};

export default SimpleSolarSystem;
