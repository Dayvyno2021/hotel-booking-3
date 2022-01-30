import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Container, Card, Col, Row } from 'react-bootstrap'
import {protectedLoginAction} from '../actions/userActions'

const ConnectNav = () => {

  const dispatch = useDispatch()

  const protectedLoginReducer = useSelector(state => state.protectedLoginReducer)
  const {user} = protectedLoginReducer
 
  useEffect(() => {
    dispatch(protectedLoginAction())
  }, [dispatch]);
  

  return (
    <Container fluid >
      <Row className='d-flex justify-content-around'>
        <Col sm={5} md={4} lg={3} xl={2}>
        <Card>
          <Row className='d-flex justify-content-center mt-2'> 
            <Col sm={5} >
              <Card.Title className='d-flex justify-content-center'>  
                {
                  user && user._id && (
                <h3 className='avatar-dayve d-flex justify-content-center align-items-center'>
                  {user.name[0]}
                </h3>
                  )
                } 
              </Card.Title>
            </Col>         
          </Row>
          <Card.Body className='d-flex justify-content-center flex-column' >    
            <Card.Title className='d-flex justify-content-center' >{user && user.name && user.name} </Card.Title>
            <Card.Text className='d-flex justify-content-center' >
              {`Joined ${user && user.createdAt && user.createdAt.substring(0, 10)}`}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
        {
          user && user.seller && user.stripe_seller && user.stripe_seller.charges_enabled && user.seller && 
          
        <Col sm={5} md={4} lg={3} xl={2}>
          <h5 style={{textDecoration: 'underline'}} className='text-light'>
            Pending Balance
          </h5>
          <h5 className={`badge ${ user && user.stripe_seller && user.stripe_seller.balance>2? 'bg-success' : 'bg-danger'}`}>
            {`NGN ${Number(user && user.stripe_seller && user.stripe_seller.balance? user.stripe_seller.balance:0).toLocaleString()}`} 
          </h5>
        </Col>
        }
      </Row>
      
    </Container>
  )
}

export default ConnectNav