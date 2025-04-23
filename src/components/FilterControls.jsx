import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { useTasks } from '../contexts/TaskContext';

function FilterControls({ currentFilter, setFilter }) {
  const { paginate } = useTasks(); // Get paginate function from context
  
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Completed', value: 'completed' },
    { label: 'Pending', value: 'pending' },
  ];

  // Handle filter change and reset pagination
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
    paginate(1); // Reset to page 1 when filter changes
  };

  return (
    <ButtonGroup size="sm" className="filter-controls">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? 'primary' : 'outline-primary'}
          onClick={() => handleFilterChange(filter.value)}
          className="px-3"
        >
          {filter.label}
        </Button>
      ))}
    </ButtonGroup>
  );
}

export default FilterControls;