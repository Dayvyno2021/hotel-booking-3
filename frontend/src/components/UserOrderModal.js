import React from 'react';
import {Modal} from 'react-bootstrap'


const UserOrderModal = ({show, handleClose, session, orderedBy}) =>{

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{session.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className='p-2'><strong>Customer Name</strong>{orderedBy.name}</h4>
          <h4 className='p-2'>Transaction_id:{session.sessionId} </h4>
          <h4 className='p-2'>Transaction Status: {session.payment_status}</h4> 
          <h4 className='p-2'>Total Amount Paid: &#8358;{session.amount_total.toLocaleString()}
            <span className="material-icons text-success">
              done
            </span>
          </h4>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserOrderModal