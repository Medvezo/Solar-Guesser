import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SimpleSolarSystem from "../ui/SimpleSolarSystem";
import Panorama360View from "../ui/Panorama360View";
import ScoreBoard from "../ui/ScoreBoard";
import ResultsPage from "./ResultsPage";

const SinglePlayerPage: React.FC = () => {
	const [savedPlanets, setSavedPlanets] = useState<string[]>([]);
	const [score, setScore] = useState<number>(0);
	const [round, setRound] = useState<number>(1);
	const [correctAnswer, setCorrectAnswer] = useState<string>("Earth");
	const [gameOver, setGameOver] = useState<boolean>(false);

	const totalRounds = 1; // Increased for a more interesting game

	useEffect(() => {
		// Set a new correct answer for each round
		setCorrectAnswer("Mars");
	}, [round]);

	const handleSave = (selectedPlanet: string) => {
		setSavedPlanets([...savedPlanets, selectedPlanet]);
		
		if (selectedPlanet === correctAnswer) {
			setScore(prevScore => prevScore + 1);
		}

		if (round < totalRounds) {
			setRound(prevRound => prevRound + 1);
		} else {
			// Game over
			setGameOver(true);
		}
	};

	if (gameOver) {
		return <ResultsPage score={score} totalRounds={totalRounds} />;
	}

	return (
		<div className="w-full h-screen bg-gray-900 text-white">
			<Link
				to="/"
				className="absolute top-40 left-16 audiowide py-2 px-4 flex gap-2 justify-center items-center text-white text-lg font-bold transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF] bg-[#3CADD526] hover:bg-[#3CADD54C] rounded-xl z-50"
			>
				Back
				<svg
					width="17"
					height="17"
					viewBox="0 0 17 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10.6251 14.11L6.00672 9.49167C5.4613 8.94625 5.4613 8.05375 6.00672 7.50833L10.6251 2.89"
						stroke="white"
						strokeWidth="1.5"
						strokeMiterlimit="10"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</Link>
			<Panorama360View imagePath="/images/mars360.png" />

			<ScoreBoard
				score={score}
				round={round}
				totalRounds={totalRounds}
			/>

			<div className="mx-auto px-4 py-8 absolute bottom-0 right-5">
				<div className="bg-gray-800 rounded-lg overflow-hidden" style={{ width: "600px", height: "350px" }}>
					<SimpleSolarSystem onSave={handleSave} />
				</div>
			</div>
		</div>
	);
};

export default SinglePlayerPage;
