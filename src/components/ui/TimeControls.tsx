import React, { useState } from "react";
import { Slider, Button } from "@nextui-org/react";
import { Calendar } from "@nextui-org/react";
import { format } from "date-fns";
import { timeSpeedOptions } from "@/lib/const";

interface TimeControlsProps {
	isDynamic: boolean;
	setIsDynamic: (value: boolean) => void;
	speed: number;
	setSpeed: (value: number) => void;
}

const TimeControls: React.FC<TimeControlsProps> = ({
	isDynamic,
	setIsDynamic,
	speed,
	setSpeed,
}) => {
	const [date, setDate] = useState(new Date());
	const [showCalendar, setShowCalendar] = useState(false);

	const handleSpeedChange = (value: number) => {
		const speedOption = timeSpeedOptions.find(
			(option) => option.value === value
		);
		setSpeed(speedOption ? speedOption.value : 1);
	};

	return (
		<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black bg-opacity-50 p-4 rounded-full">
			<Button
				auto
				color={isDynamic ? "success" : "error"}
				onClick={() => setIsDynamic(!isDynamic)}
			>
				{isDynamic ? "Pause" : "Start"}
			</Button>
			<div className="flex flex-col items-center">
				<Button auto flat onClick={() => setShowCalendar(!showCalendar)}>
					{format(date, "d MMM, yyyy")}
				</Button>
				{showCalendar && (
					<div className="absolute bottom-full mb-2">
						<Calendar
							value={date}
							onChange={(newDate) => {
								setDate(newDate);
								setShowCalendar(false);
							}}
						/>
					</div>
				)}
			</div>
			<Slider
				step={1}
				maxValue={timeSpeedOptions.length - 1}
				minValue={0}
				defaultValue={0}
				className="max-w-md"
				onChange={(value) =>
					handleSpeedChange(timeSpeedOptions[value as number].value)
				}
				marks={[
					{ value: 0, label: "Real Rate" },
					{ value: timeSpeedOptions.length - 1, label: "1 year/s" },
				]}
			/>
			<div className="text-white min-w-[100px] text-center">
				{timeSpeedOptions.find((option) => option.value === speed)?.label ||
					"Real Rate"}
			</div>
			<div className="text-white">{format(date, "p")}</div>
		</div>
	);
};

export default TimeControls;
