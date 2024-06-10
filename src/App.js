import React, { useState, useEffect, useMemo } from 'react';
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
import { Navbar, Nav, Container, Row, Card, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('economia');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContent, setFilteredContent] = useState(null);

  const pagesContent = useMemo(() => ({
    'economia': [
      { component: <GDPChart />, title: 'PIB (US$ a precios actuales)' },
      { component: <GDPPerCapitaChart />, title: 'PIB per cápita, PPA' },
      { component: <InflationChart />, title: 'Inflación, precios al consumidor (% anual)' },
      { component: <SpendingChart />, title: 'Gasto (% del PIB)' },
      { component: <DebtChart />, title: 'Deuda del Gobierno Central (% del PIB)' },
      { component: <ExportChart />, title: 'Exportaciones de bienes y servicios (% del PIB)' },
      { component: <ReserveChart />, title: 'Total de reservas (incluye oro, US$ a precios actuales)' },
      { component: <TaxChart />, title: 'Impuestos netos sobre productos (US$ a precios actuales)' }
    ],
    'empleo': [
      { component: <Empleo />, title: 'Desempleo, total (% de la fuerza laboral total) (estimación modelada de la OIT)' },
      { component: <LaborForceChart />, title: 'Fuerza laboral, total' }
    ],
    'educacion': [
      { component: <EducationExpenditureChart />, title: 'Gasto público en educación, total (% del gasto del gobierno)' }
    ]
  }), []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredContent(null);
      return;
    }

    const filtered = Object.keys(pagesContent).reduce((acc, key) => {
      const content = pagesContent[key].filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (content.length > 0) acc[key] = content;
      return acc;
    }, {});

    setFilteredContent(filtered);
  }, [searchTerm, pagesContent]);

  const renderContent = () => {
    const content = filteredContent || { [currentPage]: pagesContent[currentPage] };

    return (
      <Container fluid>
        {Object.keys(content).map((pageKey) => (
          Array.isArray(content[pageKey]) && content[pageKey].map((item, index) => (
            <Row className="mb-4" key={index}>
              <Card className="mb-4">
                <Card.Body>
                  {item.component}
                </Card.Body>
              </Card>
            </Row>
          ))
        ))}
      </Container>
    );
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
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Buscar"
                className="me-2"
                aria-label="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="content-container d-flex align-items-center justify-content-center">
        <div className="page-content text-center">
          {renderContent()}
        </div>
      </Container>
    </Router>
  );
}

export default App;
