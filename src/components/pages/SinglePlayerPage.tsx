import React, { useState, useEffect } from "react";
import GoBackButton from "../common/GoBackButton";
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
			<GoBackButton position="low" size="sm" />

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
