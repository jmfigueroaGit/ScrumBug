import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        marginLeft: '5em',
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
