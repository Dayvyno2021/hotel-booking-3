import React, {useState} from 'react'
import {Toast, Container} from 'react-bootstrap'

const MessageDanger = ({children}) => {

  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <Container fluid className="fluid messagePosition d-flex flex-column justify-content-center">
      <Toast show={showA} onClose={toggleShowA} className='mx-auto'>
        <Toast.Header>
          <strong className='text-danger me-auto' >Error</strong>
        </Toast.Header>
        <Toast.Body className='bg-danger text-light'>{children}</Toast.Body>
      </Toast>
    </Container>
  )
}


const MessageSuccess = ({children}) => {

  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);

  return (
    <div className="messagePosition">
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <strong className='text-success me-auto' >Success</strong>
        </Toast.Header>
        <Toast.Body className='bg-success text-light'>{children}</Toast.Body>
      </Toast>
    </div>
  )
}

export {MessageDanger, MessageSuccess}