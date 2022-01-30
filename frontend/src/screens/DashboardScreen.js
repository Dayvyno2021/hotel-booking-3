import React, {useEffect} from 'react'
import {Button, Col, Container, Row} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import Loader from '../components/Loader'
import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import { Link } from 'react-router-dom'
import { protectedLoginAction } from '../actions/userActions'
import {userOrderAction} from '../actions/sessionAction'
import { MessageDanger } from '../components/Message'
import BookingCard from '../components/BookingCard'

const DashboardScreen = () => {

  const dispatch = useDispatch()

  // const userRegisterReducer  = useSelector(state => state.userRegisterReducer )
  // const {user:userRG} = userRegisterReducer

  const protectedLoginReducer  = useSelector(state => state.protectedLoginReducer )
  const {loading, user, error} = protectedLoginReducer 
  
  const userOrderReducer  = useSelector(state => state.userOrderReducer )
  const {loading: loadingORD, orders, error: errorORD} = userOrderReducer 

  useEffect(() => {
      dispatch(protectedLoginAction())
      dispatch(userOrderAction())
  }, [dispatch]);
  
  return (   
    <>
      {(loading || loadingORD ) && <Loader/> }
      {error && <MessageDanger>{error} </MessageDanger>}
      {(errorORD || error) && <MessageDanger> {errorORD || error} </MessageDanger>}
      {user && user._id && 
      <>
        <Container fluid className='bg-secondary p-3'>
          <ConnectNav />
        </Container>
        
        <Container fluid className='p-4'>
          <DashboardNav />
        </Container>

        <Container fluid className='p-3 '>
          <Row >
            <Col xs={12} sm={8} md={9} className='hotel-booking'>
              <h2>
                Your Bookings
              </h2>
            </Col>
            <Col xs={12} sm={4} md={3} className='hotel-booking hotel-booking-2'>
              <Link to={'/'}>
                <Button className='buttonBooking'>
                  Browse Hotels
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className='pt-3'>
            {
              orders.map(order=>(
                <BookingCard h={order.hotel} session={order.session} orderedBy={order.orderedBy} key={order._id} />
              ))
            }
          </Row>
          
        </Container>
      </> }

    </>
  )
}

export default DashboardScreen
