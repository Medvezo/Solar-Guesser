import React from "react";
import Panorama360View from "../ui/Panorama360View";
import { Link } from "react-router-dom";

const SinglePlayerPage: React.FC = () => {
	return (
		<div className="w-full h-screen">
			<Link
				to="/"
				className="absolute top-40 left-16 audiowide py-2 px-4  flex gap-2 justify-center items-center text-white text-lg font-bold transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF] bg-[#3CADD526] hover:bg-[#3CADD54C] rounded-xl"
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
						stroke-width="1.5"
						stroke-miterlimit="10"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</Link>
			<Panorama360View imagePath="/images/360test1.avif" />
		</div>
	);
};

export default SinglePlayerPage;
