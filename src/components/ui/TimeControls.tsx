import React, { useState, useEffect } from "react";
import { Slider, Button } from "@nextui-org/react";
import { Calendar } from "@nextui-org/react";
import { format, addSeconds } from "date-fns";
import { timeSpeedOptions } from "@/lib/const";
import { CalendarDate } from "@internationalized/date";

interface TimeControlsProps {
	isDynamic: boolean;
	setIsDynamic: (value: boolean) => void;
	speed: number;
	setSpeed: (value: number) => void;
}

const TimeControls: React.FC<TimeControlsProps> = ({ speed, setSpeed }) => {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());
	const [showCalendar, setShowCalendar] = useState(false);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDateTime((prevDateTime) => addSeconds(prevDateTime, speed));
		}, 1000);

		return () => clearInterval(timer);
	}, [speed]);

	const handleSpeedChange = (value: number) => {
		const speedOption = timeSpeedOptions.find(
			(option) => option.value === value
		);
		setSpeed(speedOption ? speedOption.value : 1);
	};

	const handleDateChange = (newDate: CalendarDate) => {
		const newDateTime = new Date(
			newDate.year,
			newDate.month - 1,
			newDate.day,
			currentDateTime.getHours(),
			currentDateTime.getMinutes(),
			currentDateTime.getSeconds()
		);
		setCurrentDateTime(newDateTime);
		setShowCalendar(false);
	};

	return (
		<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black bg-opacity-50 p-4 rounded-full">
			<div className="flex flex-col items-center">
				<Button onClick={() => setShowCalendar(!showCalendar)}>
					{format(currentDateTime, "d MMM, yyyy")}
				</Button>
				{showCalendar && (
					<div className="absolute bottom-full mb-2">
						<Calendar
							value={new CalendarDate(
								currentDateTime.getFullYear(),
								currentDateTime.getMonth() + 1,
								currentDateTime.getDate()
							)}
							onChange={handleDateChange}
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
			<div className="text-white">{format(currentDateTime, "p")}</div>
		</div>
	);
};

export default TimeControls;
