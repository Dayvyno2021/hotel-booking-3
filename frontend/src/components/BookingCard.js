import React, {useState} from 'react';
import {Button, Col, ListGroup} from 'react-bootstrap'
import UserOrderModal from './UserOrderModal';

const BookingCard = ({h, session, orderedBy}) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show)

  const diffDays = (from, to)=>{
    const day = 24 * 60 * 60 * 1000
    const start = new Date(from)
    const end = new Date(to)
    const days = Math.round(Math.abs((end-start)/day))
    return days;
  }

  return (
    <>
      <Col xs={4} md={5} className='mb-3'>
        { h && h._id && <img src={`/api/hotel/image/${h._id}`} alt="hotel_image" 
        className='rounded img-thumbnail' width="1100" height="500" />}
      </Col>
      <Col xs={8} md={7} className='mb-3'>
        <ListGroup className='rounded'>
          <ListGroup.Item className='clearfix'>
            <h3 className='float-start text-primary'>{h && h.title} </h3>
            <div className='float-end d-flex'>
              <h3 className='text-primary'>&#8358;{h && h.price && h.price.toLocaleString()}</h3>
              <span className='ms-2'>per night</span>
            </div>
          </ListGroup.Item>
          <ListGroup.Item>
            <p>{h && h.content} </p>
          </ListGroup.Item>
          <ListGroup.Item>
             <span><strong>Availability: </strong> {diffDays(h && h.from, h &&h.to)} {diffDays(h && h.from, h && h.to) <= 1? "day" : "days"}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Location: </strong>{h && h.location} </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Available From: </strong>{new Date(h && h.from).toDateString()} {new Date(h && h.from).toLocaleTimeString('en-GB', {timeZone: 'UTC'})}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Available to: </strong>{new Date(h && h.to).toDateString()} {new Date(h && h.from).toLocaleTimeString('en-GB', {timeZone: 'UTC'})}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span><strong>Number of beds: </strong>{h && h.bed} </span>
          </ListGroup.Item>
          {show && <UserOrderModal show={show} handleClose={handleClose} session={session} orderedBy={orderedBy} />}
    
          <Button onClick={handleClose} className='mt-3'>
            Show Payment Info
          </Button>

        </ListGroup>
      </Col>
  </>
  );
};

export default BookingCard;
