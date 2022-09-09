import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import uscLogo from '../common/uscLogo.json';


const Header = () => {
  return (
    <Navbar expand="lg" className='usc-header'>
      {/* <Container> */}
        <Navbar.Brand href="#home">
          <img
          alt=""
          src={uscLogo.logoURL}
          width="200"
          height="50"
          className="d-inline-block align-top"
        />
          {window.bundle.common.appTitle}
        </Navbar.Brand>
      {/* </Container> */}
    </Navbar>
  );
}

export default Header;