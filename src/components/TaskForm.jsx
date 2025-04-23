import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useTasks } from '../contexts/TaskContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function TaskForm() {
  const { addTask } = useTasks(); 
  const [taskInput, setTaskInput] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedInput = taskInput.trim();
    
    if (trimmedInput === '') {
      setIsInvalid(true);
      return;
    }
    
    addTask(trimmedInput); 
    setTaskInput('');
    setIsInvalid(false);
  };

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
    if (isInvalid && event.target.value.trim() !== '') {
      setIsInvalid(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Add a new task..."
          value={taskInput}
          onChange={handleInputChange}
          aria-label="Add a new task"
          isInvalid={isInvalid}
          className="shadow-sm"
        />
        <Button 
          variant="primary" 
          type="submit"
          className="d-flex align-items-center"
        >
          <FontAwesomeIcon icon={faPlus} className="me-1" /> Add
        </Button>
        {isInvalid && (
          <Form.Control.Feedback type="invalid">
            Task name cannot be empty.
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form>
  );
}

export default TaskForm;