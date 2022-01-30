import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {editHotelAction, singleHotelAction} from '../actions/hotelActions'
import Loader from '../components/Loader'
import {MessageDanger, MessageSuccess} from '../components/Message'
import {Row, Col, Form, Button} from 'react-bootstrap'
import moment from 'moment'
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import {EDIT_HOTEL_RESET} from '../constants/hotelConstants'
import MyContainer from '../components/MyContainer';

const EditHotelScreen = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [bed, setBed] = useState('')
    
  

  const handleSubmit=(e)=>{
    e.preventDefault();

    const hotelEditData = new FormData()
    hotelEditData.append('title', title)
    hotelEditData.append('content', content)
    hotelEditData.append('location', location)
    hotelEditData.append('image', image)
    hotelEditData.append('price', price)
    hotelEditData.append('from', from)
    hotelEditData.append('to', to)
    hotelEditData.append('bed', bed)

    dispatch(editHotelAction(params.id, hotelEditData))
  }

  const imageHandler = (e) =>{
    const file = e.target.files[0]
    setPreview(URL.createObjectURL(file))
    setImage(file)
  }

  const singleHotelReducer = useSelector(state=>state.singleHotelReducer)
  const {loading, anHotel, error} = singleHotelReducer

  const editHotelReducer = useSelector(state=>state.editHotelReducer)
  const {loading: loadingUPD, success, error: errorUPD} =  editHotelReducer

  useEffect(() => {
    registerLocale("en-GB", enGB);
    if (success){
      dispatch({type: EDIT_HOTEL_RESET})
      navigate('/dashboard')

    } else{
      if (!anHotel || params.id !== anHotel._id){
        dispatch(singleHotelAction(params.id))
      }else{
        const from2 = new Date(anHotel.from)
        const to2 = new Date(anHotel.to)
        setTitle(anHotel.title)
        setContent(anHotel.content)
        setLocation(anHotel.location)
        setPrice(anHotel.price)
        setFrom(from2)
        setTo(to2)
        setBed(anHotel.bed)
        setPreview(`/api/hotel/image/${anHotel._id}`)
  
      }
    }
  }, [dispatch, params.id, anHotel, success, navigate]);

  const [preview, setPreview] = useState(
      "https:via.placeholder.com/100x100.png?text=PREVIEW"
    )


  return (
    <div className='m-3'>
      {loading && <Loader/>}
      {error && <MessageDanger>{error} </MessageDanger>}
      <Row  className='rounded d-flex justify-content-center '>
        <Col sm={1} md={1} lg={1} xl={2} xxl={2}>
        </Col>
        <Col xs={10} sm={8} md={7} lg={6} xl={5} xxl={5} className='d-flex flex-column rounded p-3 justify-content-center mx-auto bg-secondary'>
            <h4 className='text-light mx-auto addHotel'>Add Hotel</h4>
            <Form variant='light' className='mx-3' onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasictitle">
                <Form.Label className='text-light'>Hotel Name</Form.Label>
                <Form.Control 
                  value={title} 
                  type="text" 
                  name = "title"
                  placeholder={title}
                  onChange={(e)=>setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicContent">
                <Form.Label className='text-light'>Content</Form.Label>
                <Form.Control 
                  value={content} 
                  as="textarea"
                  rows={3}
                  placeholder={content}
                  onChange={(e)=>setContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3 autocomplete" controlId="formBasicLocation">
              <Form.Label className='text-light'>Location</Form.Label>
                <Form.Control 
                  value={location} 
                  type="text" 
                  name = "location"
                  placeholder={location}
                  onChange={(e)=>setLocation(e.target.value)}
                /> 
              </Form.Group>




              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={imageHandler} accept='image/*' />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label className='text-light'>Price</Form.Label>
                <Form.Control 
                  value={price} 
                  type="number" 
                  placeholder={price}
                  onChange={(e)=>setPrice(e.target.value)}
                />
              </Form.Group>
              


              <Form.Group className="mb-3" controlId="formBasicFrom">
                <Form.Label className='text-light'>From</Form.Label>
                <DatePicker selected={from}
                  locale="en-GB"
                  onChange={(date)=>setFrom(date)}
                  minDate={moment().toDate()}
                  dateFormat="P"
                  calendarContainer={MyContainer}
                />
 
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTo">
                <Form.Label className='text-light'>To</Form.Label>
                <DatePicker selected={to}
                  locale="en-GB"
                  dateFormat="P"
                  onChange={(date)=>setTo(date)}
                  minDate={moment().toDate()}
                  calendarContainer={MyContainer}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label className='text-light'>Number of beds</Form.Label>
                <Form.Select aria-label="Default select example" value={bed}
                onChange={(e)=>setBed(e.target.value)}
              >
                <option key={1} value={1} >1</option>
                <option key={2} value={2} >2</option>
                <option  key={3} value={3} >3</option>
                <option key={4} value={4} >4</option>
              </Form.Select>

              </Form.Group>
              {loadingUPD && <Loader/>}
              {errorUPD && <MessageDanger> {errorUPD} </MessageDanger>}
              {success && <MessageSuccess/>}
              <Button type='submit'>
                Save
              </Button>
            </Form>
          </Col>
          <Col xs={2} sm={2} md={3} lg={3} xl={3} xxl={3} >
            <img src={preview} 
            alt="preview_img" className='img img-fluid m-2' />
          </Col>
          <Col sm={1} md={6} lg={1} xl={2} xxl={2} className="pe-2">
          </Col>
        </Row> 
    </div>
  );
};

export default EditHotelScreen;

// src={`/api/hotel/image/${hotel._id}`}