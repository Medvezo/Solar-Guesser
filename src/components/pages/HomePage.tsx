import React from "react";
import { Link } from "react-router-dom";
import BadgesDisplay from "../container/BadgesDisplay";
import StreakDisplay from "../container/StreakDisplay";

const HomePage: React.FC = () => {
	// This is example data - you'll replace this with your actual state management
	const exampleStreakDays = Array.from({ length: 3 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() - (2 - i)); // Get last 3 days including today
		return {
			date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
			completed: i < 2, // First 2 days completed
			isFireStreak: false
		};
	});

	return (
		<>
			<div className="flex flex-col items-start  justify-center h-screen bg-black text-white bg-[url('/images/HomeBG.png')] bg-cover bg-center mt-10 w-full ">
				<div className="mb-60 ">
					<Link
						to="/singleplayer"
						className="block audiowide w-80 py-4 bg-transparent text-white text-2xl font-bold ml-12 transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF]"
					>
						Singleplayer
					</Link>
					<Link
						to="/multiplayer"
						className="block audiowide w-80 py-4 bg-transparent text-white text-2xl font-bold ml-12 transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF]"
					>
						Multiplayer
					</Link>
					<Link
						to="/explore"
						className="block audiowide w-80 py-4 bg-transparent text-white text-2xl font-bold ml-12 transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF]"
					>
						Solar Map
					</Link>
				</div>
			</div>
			<div className="absolute top-1/2 right-5 transform -translate-y-1/2">
				<BadgesDisplay />
			</div>
			<div className="absolute bottom-10 right-5">
				<StreakDisplay streakDays={exampleStreakDays} />
			</div>
		</>
	);
};

export default HomePage;
