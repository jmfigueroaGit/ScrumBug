import React from 'react';
import { Row, Col, ListGroup, Tab } from 'react-bootstrap';
const theme = {
    root: {
        height: '100%',
    },
    sideBar: {
        background: '#333333',
        width: '100vw',
        height: '100vh',
        fontSize: '25px',
    },
    mainBar: {
        background: '#1E1E1E',
        width: '100vw',
        height: '100vh',
    },
    icon: {
        fontSize: '25px',
        paddingRight: '10px',
        marginTop: '-5px',
        paddingLeft: '15px',
    },
    listItem: {
        borderRadius: '5px',
    },
};
const SideBar = () => {
    return (
        <div style={theme.root}>
            <Tab.Container fluid>
                <Row>
                    <Col sm={3} style={theme.sideBar}>
                        <ListGroup className='mt-5'>
                            <ListGroup.Item
                                action
                                href='#link1'
                                className='my-1'
                                style={theme.listItem}
                            >
                                <i
                                    className='fa fa-home'
                                    style={theme.icon}
                                ></i>
                                Dashboard
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                className='my-1'
                                style={theme.listItem}
                            >
                                <i class='fa fa-user' style={theme.icon}></i>
                                Users
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                href='#link3'
                                className='my-1'
                                style={theme.listItem}
                            >
                                <i class='fa fa-film' style={theme.icon}></i>
                                Movies
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={9} style={theme.mainBar}></Col>
                </Row>
            </Tab.Container>
        </div>
    );
};

export default SideBar;
