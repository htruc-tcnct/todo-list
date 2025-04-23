import React, { createContext, useState, useContext, useEffect, useMemo } from 'react'; 

const TaskContext = createContext();
const LOCAL_STORAGE_KEY = 'react-task-manager-tasks';

export function TaskProvider({ children }) {
  
  const [tasks, setTasks] = useState(() => {
    try {
      const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      
      return [];
    }
  });
  
  const [selectedTaskIds, setSelectedTaskIds] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5); // Default 5 tasks per page
  
  // Reset to page 1 when tasks list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [tasks.length]);
  
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
       
    }
  }, [tasks]); 
  
  const addTask = (taskName) => {
    const newTask = {
      id: Date.now().toString() + Math.random().toString(36).substring(2),
      name: taskName,
      completed: false,
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const toggleTaskCompletion = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setSelectedTaskIds(prevSelected => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(id);
        return newSelected;
    });
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    setSelectedTaskIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      newSelected.delete(id);
      return newSelected;
    });
  };

  const updateTask = (id, newName) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
     setSelectedTaskIds(prevSelected => {
        const newSelected = new Set(prevSelected);
        newSelected.delete(id);
        return newSelected;
    });
  };

  const handleToggleSelection = (id) => {
    setSelectedTaskIds(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const deleteSelectedTasks = () => {
     if (selectedTaskIds.size === 0) return;
     if (window.confirm(`Bạn có chắc chắn muốn xóa ${selectedTaskIds.size} công việc đã chọn không?`)) {
        setTasks(prevTasks =>
            prevTasks.filter(task => !selectedTaskIds.has(task.id))
        );
        setSelectedTaskIds(new Set());
     }
  };

  const handleSelectAllToggle = (visibleTaskIds) => {
      const allVisibleSelected = visibleTaskIds.length > 0 && visibleTaskIds.every(id => selectedTaskIds.has(id));

      setSelectedTaskIds(prevSelected => {
          const newSelected = new Set(prevSelected);
          if (allVisibleSelected) {
              
              visibleTaskIds.forEach(id => newSelected.delete(id));
          } else {
              
              visibleTaskIds.forEach(id => newSelected.add(id)); 
          }
          return newSelected;
      });
  };
  
  // Pagination functions
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const changeTasksPerPage = (numTasks) => {
    setTasksPerPage(numTasks);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Get current tasks for the current page
  const getPaginatedTasks = (filteredTasks) => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  };

  // Calculate total pages for pagination
  const getTotalPages = (filteredTasks) => {
    return Math.ceil(filteredTasks.length / tasksPerPage);
  };

  const value = {
    tasks,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    updateTask,
    selectedTaskIds,
    handleToggleSelection,
    deleteSelectedTasks,
    handleSelectAllToggle,
    // Pagination related
    currentPage,
    tasksPerPage,
    paginate,
    changeTasksPerPage,
    getPaginatedTasks,
    getTotalPages
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}


export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}