import {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useLocation } from 'react-router';
import { NavLink } from "react-router-dom";
import logoWhite from '../../assets/logo white.svg';
import logoBlack from '../../assets/logo black.svg';
import openMenu from "../../assets/black menu.svg";
import closeMenu from "../../assets/white menu.svg";
import './navbar.css';

const NavBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHomeOrOrders = location.pathname === '/' || location.pathname.startsWith('/Order');
  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
        <div className=' flex nav-style'>
        <Navbar  className='' data-bs-theme="dark" >
          <Container className='flex nav-container' >
            <Navbar.Brand 
            className='centered-logo'
            href='/'
             >
                <img
                  alt=""
                  src={logoWhite} 
                  width="30%"
                  height="%"
                  className="logoWhite"
                />
                <img
                  alt=""
                  src={logoBlack} 
                  width="80%"
                  height="%"
                  className="logoBlack"
                />
              </Navbar.Brand>
              <Nav className='nav-list d-none d-md-flex'>
                {isHomeOrOrders && (
                    <>
                        <Nav.Link className={location.pathname === "/" ? 'active-link' : ''}>
                          <NavLink style={{textDecoration:"none"}} to="/">Home</NavLink>
                        </Nav.Link>
                        <NavDropdown title="My Order" className={location.pathname.startsWith('/Order') ? 'active-link' : ''}>
                            <NavDropdown.Item className={location.pathname === "/Order" ? 'active-link' : ''}>
                              <NavLink style={{textDecoration:"none"}} to="/Order">New Order</NavLink>
                            </NavDropdown.Item>
                        </NavDropdown>
                    </>
                )}
              </Nav>
              <div className={`sidenav ${isOpen ? 'open' : ''}`}>
              <button className="closebtn" onClick={toggleSidenav} style={{background: 'none', border: 'none', padding: 0, margin: 0, outline: 'none', cursor: 'pointer'}}>
                <img src={isOpen ? closeMenu : openMenu} style={{width:"30px", height:"30px"}} alt="toggle icon" />
              </button>
              {isHomeOrOrders && (
                <>
                  <NavLink style={{textDecoration:"none"}} to="/" className={location.pathname === '/' ? 'active-link' : ''}>Home</NavLink>
                  <NavLink to="/Order" className={location.pathname === '/Order' ? 'active-link' : ''}>New Order</NavLink>
                </>
              )}
            </div>
          </Container>
        </Navbar>
        </div>
    )
}
export default NavBar