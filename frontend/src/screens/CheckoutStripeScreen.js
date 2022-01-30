import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Form, Button, InputGroup, FormControl} from 'react-bootstrap'
import { protectedLoginAction } from '../actions/userActions';
import Loader from '../components/Loader';
import { MessageDanger} from '../components/Message';
import { buyerPaymentAction } from '../actions/sessionAction';
import {useParams, useNavigate} from 'react-router-dom'
import { BUYER_PAYMENT_RESET } from '../constants/sessionConstants';

const CheckoutStripeScreen = () => {

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate()

  const buyerPaymentReducer = useSelector(state=>state.buyerPaymentReducer)
  const {loading: loadingPay, success, error: errorPay} = buyerPaymentReducer

  const protectedLoginReducer = useSelector(state=>state.protectedLoginReducer)
  const {loading, user, error} = protectedLoginReducer
  
  useEffect(() => {
    if (success){
      dispatch({type: BUYER_PAYMENT_RESET})
      navigate(`/stripe/success/${params.id}`)
    } else{
      if (!user || !user.stripeSession || !user.stripeSession.amount_total){
        dispatch(protectedLoginAction())
      }
    }
  }, [dispatch, user, navigate, success, params.id]);

  const paymentHandler = () =>{
    dispatch(buyerPaymentAction({id:params.id}))
  }
  
  return (
    <div className=''>
      {loading && <Loader/>}
      {loadingPay && <Loader/>}
      {error && <MessageDanger>{error} </MessageDanger>}
      {errorPay && <MessageDanger>{errorPay} </MessageDanger>}
      <Row className=''>
        <Col sm={6} className='bg-light pe-5'>
          <p className='my-5 text-center'> 
            <span className="material-icons text-muted me-2 checkLocked">lock_open</span>Fake stripe Payment
          </p>
          <h6 className='text-muted text-center'>{user && user.stripeSession && user.stripeSession.name}</h6>
          <h6 className='text-center'>&#8358;{user && user.stripeSession && user.stripeSession.amount_total.toLocaleString()}.00</h6>
        </Col>
        <Col sm={6} className='px-4 ' style={{backgroundColor: " #f5f5f0"}}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <h4 className='py-4'>Pay with Card</h4>
              <Form.Label className='text-muted'>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCardInfo">
              <Form.Label className='text-muted'>Card information</Form.Label>
              <InputGroup>
                <FormControl
                  placeholder="card number"
                  type='number'
                  aria-label="Recipient's username with two button addons"
                />
                <Form.Label variant="outline-secondary" className='border border-1 border-secondary'>
                  <span className="material-icons icon2">credit_card</span>
                </Form.Label>
                <Button variant="outline-secondary" className='text-success'>VISA</Button>
              </InputGroup>
              <InputGroup>
                <FormControl
                  placeholder="MM"
                  type='number'
                  aria-label="Recipient's username with two button addons"
                />
                <FormControl type='number' placeholder='YY'/>
                <FormControl placeholder='CVC'/>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label className='text-muted'>Name on card</Form.Label>
              <Form.Control type="text"  />
            </Form.Group>
            <Form.Group className='d-grid pb-2'>
              <Button variant="primary" className='btn btn-block' onClick={paymentHandler}>
                Pay &#8358;{user && user.stripeSession && user.stripeSession.amount_total.toLocaleString()}.00
                </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutStripeScreen;
