import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light py-3 mt-auto border-top">
      <Container className="text-center">
        <p className="mb-0">
          © {currentYear} Task Manager Pro. Made with <FontAwesomeIcon icon={faHeart} className="text-danger mx-1" /> by ClassMethod
        </p>
      </Container>
    </footer>
  );
}

export default Footer;