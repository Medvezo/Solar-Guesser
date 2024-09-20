import React from 'react'

interface ControlsProps {
  isDynamic: boolean
  setIsDynamic: (value: boolean) => void
  speed: number
  setSpeed: (value: number) => void
}

const Controls: React.FC<ControlsProps> = ({ isDynamic, setIsDynamic, speed, setSpeed }) => {
  return (
    <div className="absolute bottom-5 left-5 flex items-center gap-2.5 bg-black bg-opacity-50 p-2.5 rounded ">
      <button
        className="px-2.5 py-1.5 cursor-pointer"
        onClick={() => setIsDynamic(!isDynamic)}
      >
        {isDynamic ? 'Pause' : 'Start'}
      </button>
      <input
        type="range"
        min="0.1"
        max="5"
        step="0.1"
        value={speed}
        onChange={(e) => setSpeed(parseFloat(e.target.value))}
        className="w-24"
      />
      <span>Speed: {speed.toFixed(1)}x</span>
    </div>
  )
}

export default Controls