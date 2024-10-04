import React, { useState } from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { primaryLayers, secondaryLayers } from "@/lib/const";
import { motion } from "framer-motion";

interface LayersFilterProps {
	onLayerToggle: (layer: string, isVisible: boolean) => void;
	isPlanetFocused: boolean;
}

const LayersFilter: React.FC<LayersFilterProps> = ({
	onLayerToggle,
	isPlanetFocused,
}) => {
	const [isExpanded, setIsExpanded] = useState(true);

	const handlePrimaryChange = (values: string[]) => {
		primaryLayers.forEach((layer) => {
			onLayerToggle(layer.name, values.includes(layer.name));
		});
	};

	const handleSecondaryChange = (values: string[]) => {
		secondaryLayers.forEach((layer) => {
			onLayerToggle(layer.name, values.includes(layer.name));
		});
	};

	return (
		<motion.div
			className={`absolute top-1/2 left-12 transform -translate-y-1/2 ${
				isPlanetFocused ? "bg-black bg-opacity-75" : "bg-[#3CADD526]"
			} text-white rounded-2xl overflow-hidden transition-colors duration-300 ease-in-out`}
			initial={{ width: 256, height: "auto" }}
			animate={{
				width: isExpanded ? 256 : 48,
				height: isExpanded ? "auto" : 48,
			}}
			transition={{ duration: 0.3, ease: "easeInOut" }}
		>
			<motion.div
				className="relative w-full h-full"
				initial={false}
				animate={{ scale: isExpanded ? 1 : 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<div className="p-4">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-xl">Layers</h2>
						<motion.span
							className="text-xl cursor-pointer"
							onClick={() => setIsExpanded(false)}
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12.5 16.6L7.0667 11.1667C6.42503 10.525 6.42503 9.47499 7.0667 8.83333L12.5 3.39999"
									stroke="white"
									strokeWidth="1.5"
									strokeMiterlimit="10"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</motion.span>
					</div>
					<CheckboxGroup
						defaultValue={["Planets"]}
						onValueChange={handlePrimaryChange}
					>
						{primaryLayers.map((layer) => (
							<Checkbox
								key={layer.name}
								value={layer.name}
								className="custom-checkbox reverse-checkbox"
								classNames={{
									base: "w-full max-w-full items-center justify-between cursor-pointer rounded-lg gap-2 p-2",
									label: "w-full text-white",
									wrapper:
										"pointer-events-auto mr-0 before:border-[#3CADD5C2] before:w-5 before:h-5 after:bg-transparent group-data-[hover=true]:before:bg-transparent",
									icon: "text-[#3CADD5C2] w-3 h-3",
								}}
							>
								<div className="flex items-center gap-2">
									{layer.icon && (
										<img
											src={layer.src}
											alt={`${layer.name} icon`}
											className="w-6 h-6"
										/>
									)}
									<span className="text-sm">{layer.name}</span>
								</div>
							</Checkbox>
						))}
					</CheckboxGroup>
					<div className="mt-4 border-t border-[#3CADD5C2] pt-4">
						<CheckboxGroup
							defaultValue={["User Interface", "Labels", "Icons", "Orbits"]}
							onValueChange={handleSecondaryChange}
						>
							{secondaryLayers.map((layer) => (
								<Checkbox
									key={layer.name}
									value={layer.name}
									className="custom-checkbox reverse-checkbox"
									classNames={{
										base: "w-full max-w-full items-center justify-between cursor-pointer rounded-lg gap-2 p-2",
										label: "w-full text-white",
										wrapper:
											"pointer-events-auto mr-0 before:border-[#3CADD5C2] before:w-5 before:h-5 after:bg-transparent group-data-[hover=true]:before:bg-transparent",
										icon: "text-[#3CADD5C2] w-3 h-3",
									}}
								>
									<span className="text-sm">{layer.name}</span>
								</Checkbox>
							))}
						</CheckboxGroup>
					</div>
				</div>
			</motion.div>
			<motion.button
				className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center bg-transparent"
				onClick={() => setIsExpanded(true)}
				initial={false}
				animate={{ scale: isExpanded ? 0 : 1 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				{/* Replace this SVG with your custom SVG for the open button */}
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.01 2.92001L18.91 5.54001C20.61 6.29001 20.61 7.53001 18.91 8.28001L13.01 10.9C12.34 11.2 11.24 11.2 10.57 10.9L4.67 8.28001C2.97 7.53001 2.97 6.29001 4.67 5.54001L10.57 2.92001C11.24 2.62001 12.34 2.62001 13.01 2.92001Z"
						stroke="#3CADD5"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11"
						stroke="#3CADD5"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16"
						stroke="#3CADD5"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</motion.button>
		</motion.div>
	);
};

export default LayersFilter;
