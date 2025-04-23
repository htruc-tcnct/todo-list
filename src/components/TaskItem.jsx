import React from 'react';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { useTasks } from '../contexts/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function TaskItem({ task, onEditTask }) {
  const {
    selectedTaskIds,
    handleToggleSelection,
    toggleTaskCompletion,
    deleteTask
  } = useTasks();

  const isSelected = selectedTaskIds.has(task.id);
  const isCompleted = task.completed;

  const handleItemClick = () => {
    handleToggleSelection(task.id);
  };

  const handleCompleteChange = (e) => {
    e.stopPropagation(); 
    toggleTaskCompletion(task.id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEditTask(task);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${task.name}"?`)) {
      deleteTask(task.id);
    }
  };

  const taskNameStyle = {
    textDecoration: isCompleted ? 'line-through' : 'none',
    opacity: isCompleted ? 0.6 : 1,
    flexGrow: 1, 
    marginRight: '0.75rem', 
    wordBreak: 'break-word',
    transition: 'all 0.3s ease',
  };

  const itemStyle = {
    backgroundColor: isSelected ? '#e7f1ff' : 'transparent',
    transition: 'background-color 0.2s ease-in-out',
    cursor: 'pointer', 
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
  };

  return (
    <ListGroup.Item
      style={itemStyle}
      onClick={handleItemClick}
      className="d-flex justify-content-between align-items-center border-bottom" 
    >
      <div className="d-flex align-items-center flex-grow-1">
        <Form.Check
          type="checkbox"
          checked={isCompleted}
          onChange={handleCompleteChange} 
          onClick={(e) => e.stopPropagation()} 
          aria-label={`Mark ${task.name} as ${isCompleted ? 'incomplete' : 'complete'}`}
          className="me-2"
        />
        <span style={taskNameStyle}>
          {task.name}
        </span>
      </div>

      <div className="d-flex">
        <Button 
          variant="outline-primary" 
          size="sm" 
          className="me-2" 
          onClick={handleEdit}
          aria-label={`Edit task: ${task.name}`}
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button 
          variant="outline-danger" 
          size="sm" 
          onClick={handleDelete}
          aria-label={`Delete task: ${task.name}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </ListGroup.Item>
  );
}

export default TaskItem;