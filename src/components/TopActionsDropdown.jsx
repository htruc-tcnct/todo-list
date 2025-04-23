import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTasks } from '../contexts/TaskContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function TopActionsDropdown({ handleShowEditModal }) {
  const {
    tasks,
    selectedTaskIds,
    deleteTask,
    deleteSelectedTasks,
  } = useTasks();

  const selectedCount = selectedTaskIds.size;

  const handleEdit = () => {
    if (selectedCount !== 1) return;
    const selectedId = Array.from(selectedTaskIds)[0];
    const taskToEdit = tasks.find(task => task.id === selectedId);
    if (taskToEdit) {
      handleShowEditModal(taskToEdit);
    }
  };

  const handleDelete = () => {
    if (selectedCount === 1) {
      const selectedId = Array.from(selectedTaskIds)[0];
      if (window.confirm(`Are you sure you want to delete this task?`)) {
        deleteTask(selectedId);
      }
    } else if (selectedCount > 1) {
      deleteSelectedTasks();
    }
  };

  const getDropdownTitle = () => {
    if (selectedCount === 0) {
      return "Actions";
    }
    return `${selectedCount} selected`;
  };

  return (
    <Dropdown align="lg-end" className='mt-2 mt-lg-0' >
      <Dropdown.Toggle
        variant="outline-secondary"
        size="sm"
        disabled={selectedCount === 0}
        className="d-lg-flex align-items-center"
      >
        <FontAwesomeIcon icon={faCog} className="me-2" />
        {getDropdownTitle()}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {selectedCount === 1 && (
          <Dropdown.Item onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} className="me-2" />
            Edit
          </Dropdown.Item>
        )}
        {selectedCount > 0 && (
          <Dropdown.Item onClick={handleDelete} className="text-danger">
            <FontAwesomeIcon icon={faTrash} className="me-2" />
            Delete
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default TopActionsDropdown;