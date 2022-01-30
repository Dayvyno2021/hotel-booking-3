import React, {useState} from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap'
import { stripePersonalAction } from '../actions/stripeActions';
import { useDispatch} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const PersonalDetailsScreen = () => {

  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [country, setCountry] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalcode, setPostalcode] = useState(1)

  const handleSubmit = () =>{
    dispatch(stripePersonalAction({
      firstName,
      lastName,
      dateOfBirth,
      country,
      addressLine1,
      addressLine2,
      city,
      state,
      postalcode,
    }))
    navigate(`/stripe-callback/${params.id}`)
  }

  return (
    <div className='fluid d-flexjustify-content-center'>
      <Row className='mx-auto p-3 rounded '>
      <Col sm={6} md={5} xl={4} className='d-flex flex-column rounded p-2 justify-content-center mx-auto bg-secondary'>
        <h4 className='text-light mx-auto'>DAYVE HOTEL PAYMENT PORTAL</h4>
          <span className='d-flex mx-auto'>
            <span className="material-icons text-light locked">lock</span> 
            <h6 className='text-light'>PAYMENT POWERED BY STRIPE</h6>
        </span>
        <hr/>
        <Form variant='light' className='mx-3'>
          <Form.Group className="mb-3 d-flex flex-column" controlId="formBasic1">
            <h6 className='text-light'>Personal Details</h6>
            <Form.Text className='text-light text-person'>Tell us about yourself</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic2">
            <Form.Label className='text-light'>Legal Name of Person</Form.Label>
            <Form.Control 
              value={firstName} 
              type="text" 
              placeholder="First name" 
              className='mb-1'
              onChange={(e)=>setFirstName(e.target.value)}
            />
            <Form.Control 
              type="text" placeholder="Last name" 
              value={lastName} onChange={(e)=>setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic3">
            <Form.Label className='text-light'>Date of birth</Form.Label>
            <Form.Control 
              type="date" placeholder="DD/MM/YYYY" min="01/01/2004" 
              value = {dateOfBirth} 
              onChange={(e)=>setDateOfBirth(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasic4">
            <Form.Label className='text-light'>Home address</Form.Label>
            <Form.Control 
              type="text" placeholder="Nigeria"  
              className='mb-3' value = {country}
              onChange={(e)=>setCountry(e.target.value)}
            />
            <Form.Control 
              type="text" placeholder="Address line 1" className='mb-1' 
              value={addressLine1} onChange={(e)=>setAddressLine1(e.target.value)}
            />
            <Form.Control 
              type="text" placeholder="Address line 2" className='mb-1' 
              value={addressLine2} onChange={(e)=>setAddressLine2(e.target.value)}
            />
            <Form.Control 
              type="text" placeholder="City" className='mb-1' 
              value={city} onChange={(e)=>setCity(e.target.value)}
            />
            <Form.Control 
              type="text" placeholder="State" className='mb-1' 
              value={state} onChange={(e)=>setState(e.target.value)}
            />
            <Form.Control 
              type="number" placeholder="Postal code" className='mb-1' 
              value={postalcode} onChange={(e)=>setPostalcode(e.target.value)}
            />
          </Form.Group>
          <div className='d-flex justify-content-end mt-3'>
              <Button onClick={handleSubmit}>
                Next <span className="material-icons arrowing">arrow_forward</span>
              </Button> 
          </div>

        </Form>
      </Col>
      </Row>
    </div>
  )
};

export default PersonalDetailsScreen;
