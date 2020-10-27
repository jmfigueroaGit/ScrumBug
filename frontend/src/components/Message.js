import React from 'react';
import { Alert } from 'react-bootstrap';
const Message = ({ variant, children }) => {
  return (
    <Alert
      className='ml-4'
      variant={variant}
      style={{
        width: '27rem',
        position: 'absolute',
        marginTop: '4.5em',
      }}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
