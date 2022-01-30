import React, {useState} from 'react'
import { Navbar, Container, NavDropdown, Nav,} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import ProfileModal from './ProfileModal'

const Header = () => {

  const [show, setShow] = useState(false)
  const handleClose = () =>setShow(!show)

  const dispatch = useDispatch()
  const userRegisterReducer = useSelector(state => state.userRegisterReducer)
  const {user} = userRegisterReducer

  
  return (
    <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect >
      <Container>
          <LinkContainer to={'/'} className='me-5'>
            <Navbar.Brand>  
              <span className="material-icons" style={{position: 'relative', top: '4px' }}>
                home
              </span>
              <span>
                Home
              </span> 
            </Navbar.Brand>
          </LinkContainer>
          {
            user && 
            (
            <LinkContainer to={'/dashboard'} className='mx-5'>
              <Navbar.Brand>
                Dashbord
              </Navbar.Brand>
            </LinkContainer>
            )
          }
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav>
              {
                !user? (
                  <>
                  <LinkContainer to='/login'>
                    <Nav.Link className='' >Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link className=''>Register</Nav.Link> 
                  </LinkContainer>
                  </>
                ): (
                  <>
                    <Nav.Link onClick={()=>dispatch(logout())} >Logout</Nav.Link>
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={handleClose}  >profile</NavDropdown.Item>
         
                      {
                        show && 
                        <ProfileModal show={show} handleClose={handleClose} />
                      }
                    </NavDropdown>
                  </>
                )
              }
            </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar> 
  )
}

export default Header
