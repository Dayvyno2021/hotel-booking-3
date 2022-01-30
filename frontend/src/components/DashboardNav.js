import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import {useLocation} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const DashboardNav = () => {

  const location = useLocation()
  const pathname = location.pathname

  return (
    <Container fluid className=''>
      <Nav className='d-flex justify-content-center'>

        <Nav.Item>
          <LinkContainer to={'/dashboard'} className=''>
            <Nav.Link className={`${pathname==='/dashboard' && 'rounded border-primary border border-2'}`} >Your Bookings</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to={'/dashboard/seller'} className=''>
            <Nav.Link className={`${pathname==='/dashboard/seller' && 'rounded border-primary border border-2'}`}>Your Hotels</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </Container>
  )
}

export default DashboardNav
