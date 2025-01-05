import React from 'react';
import Task from './Task';

function TaskList({
  tasks,
  onDelete,
  onComplete,
  onStart,
  onUpdateLaps,
  activeTask,
  timerState,
}) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onComplete={onComplete}
          onStart={onStart}
          onUpdateLaps={onUpdateLaps} 
          activeTask={activeTask}
          timerState={timerState}
        />
      ))}
    </ul>
  );
}

export default TaskList;
