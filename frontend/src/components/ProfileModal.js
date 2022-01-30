import React, {useEffect} from 'react';
import {Modal, ListGroup, Row, Col} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import { MessageDanger } from './Message';
import { protectedLoginAction } from '../actions/userActions';

const ProfileModal= ({show, handleClose}) =>{

  const dispatch = useDispatch()

  const protectedLoginReducer = useSelector(state=>state.protectedLoginReducer)
  const {loading, user, error} = protectedLoginReducer

  useEffect(() => {
    dispatch(protectedLoginAction())
  }, [dispatch]);
  
  const joinedDate = () =>{
    const time =new Date(user.createdAt).toLocaleDateString('en-GB', {timeZone: 'UTC'})
    return time
  }

  const balance = () =>{
    return user.stripe_seller.balance.toLocaleString()
  }

  return (
    <>
      {loading && <Loader/>}
      {error && <MessageDanger>{error} </MessageDanger>}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>NAME:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>{user.name} </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>EMAIL:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>{user.email} </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>SELLER:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>
                    {
                    user.seller? (<span className="material-icons text-success">done</span>):
                    (<span className="material-icons text-danger">clear</span>)
                    } 
                    </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>ADMIN:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>
                    {
                    user.isAdmin? (<span className="material-icons text-success">done</span>):
                    (<span className="material-icons text-danger">clear</span>)
                    } 
                    </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>JOINED:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>{joinedDate()} </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>BALANCE:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>&#8358; {balance()}.00 </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>CHARGES ENB:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>
                    {
                    user && user.stripe_seller && user.stripe_seller.charges_enabled?
                    (<span className="material-icons text-success">done</span>):
                    (<span className="material-icons text-danger">clear</span>)
                  } 
                  </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

          <ListGroup>
              <Row>
                <Col xs={5}>
                  <ListGroup.Item><strong>DETAILS:</strong></ListGroup.Item>
                </Col>
                <Col xs={7}>
                  <ListGroup.Item>
                    {
                    user && user.stripe_seller && user.stripe_seller.details_submitted?
                    (<span className="material-icons text-success">done</span>):
                    (<span className="material-icons text-danger">clear</span>)
                    } 
                    </ListGroup.Item>
                </Col>
              </Row> 
          </ListGroup>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal