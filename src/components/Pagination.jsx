import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

function Pagination({ currentPage, totalPages, onPageChange }) {
  
  if (totalPages <= 1) {
    return null;
  }
  
  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5; 
    
    items.push(
      <BSPagination.Item 
        key={1} 
        active={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        1
      </BSPagination.Item>
    );
    
    
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
    
    
    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
    }
    
    
    if (startPage > 2) {
      items.push(<BSPagination.Ellipsis key="ellipsis1" className="d-none d-sm-block" />);
    }
    
    
    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <BSPagination.Item
          key={page}
          active={currentPage === page}
          onClick={() => onPageChange(page)}
          className="d-none d-sm-block"
        >
          {page}
        </BSPagination.Item>
      );
    }
    
    
    if (endPage < totalPages - 1) {
      items.push(<BSPagination.Ellipsis key="ellipsis2" className="d-none d-sm-block" />);
    }
    
    
    if (totalPages > 1) {
      items.push(
        <BSPagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className={currentPage !== totalPages ? "d-none d-sm-block" : ""}
        >
          {totalPages}
        </BSPagination.Item>
      );
    }
    
    return items;
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <BSPagination>
        <BSPagination.First 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(1)} 
          className="pagination-first"
        />
        <BSPagination.Prev 
          disabled={currentPage === 1} 
          onClick={() => onPageChange(currentPage - 1)}
          className="pagination-prev"
        />
        
        {renderPaginationItems()}
        
        <BSPagination.Next 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
          className="pagination-next"
        />
        <BSPagination.Last 
          disabled={currentPage === totalPages} 
          onClick={() => onPageChange(totalPages)}
          className="pagination-last"
        />
      </BSPagination>
    </div>
  );
}

export default Pagination;