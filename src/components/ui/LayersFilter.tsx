import React from "react";
import { Checkbox, CheckboxGroup } from "@nextui-org/react";
import { primaryLayers, secondaryLayers } from "@/lib/const";

interface LayersFilterProps {
  onLayerToggle: (layer: string, isVisible: boolean) => void;
}

const LayersFilter: React.FC<LayersFilterProps> = ({ onLayerToggle }) => {
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">Layers</h2>
        <span className="text-xl cursor-pointer">
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
        </span>
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
              wrapper: "pointer-events-auto mr-0 before:border-[#3CADD5C2] before:w-5 before:h-5 after:bg-transparent group-data-[hover=true]:before:bg-transparent",
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

      <div className="mt-4 border-t border-[#3CADD5C2] pt-4 ">
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
                wrapper: "pointer-events-auto mr-0 before:border-[#3CADD5C2] before:w-5 before:h-5 after:bg-transparent group-data-[hover=true]:before:bg-transparent",
                icon: "text-[#3CADD5C2] w-3 h-3",
              }}
            >
              <span className="text-sm">{layer.name}</span>
            </Checkbox>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
};

export default LayersFilter;