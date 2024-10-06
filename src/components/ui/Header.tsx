import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";

export default function Header() {
	const [progress] = useState(0);
	const location = useLocation();
	const isBlurred = location.pathname === '/singleplayer' || location.pathname === '/multiplayer';

	return (
		<header className={`fixed top-0 left-0 w-full h-16 pl-14 px-7 z-50 flex justify-start items-center gap-1.5 ${isBlurred ? 'bg-transparent backdrop-blur-xl' : 'bg-transparent'}`}>
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
				<Popover placement="bottom-end">
					<PopoverTrigger>
						<aside className="rounded-lg cursor-pointer">
							<img
								src="/images/Moon.png"
								alt="Missions"
								className="w-16 h-16 rounded-full"
							/>
						</aside>
					</PopoverTrigger>
					<PopoverContent className="bg-[#3C79D526] p-6 rounded-lg w-80 flex justify-start items-start">
						<div className="text-white text-xl font-bold mb-4">MISSIONS</div>
						<div className="flex items-center mb-2 gap-4 justify-center w-full">
							<span className="text-[#FFA726] font-bold ">29m 19s</span>
							<svg
								width="33"
								height="37"
								viewBox="0 0 33 37"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M8.87109 4.99609L13.1484 -0.00390625H16.6152L10.5898 7.01758L16.5762 14H13.1289L8.87109 9.03906L4.63281 14H1.17578L7.15234 7.01758L1.15625 -0.00390625H4.59375L8.87109 4.99609ZM32.1719 5.85547C32.1719 6.4349 32.1003 6.95247 31.957 7.4082C31.8138 7.86393 31.6185 8.26758 31.3711 8.61914C31.1302 8.96419 30.8503 9.26042 30.5312 9.50781C30.2122 9.75521 29.877 9.95703 29.5254 10.1133C29.1803 10.2695 28.8288 10.3835 28.4707 10.4551C28.1191 10.5267 27.7871 10.5625 27.4746 10.5625H21.7324V8.02344H27.4746C27.8001 7.9974 28.0931 7.93229 28.3535 7.82812C28.6204 7.71745 28.8483 7.57096 29.0371 7.38867C29.2259 7.20638 29.3724 6.98828 29.4766 6.73438C29.5807 6.47396 29.6328 6.18099 29.6328 5.85547V4.70312C29.6003 4.38411 29.5319 4.09115 29.4277 3.82422C29.3236 3.55729 29.1803 3.32943 28.998 3.14062C28.8223 2.95182 28.6074 2.80534 28.3535 2.70117C28.0996 2.59049 27.8066 2.53516 27.4746 2.53516H21.752C21.4134 2.53516 21.1562 2.62305 20.9805 2.79883C20.8047 2.97461 20.7168 3.22852 20.7168 3.56055V14H18.1777V3.56055C18.1777 2.90951 18.2949 2.35612 18.5293 1.90039C18.7702 1.44466 19.0664 1.07682 19.418 0.796875C19.776 0.516927 20.1634 0.315104 20.5801 0.191406C20.9967 0.0611979 21.3809 -0.00390625 21.7324 -0.00390625H27.4746C28.0475 -0.00390625 28.5618 0.0709635 29.0176 0.220703C29.4733 0.363932 29.8737 0.559245 30.2188 0.806641C30.5703 1.04753 30.8665 1.32747 31.1074 1.64648C31.3548 1.96549 31.5566 2.30078 31.7129 2.65234C31.8757 2.9974 31.9928 3.34896 32.0645 3.70703C32.1361 4.05859 32.1719 4.39062 32.1719 4.70312V5.85547Z"
									fill="#AD75C1"
								/>
								<rect y="19" width="32" height="18" rx="5" fill="white" />
								<path
									d="M8.98242 28.4844H6.91992V30.5469H5.55469V28.4844H3.48633V27.1133H5.55469V25.0508H6.91992V27.1133H8.98242V28.4844ZM16.6582 23.9844C16.7246 24.1055 16.7578 24.2344 16.7578 24.3711C16.7578 24.5039 16.7246 24.6309 16.6582 24.752L12.4336 32H10.6699L14.666 25.1211H9.73242V23.5977H15.9961C16.1328 23.5977 16.2598 23.6328 16.377 23.7031C16.498 23.7695 16.5918 23.8633 16.6582 23.9844ZM25.5059 29.8613C25.5059 30.0059 25.4883 30.1582 25.4531 30.3184C25.4219 30.4785 25.3691 30.6387 25.2949 30.7988C25.2246 30.9551 25.1328 31.1055 25.0195 31.25C24.9102 31.3945 24.7754 31.5234 24.6152 31.6367C24.459 31.7461 24.2773 31.834 24.0703 31.9004C23.8633 31.9668 23.6309 32 23.373 32H17.7891V30.4766H23.373C23.5645 30.4766 23.7109 30.418 23.8125 30.3008C23.918 30.1836 23.9707 30.0371 23.9707 29.8613V29.1816C23.9707 28.9824 23.9199 28.8301 23.8184 28.7246C23.7168 28.6191 23.5645 28.5664 23.3613 28.5664H19.9277C19.5332 28.5664 19.1992 28.4961 18.9258 28.3555C18.6562 28.2109 18.4375 28.0312 18.2695 27.8164C18.1016 27.6016 17.9785 27.3691 17.9004 27.1191C17.8262 26.8691 17.7891 26.6367 17.7891 26.4219V23.5977H24.8086V25.1211H19.3125V26.4219C19.3125 26.625 19.3652 26.7773 19.4707 26.8789C19.5762 26.9805 19.7285 27.0312 19.9277 27.0312H23.373C23.584 27.0312 23.8145 27.0703 24.0645 27.1484C24.3145 27.2227 24.5449 27.3457 24.7559 27.5176C24.9707 27.6855 25.1484 27.9062 25.2891 28.1797C25.4336 28.4531 25.5059 28.7871 25.5059 29.1816V29.8613Z"
									fill="black"
								/>
							</svg>
						</div>
						<div className="text-white text-lg mb-2 w-full">
							Guess right all 9 planets
						</div>
						<div className="flex items-center w-full">
							<div className="bg-[#2D2F39] h-2 flex-grow rounded-full mr-2">
								<div className="bg-[#B57BFF] h-full w-0 rounded-full"></div>
							</div>
							<span className="text-white">0/9</span>
						</div>
					</PopoverContent>
				</Popover>

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