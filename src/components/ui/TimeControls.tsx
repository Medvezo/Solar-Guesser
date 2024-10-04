import React from 'react'

interface TimeControlsProps {
  isDynamic: boolean
  setIsDynamic: (value: boolean) => void
  speed: number
  setSpeed: (value: number) => void
}

const TimeControls: React.FC<TimeControlsProps> = ({ isDynamic, setIsDynamic, speed, setSpeed }) => {
  return (
    <div className="absolute bottom-5 left-5 flex items-center gap-2.5 bg-black bg-opacity-50 p-2.5 rounded">
      <button
        className="px-2.5 py-1.5 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        onClick={() => setIsDynamic(!isDynamic)}
      >
        {isDynamic ? 'Pause' : 'Start'}
      </button>
      <input
        type="range"
        min="0.1"
        max="20"
        step="0.1"
        value={speed}
        onChange={(e) => setSpeed(parseFloat(e.target.value))}
        className="w-32"
      />
      <span className="text-white">Speed: {speed.toFixed(1)}x</span>
    </div>
  )
}

export default TimeControls