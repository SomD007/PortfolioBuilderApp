import {useContext} from 'react';
import {AuthContext} from "../context/AuthContext.jsx";
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



// Inside your Nav


function NavigationBar() {

    const {token, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    //Boolean Coercion: The !!token syntax effectively converts a truthy value (the token string) into true 
    // and a falsy value (null, undefined, or an empty string) into false.
    const isLoggedIn = !!token;

    const handleLogoutClick = () => {
        logout(); // This calls the function in AuthContext.jsx
        navigate("/auth") //Send back to login page
    };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/builder">Create Portfolio</Nav.Link>
            
            <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item as={Link} to="/api-check">Automate Mails</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {
                isLoggedIn ? (
                    //If logged in Show logout
                    <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
                ) : (
                    //If not logged in thn show login
                    <Nav.Link as={Link} to="/auth">Login</Nav.Link>
                )
            }
            
            
            
            {/* <Nav.Link as={Link} to="/auth">Login</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;