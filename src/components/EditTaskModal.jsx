import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function EditTaskModal({ show, handleClose, task, handleSave }) {
  
  const [editedTaskName, setEditedTaskName] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  useEffect(() => {
    if (task) {
      setEditedTaskName(task.name);
      setIsInvalid(false);
    } else {
      setEditedTaskName('');
    }
  }, [task]); 

  const onSaveChanges = () => {
    if (editedTaskName.trim() === '') {
        setIsInvalid(true);
        return;
    }
    handleSave(task.id, editedTaskName);
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      onSaveChanges();
    }
  };
  
  const handleChange = (e) => {
    setEditedTaskName(e.target.value);
    if (e.target.value.trim() !== '') {
      setIsInvalid(false);
    }
  };
  
  if (!task) {
    return null;
  }
  
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => e.preventDefault()}> 
          <Form.Group controlId="editTaskForm.TaskName">
            <Form.Label>Task name</Form.Label>
            <Form.Control
              type="text"
              value={editedTaskName}
              onChange={handleChange}
              onKeyDown={handleKeyDown} 
              autoFocus
              isInvalid={isInvalid}
              className="shadow-sm"
            />
            {isInvalid && (
              <Form.Control.Feedback type="invalid">
                Task name cannot be empty.
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} className="me-1" /> Cancel
        </Button>
        <Button variant="primary" onClick={onSaveChanges}>
          <FontAwesomeIcon icon={faSave} className="me-1" /> Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;