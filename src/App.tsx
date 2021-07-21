import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Game } from './game/Game';
import { Reset } from './game/Reset';

function App() {
  const nav = useHistory();
  return (
    <>
      <Navbar expand={false} bg="light" collapseOnSelect>
        <Container className="navbar-container">
          <Navbar.Brand>Capriwhist</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav onSelect={href => { href !== null && nav.push(href) }}>
              <Nav.Link eventKey="/">Gå til spillet</Nav.Link>
              <Nav.Link eventKey="/reset">Nullstill spillet</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="game-container">
        <div className="game">
          <Switch>
            <Route path="/reset">
              <Reset />
            </Route>
            <Route path={["/", "/game"]}>
              <Game />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  )
}

export default App;
