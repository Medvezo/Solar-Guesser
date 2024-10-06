import React from 'react';

interface ScoreBoardProps {
  score: number;
  round: number;
  totalRounds: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, round, totalRounds }) => {
  return (
    <div className="absolute top-40 right-0 z-10 bg-[#3CADD550] text-white p-4 rounded-l-xl flex items-center justify-between w-96">
      <div className="text-lg">
        <span className="font-bold">Map:</span> Solar system
      </div>
      <div className="text-lg">
        <span className="font-bold">Round:</span> {round}/{totalRounds}
      </div>
      <div className="text-lg">
        <span className="font-bold">Score:</span> {score}
      </div>
    </div>
  );
};

export default ScoreBoard;