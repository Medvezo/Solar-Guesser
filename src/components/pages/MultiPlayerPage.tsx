import { Link } from "react-router-dom";

export default function MultiPlayerPage() {
	return (
		<div className="h-screen w-full bg-[url('/images/StartsBG.png')] bg-cover bg-center flex flex-col items-center justify-center gap-10">
			<Link
				to="/"
				className="absolute top-40 left-16 audiowide py-2 px-4  flex gap-2 justify-center items-center text-white text-lg font-bold transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF] bg-[#3CADD526] rounded-xl"
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

			<section className="flex flex-col items-center justify-center mr-[30%]  ">
				<div className="flex flex-col items-center justify-start gap-4">
					<img
						src="/images/AstroBig.png"
						alt="Astro Big"
						className="w-auto h-auto max-h-[280px]"
					/>
					<h3 className="text-white text-2xl font-bold audiowide-font uppercase">
						Astroneer
					</h3>
				</div>
			</section>
			<div className="mt-8 text-white text-2xl font-bold audiowide-font">
				Waiting for opponent
				<span className="dots">
					<span>.</span>
					<span>.</span>
					<span>.</span>
				</span>
			</div>
		</div>
	);
}
