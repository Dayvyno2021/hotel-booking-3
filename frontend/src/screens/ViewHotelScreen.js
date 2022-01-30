import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'
import { singleHotelAction } from '../actions/hotelActions';
import {Row, Col, ListGroup, Button} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { alreadyBookedAction, getSessionAction } from '../actions/sessionAction';

const ViewHotelScreen = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams();

  const singleHotelReducer = useSelector(state=>state.singleHotelReducer)
  const {loading, anHotel:h, error} = singleHotelReducer

  const userLoginReducer = useSelector(state=>state.userLoginReducer)
  const {user} = userLoginReducer
  
  const alreadyBookedReducer = useSelector(state=>state.alreadyBookedReducer)
  const {status} = alreadyBookedReducer

  useEffect(() => {
    dispatch(singleHotelAction(params.id)) 
    dispatch(alreadyBookedAction(params.id))
  }, [dispatch, params.id]);

 
  const diffDays = (from, to)=>{
    const day = 24 * 60 * 60 * 1000
    const start = new Date(from)
    const end = new Date(to)
    const days = Math.round(Math.abs((end-start)/day))
    return days;
  }
  
  const handleBooking = () =>{
    const hotelId = params.id
    dispatch(getSessionAction({hotelId}))
    navigate(`/login/${params.id}/?redirect=checkout`)
  }

  return( 
  <div>
    {loading && <Loader/>}
    {error && <MessageDanger>{error} </MessageDanger>}
    <Row>
      <Col className='bg-secondary d-flex justify-content-center text-light addHotel py-5 '>
        <h1>{h.title} </h1>
      </Col>
    </Row>
    <Row className='m-3'>
      <Col xs={4} md={5} >
        { h && h._id && <img src={`/api/hotel/image/${h._id}`} alt="hotel_image" 
        className='rounded img-fluid img-thumbnail' width="1100" height="500" />}
      </Col>
      <Col xs={8} md={7}>
        <ListGroup className='rounded'>
          <ListGroup.Item className='d-flex'>
            <h3 className='text-primary'>&#8358;{h && h.price && h.price.toLocaleString()}.00 </h3>
            <span className='ms-2'>per night</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>{h.content} </p>
          </ListGroup.Item>
          <ListGroup.Item>
             <span><strong>Availability: </strong> {diffDays(h.from, h.to)} {diffDays(h.from, h.to) <= 1? "day" : "days"}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Location: </strong>{h.location} </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Available From: </strong>{new Date(h.from).toDateString()} {new Date(h.from).toLocaleTimeString()}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Available to: </strong>{new Date(h.to).toDateString()} {new Date(h.from).toLocaleTimeString()}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Number of beds: </strong>{h.bed} </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong><i>Posted by:</i> </strong>{h.postedBy.name} </span>
          </ListGroup.Item>
          {
            status && status.status === true? (
            <ListGroup.Item className='clearfix'>
              <Button className='float-end' disabled>
                Already booked by you
              </Button>
            </ListGroup.Item>
            ):             
            (
              <ListGroup.Item className='clearfix'>
              <Button className='float-end' onClick={handleBooking} >
                {user && user._id? 'book now': 'Login to book'}
              </Button>
            </ListGroup.Item>
            )
          }

        </ListGroup>
      </Col>
    </Row>
  </div>
  );
};

export default ViewHotelScreen;

///stripe/checkout