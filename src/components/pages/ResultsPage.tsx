import React from "react";
import { Link } from "react-router-dom";

interface ResultsPageProps {
	score: number;
	totalRounds: number;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ score }) => {
	const xp = score === 1 ? 50 : 0;
	return (
		<div className="h-screen w-full bg-[url('/images/StartsBG.png')] bg-cover bg-center flex flex-col items-center justify-center gap-10">
			<section className="flex items-center justify-center gap-40">
				<div className="flex flex-col items-center justify-start gap-10">
					{score === 1 ? (
						<div className="flex flex-col items-center justify-start gap-4 audiowide-font">
							<h1 className="text-[#F9AC19] text-5xl font-bold audiowide-font uppercase">
								YOU WON!
							</h1>
							<p className="text-[#AD75C1] text-3xl font-bold audiowide-font uppercase">
								+{xp}XP
							</p>
						</div>
					) : (
						<div className="flex flex-col items-center justify-start gap-4 audiowide-font">
							<h1 className="text-[#F9AC19] text-5xl font-bold audiowide-font uppercase">
								YOU LOST :(
							</h1>
							<p className="text-[#AD75C1]  text-3xl font-bold audiowide-font uppercase">
								{xp}XP
							</p>
						</div>
					)}
					<Link
						to="/"
						className="audiowide py-2 px-4 flex gap-2 justify-center items-center text-white text-lg font-bold transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF] bg-[#3CADD526] rounded-xl"
					>
						Back to Home
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
				</div>

				<div className="flex flex-col items-center justify-start gap-4">
					<img
						src="/images/AstroBig.png"
						alt="Astro Big"
						className="w-auto h-auto max-h-[280px]"
					/>
				</div>
			</section>
		</div>
	);
};

export default ResultsPage;
