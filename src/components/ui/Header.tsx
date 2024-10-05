import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
	const [progress] = useState(0);

	return (
		<header className="fixed top-0 left-0 w-full h-16 pl-14 px-7 z-50 flex justify-start items-center gap-1.5 bg-transparent">
			<Link to="/" className="flex items-center gap-1.5">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.03 10.77L20.69 6.98001C21.26 6.60001 21.41 5.82001 21.03 5.26001L19.21 2.54999C18.83 1.97999 18.05 1.82999 17.49 2.20999L11.83 6L15.03 10.77Z"
						stroke="#AAAAAA"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12.1738 6.47923L7.39616 9.67911L9.95607 13.5013L14.7337 10.3014L12.1738 6.47923Z"
						stroke="#AAAAAA"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M5.83 15.9L9.78 13.26L7.54 9.92001L3.59 12.56C3.13 12.87 3.01 13.49 3.32 13.95L4.45 15.63C4.75 16.08 5.37 16.2 5.83 15.9Z"
						stroke="#AAAAAA"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12.05 12.2L7.56 22"
						stroke="#AAAAAA"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 12.2L16.44 22"
						stroke="#AAAAAA"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<h1 className="text-[#AAAAAA] text-2xl">TEAM 42</h1>
			</Link>
      <div className="ml-auto flex items-center gap-4 mt-16 ">

				<aside className="rounded-lg">
					<img
						src="/images/Moon.png"
						alt="Astroneer"
						className="w-16 h-16 rounded-full"
					/>
				</aside>
			<div className=" flex items-center gap-4 bg-[#3C79D526] rounded-md px-1 pr-3">

				<div className="flex items-center  gap-3">
					<img
						src="/images/Astroneer.png"
						alt="Astroneer"
						className="w-16 h-16 rounded-full"
					/>
					<div className="flex flex-col gap-1">
						<span className="text-white text-sm font-semibold audiowide-font">
							ASTRONEER
						</span>
						<div></div>
						<div className="flex items-center gap-2">
							<p className="text-white text-sm font-semibold audiowide-font">
								lvl 0
							</p>
							<div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
								<div
									className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
									style={{ width: `${progress}%` }}
								></div>
							</div>
						</div>
					</div>
				</div>
        </div>

				<nav>{/* Add more navigation links here if needed */}</nav>
			</div>
		</header>
	);
}
