import React from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";

interface LayersFilterProps {
	onLayerToggle: (layer: string, isVisible: boolean) => void;
}

const LayersFilter: React.FC<LayersFilterProps> = ({ onLayerToggle }) => {
	const primaryLayers = [
		{ name: "Planets", icon: "○" },
		{ name: "Asteroids", icon: "△" },
		{ name: "Comets", icon: "□" },
		{ name: "Spacecrafts", icon: "⬟" },
	];

	const secondaryLayers = [
		{ name: "User Interface", icon: null },
		{ name: "Labels", icon: null },
		{ name: "Icons", icon: null },
		{ name: "Orbits", icon: null },
		{ name: "Trails", icon: null },
	];

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
		<div className="absolute top-1/2 left-12 transform -translate-y-1/2 bg-black bg-opacity-75 text-white p-4 rounded-lg w-64">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-bold">Layers</h2>
				<span className="text-xl cursor-pointer">←</span>
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
							base: "w-full max-w-full bg-transparent pointer-events-none items-center justify-between cursor-pointer rounded-lg gap-2 p-2",
							label: "w-full text-white",
							wrapper: "pointer-events-auto",
						}}
					>
						<div className="flex items-center gap-2">
							{layer.icon && (
								<span className="text-xl text-yellow-400">{layer.icon}</span>
							)}
							<span>{layer.name}</span>
						</div>
					</Checkbox>
				))}
			</CheckboxGroup>

			<div className="mt-4 border-t border-gray-600 pt-4">
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
								base: "w-full max-w-full bg-transparent pointer-events-none items-center justify-between cursor-pointer rounded-lg gap-2 p-2",
								label: "w-full text-white",
								wrapper: "pointer-events-auto",
							}}
						>
							<span>{layer.name}</span>
						</Checkbox>
					))}
				</CheckboxGroup>
			</div>
		</div>
	);
};

export default LayersFilter;
