import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GDPChart from './GDPChart.js';
import Empleo from './Empleo.js';
import DebtChart from './DebtChart.js';
import TaxChart from './TaxChart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('economia');

  const renderPage = () => {
    switch (currentPage) {
      case 'economia':
        return <div>
          <DebtChart />
          <GDPChart />
          <TaxChart />
        </div>;
      case 'empleo':
        return <Empleo />;
      default:
        return <GDPChart />;
    }
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#">Datos España</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" onClick={() => setCurrentPage('economia')}>Economía y crecimiento</Nav.Link>
              <Nav.Link href="#" onClick={() => setCurrentPage('empleo')}>Empleo</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="content-container d-flex align-items-center justify-content-center">
        <div className="page-content text-center">
          {renderPage()}
        </div>
      </Container>
    </Router>
  );
}

export default App;
