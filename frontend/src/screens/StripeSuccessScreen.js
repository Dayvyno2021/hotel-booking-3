import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {useParams, useNavigate} from 'react-router-dom'
import { paymentSuccessAction } from '../actions/sessionAction';
import Loader from '../components/Loader'
import {MessageDanger} from '../components/Message'

const StripeSuccessScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const paymentSuccessReducer = useSelector(state=>state.paymentSuccessReducer)
  const {loading, success, error} = paymentSuccessReducer

  useEffect(() => {
    if (success){
      navigate('/dashboard')
    }
      dispatch(paymentSuccessAction(params.id))
  }, [dispatch, params.id, navigate, success]);
  

  return (
  <div className='container'>
    {loading && <Loader/>}
    {error & <MessageDanger>{error} </MessageDanger>}
    <Row className='col'>
      <Col>
        <h2 className='text-center p-5 bg-success text-light'>Payment successful</h2>
      </Col>
    </Row>
  </div>);
};

export default StripeSuccessScreen;
