import React, {useEffect} from 'react';
import Loader from '../components/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { accountStatusAction } from '../actions/stripeActions';
import { useNavigate } from 'react-router-dom';

const StripeCallbackScreen = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stripeAccountReducer = useSelector(state=>state.stripeAccountReducer)

  const userLoginReducer = useSelector(state=>state.userLoginReducer)
  const {user} = userLoginReducer

  useEffect(() => {
    if (user && user.token){
      dispatch(accountStatusAction({
        telephone: stripeAccountReducer.stripeInfo.tel,
        country: stripeAccountReducer.countryEntity.country,
        entity: stripeAccountReducer.countryEntity.entity,
        personalDetails: stripeAccountReducer.personalDetails
      }))
      navigate('/dashboard/seller')
    }

  }, [dispatch ,user, stripeAccountReducer, navigate]);
  

  return (
  <div className='d-flex justify-content-center' style={{marginTop: '100px'}}>
    <Loader/> 
  </div>
  );
};

export default StripeCallbackScreen;
