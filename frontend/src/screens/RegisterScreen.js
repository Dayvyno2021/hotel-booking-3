import React, { useState, useEffect }  from 'react'
import {useLocation, useNavigate, Link} from 'react-router-dom'
import {Form, Button, Row, Col, Container} from 'react-bootstrap'
import {MessageDanger} from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
import { userRegisterAction } from '../actions/userActions'
import Loader from '../components/Loader'
// import Toast from '../components/Toast'

const RegisterScreen = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [notify, setNotify] = useState(null)
  const [seller, setSeller] = useState(false)

  const dispatch = useDispatch()

  const userRegisterReducer = useSelector(state => state.userRegisterReducer)
  const {loading, user, error} = userRegisterReducer

  const redirect = location.search? location.search.split('=')[1] : '/dashboard'

  useEffect(() => {

    if (user){
      navigate(redirect)
    }

  }, [navigate, redirect, user])

  const submitHandler = (e)=>{
    e.preventDefault()

    if (password===confirmPassword){
      dispatch(userRegisterAction({name, email, password, seller}))

    } else{
      setNotify('password must match')
    }
  }

  return (
    <Container fluid className='p-3 d-flex justify-content-center flex-column '>
      {loading && <Loader />}
      {/* {error && <Toast>{error}</Toast>} */}
      {error && <MessageDanger verdict='Error'>{error}</MessageDanger>}
      <Row>
        <Col className='h2 d-flex justify-content-center'> Register </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col xm={12} sm={8} md={8} lg={8} xl={6} xxl={4}>       
          <Form onSubmit={submitHandler} className="shadow-lg border border-2 border-dark p-2 rounded-3">
            <Form.Group className="mb-3 border border-1 p-1 rounded-top" controlId="formBasicName">
              <Form.Label>Name: </Form.Label>
              <Form.Control type="name" placeholder="Enter Full Name" onChange={(e)=>setName(e.target.value)} />
              <Form.Text className="text-muted">
                Enter Full Name
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3 border border-1 p-1 rounded-top" controlId="formBasicEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='d-flex' onChange={(e)=>setSeller(e.target.value)} >
              <Form.Check type='radio' value={true} name='seller' label='Hotel seller' />
              <Form.Check type='radio' value={false} name='seller' label='Hotel user' className='ms-5' />
            </Form.Group>

            <Form.Group className="mb-3 border border-1 p-1 rounded-top" controlId="formBasicPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
            </Form.Group>
          
            <Form.Group className="mb-3 border border-1 p-1 rounded-top" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password:</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
              {confirmPassword.length===0? (''): confirmPassword !== password? (<p className="text-danger">{'password must match'}</p>) : (<p className='text-success'>{'password ok'}</p>)}
              {<p className="text-danger">{notify}</p>}
            </Form.Group>


            <Form.Group  className='d-flex justify-content-center'>
              <Button variant="primary" type="submit" 
                disabled={!email || !password || !name }
              >
                Submit
              </Button>
            </Form.Group>
            <Form.Text>
              Have account already? <Link to={`/login/?redirect=${redirect}`}> Login </Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterScreen
