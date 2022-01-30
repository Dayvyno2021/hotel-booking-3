import React from 'react';
import { Pagination } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'

const Paginate = ({pages, active}) => {

  return (
    <Pagination className='pagi'>
      {pages>1 && (
        [...Array(pages).keys()].map((page, i)=>(
          <LinkContainer to={`/${page+1}`} key={page+1}>
            <Pagination.Item active={page+1 === active}>{page+1}</Pagination.Item>
          </LinkContainer>
        ))
        ) }
    </Pagination>
  )
};

export default Paginate;
