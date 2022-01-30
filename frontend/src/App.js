import {Routes, Route} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
// import {Container} from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardScreen from './screens/DashboardScreen';
import DashboardSellerScreen from './screens/DashboardSellerScreen';
import NewHotelScreen from './screens/NewHotelScreen';
import StripePaymentScreen from './screens/StripePaymentScreen'
import StripeDetailsScreen from './screens/StripeDetailsScreen';
import PersonalDetailsScreen from './screens/PersonalDetailsScreen';
import StripeCallbackScreen from './screens/StripeCallbackScreen';
import EditHotelScreen from './screens/EditHotelScreen';
import ViewHotelScreen from './screens/ViewHotelScreen';
import StripeSuccessScreen from './screens/StripeSuccessScreen';
import StripeCancelScreen from './screens/StripeCancelScreen';
import CheckoutStripeScreen from './screens/CheckoutStripeScreen';


function App() {
  return (
    <div className='body1'>
    <Header />
    <div className='fluid body'>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/:id' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/login/:id' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/dashboard' element={<DashboardScreen />} />
        <Route path='/dashboard/seller' element={<DashboardSellerScreen/>} />
        <Route path='/hotels/new' element={<NewHotelScreen/>} />
        <Route path='/user/stripe-account/:id' element={<StripePaymentScreen/>} />
        <Route path='/user/stripe-account/details/:id' element={<StripeDetailsScreen/>} />
        <Route path='/user/personal/details/:id' element={<PersonalDetailsScreen/>} />
        <Route path='/stripe-callback/:id' element={<StripeCallbackScreen/>} />
        <Route path='/hotel/edit/:id' element={<EditHotelScreen/>} />
        <Route path='/hotel/:id' element={<ViewHotelScreen/>} />
        <Route path='/stripe/success/:id' element={<StripeSuccessScreen/>} />
        <Route path='/stripe/cancel' element={<StripeCancelScreen/>} />
        <Route path='/login/:id/checkout' element={<CheckoutStripeScreen/>} />
        <Route path='/register/:id/checkout' element={<CheckoutStripeScreen/>} />
      </Routes>
    </div>
    <Footer />
    </div>
  );
}

export default App;
