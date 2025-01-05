import React, { useState } from 'react';
import { FaCheck, FaPlay, FaPause, FaTrash, FaClock } from 'react-icons/fa';

function Task({ task, onComplete, onDelete, onStart, onUpdateLaps, activeTask, timerState }) {
  const [isEditingLaps, setIsEditingLaps] = useState(false);
  const [newLaps, setNewLaps] = useState(task.laps || 1);

  const handleLapsUpdate = () => {
    onUpdateLaps(task.id, newLaps);
    setIsEditingLaps(false);
  };

  const handleComplete = () => {
    if (!task.isComplete) {
      // Play the sound only when marking as complete
     const audio = new Audio(`${process.env.PUBLIC_URL}/sound.mp3`);
audio.play();
    }
    onComplete(task.id); 
  };
  return (
<li className="flex items-center justify-between bg-gray-900 p-2 rounded-md shadow-sm hover:bg-gray-800 transition-all">
{/* Task Name and Status */}
  <div className="flex items-center space-x-2">
        <button
          onClick={handleComplete}
         className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${
        task.isComplete ? 'bg-teal-500 border-teal-500' : 'border-gray-500'
      }`}
        >
          {task.isComplete && <FaCheck className="text-white" size={12} />}
        </button>
        <span
           className={`text-sm font-medium ${
            task.isComplete ? 'line-through text-gray-500' : 'text-gray-300'
          }`}
        >
          {task.name}
        </span>
      </div>
      <div className="flex items-center space-x-4">
        {/* <div
            className="flex items-center cursor-pointer"
          onClick={() => setIsEditingLaps(true)}
        >
          <FaClock className="text-teal-400 mr-1" size={14} />
          {isEditingLaps ? (
            <input
              type="number"
              min="1"
              value={newLaps}
              onChange={(e) => setNewLaps(parseInt(e.target.value) || 1)}
              onBlur={handleLapsUpdate}
              onKeyDown={(e) => e.key === 'Enter' && handleLapsUpdate()}
              className="w-12 bg-gray-700 text-white text-center rounded"
              autoFocus
            />
          ) : (
            <span className="text-gray-400">{`${task.currentLap || 0}/${
              task.laps
            }`}</span>
          )}
        </div> */}
   {/* Play/Pause Button */}

        <button
          onClick={() => !task.isComplete && onStart(task)}
          disabled={task.isComplete}
          className={`p-1 rounded-full ${
            activeTask?.id === task.id && timerState === 'running'
              ? 'bg-yellow-500 hover:bg-yellow-600'
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {activeTask?.id === task.id && timerState === 'running' ? <FaPause size={10} /> : <FaPlay size={10} />}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
        >
          <FaTrash  size={10} />
        </button>
      </div>
    </li>
  );
}

export default Task;
