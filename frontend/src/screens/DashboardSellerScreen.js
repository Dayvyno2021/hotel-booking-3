import React, {useEffect} from 'react'
import {Button, Col, Container, Row} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
// import {Link} from 'react-router-dom'
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'
import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import Connected from '../components/Connected'
import NotConnected from '../components/NotConnected'
import {sellerHotelsAction} from '../actions/hotelActions'
import SmallCard from '../components/SmallCard'
import { protectedLoginAction } from '../actions/userActions'


const DashboardSellerScreen = () => {

  const dispatch = useDispatch()

  const protectedLoginReducer  = useSelector(state => state.protectedLoginReducer )
  const {loading, user, error} = protectedLoginReducer

  const sellerHotelsReducer = useSelector(state=>state.sellerHotelsReducer)

  const {loading: loadingSH, sellerHotels, error: errorSH} = sellerHotelsReducer

  useEffect(() => {

    dispatch(sellerHotelsAction())
    dispatch(protectedLoginAction())

  }, [dispatch]);
  

  return (   
    <>
      {loading && <Loader/> }
      {error && <MessageDanger> {error} </MessageDanger>}
      {user && 
      <>
        <Container fluid className='bg-secondary p-3'>
          <ConnectNav />
        </Container>
        
        <Container fluid className='p-4'>
          <DashboardNav />
        </Container>

        {
          user && user.seller && user._id && user.stripe_seller && user.stripe_seller.charges_enabled===true && 
          (
            <div className='d-flex justify-content-center'>
              <Connected/> 
            </div> 
          )
        }
        {
          user && user.seller && user._id && user.stripe_seller && user.stripe_seller.charges_enabled===false && 
          (
          <div className='d-flex justify-content-center'>
            <NotConnected />
          </div>
          )
        }
        {
          !user.seller && 
          (
            <Button>Book Hotel</Button>
          )
        }
         
        {loadingSH && <Loader/>}
        {errorSH && <MessageDanger>{error} </MessageDanger>}

        <Row className='p-3 m-3'>
          {
            sellerHotels && sellerHotels.map((sh)=>(
              <Col key={sh._id} xs={12} className='my-2 border border-secondary border-2 rounded p-2 cdDayve bg-light'>
                <SmallCard hotel={sh} />
              </Col>
            ))
          }
        </Row>
        {/* {console.log(user && user.stripe_seller)}
        <h1>False:{JSON.stringify(user && user.seller && user._id && user.stripe_seller && user.stripe_seller.charges_enabled===false)} </h1> */}

      </> }

    </>
  )
}

export default DashboardSellerScreen