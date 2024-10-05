import React, { useState, useEffect } from "react";
import { Slider } from "@nextui-org/react";
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
	const [sliderValue, setSliderValue] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentDateTime((prevDateTime) => addSeconds(prevDateTime, speed*52560));
		}, 1000);

		return () => clearInterval(timer);
	}, [speed]);

	const handleSpeedChange = (value: number) => {
		const middleIndex = Math.floor(timeSpeedOptions.length / 2);
		const speedOption = timeSpeedOptions[value + middleIndex];
		setSpeed(speedOption ? speedOption.value : 1);
	  };

	const resetSpeed = () => {
		setSpeed(0.00002); // Reset to real-time speed (1x)
		// Reset the slider to the middle position
		setSliderValue(0); // Assuming you add this state
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
		<div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col gap-7  p-4 rounded-full min-w-[43vw]">
			<section className="flex items-center justify-center gap-8">
				<div className="flex flex-col items-center justify-center">
					<div
						className="text-center w-[200px] text-[#888888] bg-transparent border border-[#1D1D1D] text-xl"
					>
						{format(currentDateTime, "d MMM, yyyy")}
					</div>
					{showCalendar && (
						<div className="absolute bottom-full mb-2">
							<Calendar
								value={
									new CalendarDate(
										currentDateTime.getFullYear(),
										currentDateTime.getMonth() + 1,
										currentDateTime.getDate()
									)
								}
								onChange={handleDateChange}
							/>
						</div>
					)}
				</div>

				<div
					className="text-white min-w-[100px] text-center text-2xl uppercase cursor-pointer"
					onClick={resetSpeed}
				>
					{speed < 0 ? "-" : ""}
					{timeSpeedOptions.find((option) => option.value === Math.abs(speed))
						?.label || "Real Rate"}
				</div>
				<div className=" text-center text-[#888888] w-[200px] bg-transparent border border-[#1D1D1D] text-xl">
					{format(currentDateTime, "p")}
				</div>
			</section>

			<Slider
				step={1}
				maxValue={Math.floor(timeSpeedOptions.length / 2)}
				minValue={-Math.floor(timeSpeedOptions.length / 2)}
				defaultValue={0}
				size="sm"
				value={sliderValue}
				onChange={(value) => {
					setSliderValue(value as number);
					handleSpeedChange(value as number);
				}}
				classNames={{
					base: "",
					track:
						"bg-gradient-to-r border-s-transparent from-[#3CADD530] from-0% via-[#3CADD5] via-50% to-[#3CADD530] to-100% shadow-[0px_0px_20.3px_0px_#3CADD5]",
					filler: "bg-transparent",
					thumb: "bg-[#3CADD5]",
				}}
				renderThumb={(props) => (
					<div
						{...props}
						className="group p-1 top-1/2 rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
					>
						<span className="transition-transform  shadow-small  rounded-full w-10 h-10 block group-data-[dragging=true]:scale-80">
							<svg
								width="40"
								height="40"
								viewBox="0 0 41 41"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20.5 37.5833C29.9349 37.5833 37.5834 29.9348 37.5834 20.5C37.5834 11.0651 29.9349 3.41663 20.5 3.41663C11.0652 3.41663 3.41669 11.0651 3.41669 20.5C3.41669 29.9348 11.0652 37.5833 20.5 37.5833Z"
									stroke="#3CADD5"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M13.6667 5.125H15.375C12.0438 15.1017 12.0438 25.8983 15.375 35.875H13.6667"
									stroke="#3CADD5"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M25.625 5.125C28.9563 15.1017 28.9563 25.8983 25.625 35.875"
									stroke="#3CADD5"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5.125 27.3333V25.625C15.1017 28.9563 25.8983 28.9563 35.875 25.625V27.3333"
									stroke="#3CADD5"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M5.125 15.375C15.1017 12.0438 25.8983 12.0438 35.875 15.375"
									stroke="#3CADD5"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</span>
					</div>
				)}
			/>
		</div>
	);
};

export default TimeControls;
