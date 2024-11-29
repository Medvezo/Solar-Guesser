import { Tooltip } from "@nextui-org/react";

interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  position: {
    top: string;
    left: string;
  };
}

const badges: Badge[] = [
  {
    id: "first-win",
    name: "First Victory",
    description: "Win your first game in single player mode",
    unlocked: true,
    position: { top: "0", left: "0" }
  },
  {
    id: "explorer",
    name: "Explorer",
    description: "Visit all planets in Solar Map mode",
    unlocked: false,
    position: { top: "0", left: "33.33%" }
  },
  {
    id: "speed-runner",
    name: "Speed Runner",
    description: "Complete a single player game in under 30 seconds",
    unlocked: false,
    position: { top: "50%", left: "0" }
  },
  {
    id: "perfectionist",
    name: "Perfectionist",
    description: "Get a perfect score in single player mode",
    unlocked: false,
    position: { top: "50%", left: "33.33%" }
  },
  {
    id: "astronomer",
    name: "Master Astronomer",
    description: "Correctly identify all planets without any hints",
    unlocked: false,
    position: { top: "50%", left: "66.66%" }
  }
];

const BadgesDisplay = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 max-h-[500px]">
      {badges.map((badge) => (
        <Tooltip
          key={badge.id}
          content={
            <div className="px-2 py-1">
              <p className="font-bold text-white">{badge.name}</p>
              <p className="text-sm text-gray-300">{badge.description}</p>
            </div>
          }
          placement="left"
          delay={0}
          closeDelay={0}
        >
          <div 
            className={`relative w-12 h-12 rounded-full ${
              badge.unlocked ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <img
              src={`/images/badges/${badge.id}.png`}
              alt={badge.name}
              className="w-full h-full object-contain"
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default BadgesDisplay; 