import React, { useState, useEffect }  from 'react'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import {Form, Button, Container, Row, Col} from 'react-bootstrap'
import {MessageDanger} from '../components/Message'
import {useSelector, useDispatch} from 'react-redux'
import { userLoginAction } from '../actions/userActions'
import Loader from '../components/Loader'

const LoginScreen = () => {

  const navigate = useNavigate()
  const location = useLocation()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [notify, setNotify] = useState(null)

  const dispatch = useDispatch()

  const userLoginReducer = useSelector(state => state.userLoginReducer)
  const {loading, user, error} = userLoginReducer
  

  const redirect = location.search? location.search.split('=')[1] : '/dashboard'

  useEffect(() => {
    if (user){
      navigate(redirect)
    }

  }, [navigate, redirect, user])

  const submitHandler = (e)=>{
    e.preventDefault()
    if (!email && !password){
      setNotify('All fields are required!')
    }else{
      dispatch(userLoginAction({email, password}))
    }
  }

  return (
    <Container className='p-3 d-flex justify-content-center flex-column'>
      {loading && <Loader/>}
      {error && <MessageDanger verdict='Error'>{error}</MessageDanger>}
      <Row>
        <Col className='h2 d-flex justify-content-center text-shadow'> Login </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col xm={12} sm={8} md={8} lg={8} xl={6} xxl={4}> 
          <Form onSubmit={submitHandler} className="shadow-lg border border-2 border-dark p-2 rounded-3">

            <Form.Group className="mb-3 border border-1 p-1 rounded-top" controlId="formBasicEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3 border border-1 p-1 rounded-top" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group  className='d-flex justify-content-center'>
              <Button variant="primary" type="submit" disabled={!email || !password}>
                Submit
              </Button>
            </Form.Group>
            <Form.Text>
              Have account already? <Link to={`/register/?redirect=${redirect}`}>Register</Link>
            </Form.Text>
            {<p className="text-danger">{notify}</p>}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen

