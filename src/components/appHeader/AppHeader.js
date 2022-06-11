import {Container, Navbar, Nav} from 'react-bootstrap'
import { NavLink } from "react-router-dom";

const AppHeader = () => {
    
    const classLink = "nav-link";

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="/"><span>Marvel</span> information portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <NavLink to="/" className={classLink}>Characters</NavLink>
                        <NavLink to="/comics" className={classLink}>Comics</NavLink>
                    </Nav>
                </Navbar.Collapse>
                
            </Container>
        </Navbar>
    );
    
}


export default AppHeader;