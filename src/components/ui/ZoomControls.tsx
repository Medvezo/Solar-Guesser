import React from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Maximize2 } from "lucide-react";

interface ZoomControlsProps {
	onZoomIn: () => void;
	onZoomOut: () => void;
	onReset: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({
	onZoomIn,
	onZoomOut,
	onReset,
}) => {
	return (
		<motion.div
			className="fixed bottom-5 right-5 p-1 flex flex-col bg-[#3CADD526] bg-opacity-75 rounded-xl overflow-hidden"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Button onClick={onZoomIn} icon={<Plus size={20} />} />
			<Button onClick={onZoomOut} icon={<Minus size={20} />} />
			<Button onClick={onReset} icon={<Maximize2 size={20} />} isReset />
		</motion.div>
	);
};

const Button: React.FC<{ onClick: () => void; icon: React.ReactNode, isReset?: boolean }> = ({
	onClick,
	icon,
	isReset = false,
}) => (
	<button
		className={`w-6 h-6 m-2 p-0.5 flex items-center justify-center rounded-md text-[#3CADD5] hover:text-white hover:bg-sky-800 transition-colors ${isReset ? '' : 'border-2 border-[#3CADD5]'} `}
		onClick={onClick}
	>
		{icon}
	</button>
);

export default ZoomControls;
