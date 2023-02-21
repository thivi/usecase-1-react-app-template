// import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import './App.scss';
import { Nav, Navbar, Container }  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Catalog from './components/Catalog/Catalog.js';
import MyCart from './components/MyCart/Cart.js';
import Admin from './components/Admin/Admin.js';
import { useAuthContext } from "@asgardeo/auth-react";

// Component to render the login/signup/logout menu
const RightLoginSignupMenu = () => {

  const { signIn, state, getBasicUserInfo } = useAuthContext();
  const [ userInfo, setUserInfo ] = useState(null);
  // Based on Asgardeo SDK, set a variable like below to check and conditionally render the menu

  useEffect(() => {
    if (!state.isAuthenticated) {
      return;
    }

    getBasicUserInfo().then((response) => {
      setUserInfo(response);
    });
  }, [ state.isAuthenticated, getBasicUserInfo ]);

  // Host the menu content and return it at the end of the function
  let menu;

  // Conditionally render the following two links based on whether the user is logged in or not
  if (state.isAuthenticated) {
    menu =  <>
      <Nav>
        <Nav.Link href="#deets">Logout</Nav.Link>
        <Nav.Link href="#deets"><FontAwesomeIcon icon={ faUser } />{ userInfo?.username }</Nav.Link></Nav>
    </>
  } else {
    menu = <>
      <Nav>
        <Nav.Link onClick={ () => signIn() }>Login</Nav.Link>
        <Nav.Link href="#deets">Sign Up</Nav.Link>
      </Nav>
    </>
  }

  return menu;
}

// Component to render the navigation bar
const PetStoreNav = () => {
  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">PetStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Catalog</Nav.Link>
            <Nav.Link href="/mycart">My Cart</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <RightLoginSignupMenu />
      </Container>
    </Navbar>
    </>
  );
};

// Main app component
const App = () => {
  useEffect(() => {
    document.title = 'PetStore';
  }, []);
  return (
    <>
    <PetStoreNav />
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Catalog} />
        <Route path="/mycart" component={MyCart} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
