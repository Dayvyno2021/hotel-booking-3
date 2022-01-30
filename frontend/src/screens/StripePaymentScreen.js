import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {stripeAccountAction, continueStripeAction} from '../actions/stripeActions'
import Loader from '../components/Loader';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageDanger } from '../components/Message';

const StripePaymentScreen = () => {

  const params = useParams();
  const navigate = useNavigate()

  const dispatch = useDispatch()

  
  const stripeAccountReducer = useSelector(state=>state.stripeAccountReducer)
  const {loading, userAccount, error} = stripeAccountReducer

  
  useEffect(() => {
      if (!userAccount){
          dispatch(stripeAccountAction())
        } else{
          setEmail(userAccount.email)
        }
      }, [dispatch, userAccount]);
      
      const [tel, setTel] = useState('')
      const [email, setEmail] = useState('')

    const handleSubmit = () =>{
      dispatch(continueStripeAction({tel, email, id: params.id}))
      navigate(`/user/stripe-account/details/${userAccount._id}`)
    }

  return (
    <Container className='d-flex flex-column justify-content-center ' >
      {loading && <Loader/>}
      {error && <MessageDanger>{error} </MessageDanger>}
      <Row className='mx-auto p-2 rounded '>
        <Col md={8} className='d-flex flex-column rounded p-5 justify-content-center mx-auto bg-secondary'>
          <h4 className='text-light mx-auto'>DAYVE HOTEL PAYMENT PORTAL</h4>
          <span className='d-flex mx-auto'>
            <span className="material-icons text-light locked">lock</span> 
            <h6 className='text-light'>PAYMENT POWERED BY STRIPE</h6>
          </span>
          <hr/>
          <Card className='mx-auto'>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">Get Paid by DAYVE MERN</Card.Subtitle>
              <Card.Text>DAYVE MERN partners with stripe for fast, secure payments. Fill
                out a few details so you can getting paid
              </Card.Text>
              <Form.Group className="mb-3" controlId="formBasicTelephone">
                <Form.Label as='h6'>Telephone</Form.Label>
                <Form.Control 
                  type="tel" 
                  placeholder="Enter Telephone" 
                  onChange={(e)=>setTel(e.target.value)}
                  value = {tel}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label as='h6'>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter E-mail" 
                  value={email} 
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Form.Group>
              <Card.Text className='text-muted'>
                We'll email you with important updates
              </Card.Text>
              <div className='d-flex justify-content-end'>
                <Button onClick={handleSubmit}>
                  Next <span className="material-icons arrowing">arrow_forward</span>
                </Button> 
              </div>

            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </Container>
  )
};

export default StripePaymentScreen;
