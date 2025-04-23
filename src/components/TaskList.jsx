import React from 'react';
import { ListGroup } from 'react-bootstrap';
import TaskItem from './TaskItem';
import { useTasks } from '../contexts/TaskContext';

function TaskList({ tasks, onEditTask }) {
  if (tasks.length === 0) {
    return <p className="text-center text-muted mt-3">No tasks to display.</p>;
  }
  const { handleSelectAllToggle } = useTasks();

  return (
    <div className="task-list-container" style={{ animation: 'fadeIn 0.3s ease-in' }}>
      <ListGroup>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEditTask={onEditTask}
          />
        ))}
      </ListGroup>
    </div>
  );
}

export default TaskList;