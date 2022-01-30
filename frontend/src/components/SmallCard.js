import React from 'react';
import {Button, Card, Col, Row} from 'react-bootstrap'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
// import { deleteHotelAction } from '../actions/hotelActions';
// import Loader from './Loader';
// import { MessageDanger } from './Message';

const SmallCard = ({hotel, deleteHotel}) => {

  const diffDays = (from, to)=>{
    const day = 24 * 60 * 60 * 1000
    const start = new Date(from)
    const end = new Date(to)
    const days = Math.round(Math.abs((end-start)/day))
    return days;
  }

  const userLoginReducer = useSelector(state=>state.userLoginReducer)
  const {user} = userLoginReducer


  return (
  <>
    <Row>
      <Col xs={3} sm={4} md={4}>
        {
          hotel.image && hotel.image.ContentType? 
          (
          <> 
            <Link to={`/hotel/${hotel._id}`}>
              <Card.Img as='img' 
              className="img-thumbnail rounded" variant="top" 
              src={`/api/hotel/image/${hotel._id}`} />
            </Link>
          </>
          )
          :
          (
          <>
            <Link to={`/hotel/${hotel._id}`}>
              <Card.Img as='img' className="img-thumbnail rounded" variant="top" src="https://via.placeholder.com/200?text=Hotel+image" />
            </Link>
          </>
          )
        }
      </Col>
      <Col xs={7} sm={6} md={7} className='d-flex flex-column justify-content-around'>
        <Link to={`/hotel/${hotel._id}`}>
          <Card.Title className="clearfix dayveCard text-primary" >
            <span className="float-start">{hotel.title} </span>
            <span className="float-end text-primary">	&#8358;{Number(hotel.price).toLocaleString()}.00 </span>
          </Card.Title>
        </Link>
        <Card.Text className='dayveCard'>
          <strong>Location: </strong>{hotel.location}
        </Card.Text>
        <Card.Text className='dayveCard'>
          <span>{hotel.content.substring(0, 200)}...</span> 
        </Card.Text>
        <Card.Text className='dayveCard'>
          <strong>Number of days available: </strong> {diffDays(hotel.from, hotel.to)}
          {diffDays(hotel.from, hotel.to) <= 1? "day" : "days"}
        </Card.Text>
        <Card.Text className='dayveCard'>
          <strong>Number of beds: </strong> {hotel.bed}
        </Card.Text>
        <Card.Text className='dayveCard'>
        <span><strong>Available from: </strong> {new Date(hotel.from).toLocaleDateString('en-GB', {timeZone: 'UTC'})}</span>
        </Card.Text>
        <Card.Text className='dayveCard'>
          <span><strong>Available to: </strong> {new Date(hotel.to).toLocaleDateString('en-GB', {timeZone: 'UTC'})}</span>
        </Card.Text>
        {/* //{
          // Remove this button from the owners view when done
        //   ( (user && user._id === hotel.postedBy._id) || (user && user.isAdmin===true)) && 
        //   (
        //  <div className='clearfix'>
        //   <Link to={`/hotel/${hotel._id}`}>
        //     <Button className='float-end my-1'>Book Hotel</Button>
        //   </Link>
        //  </div>   
        //   )

        //} */}

        <div className='clearfix'>
         <Link to={`/hotel/${hotel._id}`}>
           <Button className='float-end my-1'>see more{`>>`} </Button>
         </Link>
        </div>   
      </Col>
      {( (user && user._id === hotel.postedBy._id) || (user && user.isAdmin===true)) &&
        (
        <Col xs={2} sm={2} md={1} className='d-flex flex-column text-center justify-content-around' >
          <Link to={`/hotel/edit/${hotel._id}`}>
            <span className="material-icons border border-1 border-secondary p-2 rounded me-2">edit</span>
          </Link>
          
          <div  onClick={()=>deleteHotel(hotel._id, user)} >          
            <span className="material-icons rounded bg-secondary me-2 p-2 dayveDel">delete</span>
          </div>
        </Col>
        )
      }
    </Row>
  </>);
};

export default SmallCard;
