import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header className="bg-primary text-white py-3 mb-5">
      <Container className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faCheckSquare} className="me-2 text-white" size="lg" />
          <span className="fw-bold fs-4">Task Manager </span>
        </div>
        <div className='d-none d-lg-flex'>Organize your tasks efficiently</div>
      </Container>
    </header>
  );
}

export default Header;