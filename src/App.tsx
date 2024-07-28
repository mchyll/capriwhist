import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const nav = useNavigate();
  return (
    <>
      <Navbar expand={false} bg="light" collapseOnSelect>
        <Container className="navbar-container">
          <Navbar.Brand>Capriwhist</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav
              onSelect={(href) => {
                href !== null && nav(href);
              }}
            >
              <Nav.Link eventKey="/">Gå til spillet</Nav.Link>
              <Nav.Link eventKey="/reset">Nullstill spillet</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="game-container">
        <div className="game">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
