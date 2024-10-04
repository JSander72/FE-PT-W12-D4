import React from 'react'
import { NavLink } from 'react-router-dom'
import {Nav, Navbar} from 'react-bootstrap'

const NavigationBar = () => {
  return (
    // expand = breakpoint (ie. col-med)
    <Navbar bg='light' expand="md">
      <Navbar.Brand href='/'>E-Commerce App</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' /> 

      {/* Contains all of our collapsable menu items */}
      <Navbar.Collapse>
        <Nav className='mr-auto'>

          {/* Nav.Link acts like a normal link (or a tag) */}
          {/* as={NavLink} applies bootstrap styling */}
          <Nav.Link as={NavLink} to="/" activeClassName="active">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/customers" activeClassName="active">Customers</Nav.Link>
          <Nav.Link as={NavLink} to="/add-customers" activeClassName="active">Add Customer</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar