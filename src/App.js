import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import GDPChart from './Components/GDPChart.js';
import Empleo from './Components/Empleo.js';
import DebtChart from './Components/DebtChart.js';
import TaxChart from './Components/TaxChart.js';
import ExportChart from './Components/ExportChart.js';
import ReserveChart from './Components/ReserveChart.js';
import SpendingChart from './Components/SpendingChart.js';
import InflationChart from './Components/InflationChart.js';
import GDPPerCapitaChart from './Components/GDPPerCapitaChart.js';
import EducationExpenditureChart from './Components/EducationExpenditureChart.js';
import LaborForceChart from './Components/LaborForceChart.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Row, Card } from 'react-bootstrap';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('economia');

  const renderPage = () => {
    switch (currentPage) {
      case 'economia':
        return (
          <Container fluid>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <GDPChart />
                </Card.Body>
              </Card>
            </Row>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <GDPPerCapitaChart />
                </Card.Body>
              </Card>
            </Row>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <InflationChart />
                </Card.Body>
              </Card>
            </Row>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <SpendingChart />
                </Card.Body>
              </Card>
            </Row>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <DebtChart />
                </Card.Body>
              </Card>
            </Row>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <ExportChart />
                </Card.Body>
              </Card>
            </Row>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <ReserveChart />
                </Card.Body>
              </Card>
            </Row>

            <Row className="mb-4">
              <Card className="mb-4">
                <Card.Body>
                  <TaxChart />
                </Card.Body>
              </Card>
            </Row>
          </Container>
        );

      case 'empleo':

        return <Container fluid>
          
          <Row className="mb-4">
            <Card className="mb-4">
              <Card.Body>
                <Empleo />
              </Card.Body>
            </Card>
          </Row>
          
          <Row className="mb-4">
            <Card className="mb-4">
              <Card.Body>
                <LaborForceChart />
              </Card.Body>
            </Card>
          </Row>

        </Container>;

      case 'educacion':

        return <Container fluid>
          <Row className="mb-4">
            <Card className="mb-4">
              <Card.Body>
                <EducationExpenditureChart />
              </Card.Body>
            </Card>
          </Row>
        </Container>;

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
              <Nav.Link href="#" onClick={() => setCurrentPage('educacion')}>Educación</Nav.Link>
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
