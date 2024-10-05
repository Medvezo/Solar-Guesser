import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PlanetInfoProps {
	planet: {
		name: string;
		description: string;
		type?: string;
		moons?: string;
		gravity?: string;
		dayLength?: string;
		radiusInKm?: string;
		orbitalPeriod?: string;
		distanceFromSun?: string;
		coordinates?: string;
	};
	onClose: () => void;
}

const PlanetInfo: React.FC<PlanetInfoProps> = ({ planet, onClose }) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, x: 100, y: "-50%" }}
				animate={{ opacity: 1, x: 0, y: "-50%" }}
				exit={{ opacity: 0, x: 100, y: "-50%" }}
				transition={{ duration: 0.3 }}
				className="absolute top-1/2 right-28 bg-black bg-opacity-75 text-white p-6 rounded-2xl max-w-[400px]"
			>
				<h2 className="text-4xl font-bold mb-4 my-1 text-white">{planet.name}</h2>

				{planet.type && <p className="text-[#716B6B] uppercase mb-1">{planet.type}</p>}
				<p className="mb-6">{planet.description}</p>
				
				{(planet.moons || planet.gravity || planet.dayLength || planet.radiusInKm || planet.orbitalPeriod || planet.distanceFromSun || planet.coordinates) && (
					<div className="space-y-2">
						<h3 className="text-xl text-[#3CADD5] mb-2">Info</h3>
						{planet.moons && <InfoItem label="Moons" value={planet.moons} />}
						{planet.gravity && <InfoItem label="Gravity" value={planet.gravity} />}
						{planet.dayLength && <InfoItem label="Length of the day" value={planet.dayLength} />}
						{planet.radiusInKm && <InfoItem label="Radius" value={planet.radiusInKm} />}
						{planet.orbitalPeriod && <InfoItem label="Orbital period" value={planet.orbitalPeriod} />}
						{planet.distanceFromSun && <InfoItem label="Distance from Sun" value={planet.distanceFromSun} />}
						{planet.coordinates && <InfoItem label="Coordinates" value={planet.coordinates} />}
					</div>
				)}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</motion.div>
		</AnimatePresence>
	);
};

const InfoItem: React.FC<{ label: string; value: string }> = ({
	label,
	value,
}) => (
	<div className="flex justify-start items-center gap-2">
		<span className="text-white">{label}:</span>
		<span className="text-[#8C8C8C]">{value}</span>
	</div>
);

export default PlanetInfo;
