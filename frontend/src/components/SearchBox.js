import React, {useState} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import enGB from "date-fns/locale/en-GB";
import { registerLocale } from "react-datepicker";


const SearchBox = ({activePage, locale, dateFormat, DatePicker}) =>{

  const navigate = useNavigate()

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const date = `${new Date(String(startDate)).toLocaleDateString()}, ${new Date(String(endDate)).toLocaleDateString()}`

  const [name, setName] = useState('')
  const [bed, setBed] = useState('')
  
  registerLocale("en-GB", enGB)

  const search = () =>{
    navigate(`/${activePage}?name=${name}&date=${date}&bed=${bed}`)
  }

  return (
    <>
      <Form.Group>
        <Row>
          <Col className='d-flex my-1 mx-auto' xs={12} sm={3} lg={4}>
            <Form.Control 
              placeholder='search hotel by name...'
              type='search'
              value = {name}
              onChange={(e)=>setName(e.target.value)}
            /> 
          </Col>

          <Col className='d-flex my-1 mx-auto' xs={12} sm={3} lg={4}>
            <Form.Select aria-label="Default select example" value={bed}
              onChange={(e)=>setBed(e.target.value)}
            >
              <option key={0} value=''>beds number ...</option>
              <option key={1} value={1}>1</option>
              <option key={2} value={2}>2</option>
              <option key={3} value={3}>3</option>
              <option key={4} value={4}>4</option>
            </Form.Select>
          </Col>
          <Col className='d-flex my-1 mx-auto' xs={12} sm={6} lg={4}>
            <DatePicker
              className='form-control'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              minDate={startDate}
              endDate={endDate}
              locale={locale}
              dateFormat={dateFormat}
              placeholderText='start date...'
            />

            <DatePicker
              className='form-control me-3'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              locale={locale}
              dateFormat={dateFormat}
              placeholderText='end date...'
            />
            <span 
              onClick={search}
              className="material-icons ms-3 border border-2 border-secondary p-1 rounded ms-1 bg-secondary text-light dayveDel" 
            >
              search
            </span>
          </Col>
        </Row>


      </Form.Group>
    </>
  )
};

export default SearchBox;

