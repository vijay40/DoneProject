import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const Topbar = () => {
  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Done</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/patient/register">Register Patient</Nav.Link>
          <Nav.Link href="/admin/login">Admin Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Topbar;
