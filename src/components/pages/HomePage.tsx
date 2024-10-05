import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
	return (
		<>
        <div className="flex flex-col items-start  justify-center h-screen bg-black text-white bg-[url('/images/HomeBG.png')] bg-cover bg-center mt-10 w-full">
			<div className="mb-60 ">
				<Link
					to="/explore"
					className="block audiowide w-80 py-4 bg-transparent text-white text-2xl font-bold text-center transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF]"
				>
					Singleplayer
				</Link>
				<Link
					to="/multiplayer"
					className="block audiowide w-80 py-4 bg-transparent text-white text-2xl font-bold text-center transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF]"
				>
					Multiplayer
				</Link>
				<Link
					to="/explore"
					className="block audiowide w-80 py-4 bg-transparent text-white text-2xl font-bold text-center transition-colors uppercase tracking-widest hover:text-shadow-[0px_0px_4px_#FFFFFF]"
				>
					Solar Map
				</Link>
			</div>
		</div>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
          <img src="/images/badges.png" alt="Badges" className="w-auto h-80" />
        </div>
        <div className="absolute bottom-10 right-5">
          <img src="/images/streak.png" alt="Streak" className="w-96 h-auto" />
        </div>

        </>


	);
};

export default HomePage;
