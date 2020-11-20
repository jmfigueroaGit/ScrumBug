import React from 'react';
import { Alert } from 'react-bootstrap';
const Message = ({ variant, children }) => {
    return (
        <Alert
            className='ml-4'
            variant={variant}
            style={{
                width: '23rem',
                position: 'absolute',
                textAlign: 'center',
                zIndex: 1,
                background: 'linear-gradient(45deg, #FE6B8B 50%, #FF8E53 80%)',
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
