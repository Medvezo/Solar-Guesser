import GoBackButton from "../common/GoBackButton";

export default function MultiPlayerPage() {
	return (
		<div className="h-screen w-full bg-[url('/images/StartsBG.png')] bg-cover bg-center flex flex-col items-center justify-center gap-10">
			<GoBackButton position="high" />

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
