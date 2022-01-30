import React from 'react'
import {Container, Row, Button, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const Connected = () => {
  return (
    <Container fluid className='p-3'>
      <Row className='d-flex rounded justify-content-between border border-2 border-secondary'>
        <Col xs={6} >
          <h2 className=' mt-2 '>Your Hotels</h2>
        </Col>
        <Col className='d-flex justify-content-end p-2' xs={6}>
          <Link to={'/hotels/new'}>
            <Button >
              + Add New
            </Button>
          </Link>
        </Col>
      </Row>  
    </Container>
  )
}

export default Connected
