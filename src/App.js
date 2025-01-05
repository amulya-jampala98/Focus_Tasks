import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Timer from './Timer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [activeTask, setActiveTask] = useState(null); // Tracks the active task
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Timer countdown for the active task
  const [timerState, setTimerState] = useState('idle'); // 'idle', 'running', 'paused'
  const [focusedTimes, setFocusedTimes] = useState({}); // Track focus time for each task

  // Add a new task
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          name: newTask,
          laps: 1, // Default to 1 lap
          isComplete: false,
        },
      ]);
      setNewTask('');
    }
  };

  // Delete a task
  const handleTaskDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (activeTask && activeTask.id === id) {
      setActiveTask(null); // Reset active task if it's deleted
      setTimeLeft(25 * 60); // Reset timer
      setTimerState('idle');
    }
    setFocusedTimes((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  

  // Mark a task as complete
  const handleTaskComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
    if (activeTask && activeTask.id === id) {
      setActiveTask(null); // Reset active task if uncompleted
      setTimeLeft(25 * 60);
      setTimerState('idle');
    }
  };

  // Start a task
  const handleStartTask = (task) => {
    const totalMinutes = task.laps * 25; // Total time for all laps
    setActiveTask(task);
    setTimeLeft(totalMinutes * 60); // Set timer to the total time
    setTimerState('running'); // Start the timer immediately
  };

  // Timer control handlers
  const handleTimerPause = () => setTimerState('paused');
  const handleTimerStop = () => {
    if (activeTask) {
      const elapsedTime = parseInt(activeTask.laps * 25 * 60 - timeLeft) || 0; // Calculate elapsed time
      setFocusedTimes((prev) => ({
        ...prev,
        [activeTask.id]: (prev[activeTask.id] || 0) + elapsedTime, // Add elapsed time to existing time
      }));
    }
    setTimerState('paused');
    setActiveTask(null); // Stop and reset active task
    setTimeLeft(25 * 60);
  };

  // Timer countdown logic
  useEffect(() => {
    let timer;
    if (timerState === 'running' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    if (timeLeft === 0) {
      clearInterval(timer);
      setTimerState('idle');
    }
    return () => clearInterval(timer);
  }, [timerState, timeLeft]);

  return (
    <div  className="min-h-screen flex flex-col lg:flex-row text-white bg-cover bg-center"
    style={{ backgroundImage: "url('/image.png')" }}
    >
      {/* Left Section */}
      <div className="lg:w-2/3 flex flex-col items-center justify-center px-4 py-8">
        <h1 className="text-3xl font-bold mb-2 -mt-6">Focus Timer</h1>
        {/* Active Task Display */}
        <div className="mb-4 w-full flex justify-center">
  {activeTask ? (
    <div className="flex items-center justify-between bg-white text-gray-800 shadow-md rounded-lg p-4 w-full max-w-md">
    <div className="flex items-center space-x-2">
      <span className="text-xl font-semibold">{activeTask.name}</span>
      <span className="text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </span>
    </div>
    <button
      onClick={() => {
        setActiveTask(null);
        setTimerState('idle');
        setTimeLeft(25 * 60);
      }}
      className="text-gray-400 hover:text-gray-700"
    >
      &times;
    </button>
  </div>
  
  ) : (
    <div className="bg-gray-800 text-gray-400 shadow-md rounded-lg p-4 w-full max-w-md text-center">
  No task selected
</div>

  )}
</div>

        {/* Timer Display */}
        <Timer timeLeft={timeLeft} duration={activeTask?.laps * 25 || 25} />
       
        {/* Timer Controls */}
        {activeTask && (
        <div className="mt-4">
          {timerState === 'running' && (
            <button
              onClick={handleTimerPause}
              className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-400"
            >
              Pause
            </button>
          )}
          {timerState === 'paused' && (
    <button
      onClick={() => setTimerState('running')}
      className="px-4 py-2 bg-green-500 rounded hover:bg-green-400"
    >
      Continue
    </button>
  )}
          {(timerState === 'running' || timerState === 'paused') && (
            <button
              onClick={handleTimerStop}
              className="ml-2 px-4 py-2 bg-red-500 rounded hover:bg-red-400"
            >
              Stop
            </button>
          )}
          
        </div>
        )}
      </div>

      {/* Right Section */}
      <div
    className="lg:w-1/3 h-screen px-4 py-8 space-y-8 overflow-y-auto"
    style={{ backdropFilter: "blur(8px)" }} 
  >

        {/* Add Task Section */}
        <div className="bg-gray-800 p-4 rounded-md shadow-md">
  <h2 className="text-lg font-medium text-gray-300 mb-2">Add Task 📝</h2>
  <form onSubmit={handleTaskSubmit} className="space-y-2">
    <input
      type="text"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="Enter your task"
      className="w-full p-2 rounded-md bg-gray-700 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-400"
    />
    <button
      type="submit"
      className="w-full py-2 bg-teal-500 text-sm font-medium text-white rounded-md hover:bg-teal-600 transition"
    >
      Add
    </button>
  </form>
</div>



<div className="bg-gray-800 p-4 rounded-md shadow-md h-64 overflow-y-auto">
  <h2 className="text-lg font-medium text-gray-300 mb-2">Tasks 🗒️</h2>
  {tasks.length === 0 ? (
    <p className="text-gray-500 italic text-center">No tasks available. Add tasks above!</p>
  ) : (
    <TaskList
      tasks={tasks}
      onDelete={handleTaskDelete}
      onComplete={handleTaskComplete}
      onStart={handleStartTask}
      activeTask={activeTask}
      timerState={timerState}
    />
  )}
</div>


<div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl shadow-lg h-64 overflow-y-auto">
<h2 className="text-xl font-semibold text-white mb-4">Focused Time ⌛</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {Object.entries(focusedTimes).map(([taskId, time]) => {
      const task = tasks.find((t) => t.id === parseInt(taskId));
      return (
        <div
          key={taskId}
          className="bg-white text-black rounded-md p-3 shadow-md flex items-center justify-between hover:shadow-lg transition-all duration-300"
          style={{ maxHeight: '4rem' }}
        >
          <div className="flex flex-col space-y-1 w-full">
            <h3
              className="text-sm font-medium truncate"
              style={{ whiteSpace: 'normal', wordWrap: 'break-word', maxWidth: '100%' }}
            >
              {task?.name || 'Unknown Task'}
            </h3>
            <p className="text-xs text-gray-600">
              {Math.floor(time / 60)}:
              {(time % 60).toString().padStart(2, '0')} minutes
            </p>
          </div>
          <span className="text-gray-600 text-sm">⏱️</span>
        </div>
      );
    })}
    {Object.keys(focusedTimes).length === 0 && (
      <p className="text-gray-500 italic text-center">No data available yet.</p>
    )}
  </div>
</div>


      </div>
    </div>
  );
}

export default App;
