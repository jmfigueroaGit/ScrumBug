import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
const Footer = () => {
    return (
        <>
            <Container style={{ zIndex: '1' }}>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright &copy; Scrumbug 2020
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Footer;
