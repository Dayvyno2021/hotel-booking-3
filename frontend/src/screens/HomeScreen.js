import React, {useEffect} from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import { allHotelsAction, deleteHotelAction } from '../actions/hotelActions';
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'
import SmallCard from '../components/SmallCard';
import { useLocation, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate'
import SearchBox from '../components/SearchBox';
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import queryString from 'query-string'


const HomeScreen = () => {

  const dispatch = useDispatch();
  const location = useLocation()
  const params = useParams()

  const activePage = params.id || 1


  const parsed = queryString.parse(location.search);
  
  const {name, bed, date} = parsed

  const allHotelsReducer = useSelector(state=>state.allHotelsReducer)
  const {loading, hotels, pages, active, error} = allHotelsReducer

    const deleteHotelReducer = useSelector(state=>state.deleteHotelReducer)
  const {
    loading: loadingDel, 
    success: successDel, 
    error: errorDel
  } = deleteHotelReducer

  const deleteHotel= (id, user) =>{
    registerLocale("en-GB", enGB);
    if (user.isAdmin ===true){
      if (window.confirm("Delete hotel?")){
        dispatch(deleteHotelAction(id))
      }
    } else{
      window.alert('Only software Admins are allowed to delete hotels')
    }
  }

  useEffect(() => {
    dispatch(allHotelsAction(name, activePage, bed, date))
  }, [dispatch, successDel, name, activePage, bed, date]);


  return (
    <Container className='py-1 px-5 justify-content-center mx-auto m-1'>
      {loading && <Loader />}
      {error && <MessageDanger>{error} </MessageDanger>} 
      {loadingDel && <Loader />}
      {errorDel && <MessageDanger>{errorDel} </MessageDanger>} 
      <h3 className='addHotel text-center'>All Hotels</h3>
      <Row>
        <Col xs={10} sm={12} className='mx-auto'>
          <SearchBox activePage={activePage} locale="en-GB" dateFormat="P" DatePicker={DatePicker}/>
        </Col>
      </Row>
      
      <Row className='my-1'>
        {hotels && hotels.map(hotel=>(
          <Col key={hotel._id} xs={12} className='my-2 border border-secondary border-2 rounded p-2 cdDayve bg-light'>
            <SmallCard hotel={hotel} deleteHotel={deleteHotel}/>
          </Col>
        ))}
      </Row>

      <Row>
        <Paginate pages={pages} active={active}/>
      </Row>
      
    </Container>
  )
}

export default HomeScreen
