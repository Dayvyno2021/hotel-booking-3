import React from 'react'
import {Spinner} from 'react-bootstrap'

const Loader = () => {
  return (
    <div className='d-flex justify-content-center loaderDayve'>
      <Spinner animation="border" role="status" style={{width: '50px', height: '50px' }} className='m-5 '>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
