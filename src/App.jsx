import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterControls from './components/FilterControls'; 
import EditTaskModal from './components/EditTaskModal';
import TopActionsDropdown from './components/TopActionsDropdown';
import Header from './components/Header';
import Footer from './components/Footer';
import Pagination from './components/Pagination';
import { useTasks } from './contexts/TaskContext';
import './App.css';

function App() {
  const { 
    tasks, 
    updateTask, 
    currentPage,
    tasksPerPage,
    paginate,
    changeTasksPerPage,
    getPaginatedTasks,
    getTotalPages
  } = useTasks();
  const [filter, setFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Filter tasks based on the current filter
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'all':
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // Get paginated tasks
  const paginatedTasks = useMemo(() => {
    return getPaginatedTasks(filteredTasks);
  }, [filteredTasks, getPaginatedTasks, currentPage, tasksPerPage]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return getTotalPages(filteredTasks);
  }, [filteredTasks, getTotalPages, tasksPerPage]);
  
  const handleShowEditModal = (task) => {
    setTaskToEdit(task);
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTaskToEdit(null);
  };
  
  const handleSaveEdit = (id, newName) => {
    updateTask(id, newName);
    handleCloseEditModal();
  };
  
  const handleTasksPerPageChange = (e) => {
    changeTasksPerPage(Number(e.target.value));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      
      <Container fluid className="flex-grow-1 main-container">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={9} xl={8}>
            <h2 className="text-center mb-4">Manage Your Tasks</h2>
            
            <div className="task-card">
              <div className="py-4 px-4">
                <TaskForm />
              </div>
              
              <div className="py-3 px-4">
                <div className="d-lg-flex d-block justify-content-between align-items-center mb-4">
                    <FilterControls currentFilter={filter} setFilter={setFilter}  />

                    <TopActionsDropdown handleShowEditModal={handleShowEditModal}  />

                 
                </div>
                
                <div className="task-list-wrapper">
                  <TaskList 
                    tasks={paginatedTasks}
                    onEditTask={handleShowEditModal}
                  />
                  
                  {filteredTasks.length > 0 && (
                    <Pagination 
                      currentPage={currentPage} 
                      totalPages={totalPages} 
                      onPageChange={paginate} 
                    />
                  )}
                </div>
              </div>
              
              <div className="border-top py-3 px-4">
                <Row>
                  <Col xs={6} className="text-start d-flex align-items-center">
                    <span>Total: {filteredTasks.length} tasks</span>
                  </Col>
                  <Col xs={6} className="text-end d-flex justify-content-end align-items-center">
                    <span className="me-2">Tasks per page:</span>
                    <Form.Select 
                      size="sm" 
                      style={{ width: 'auto' }}
                      value={tasksPerPage}
                      onChange={handleTasksPerPageChange}
                      aria-label="Tasks per page"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </Form.Select>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      
      <Footer />
      
      <EditTaskModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        task={taskToEdit}
        handleSave={handleSaveEdit}
      />
    </div>
  );
}

export default App;