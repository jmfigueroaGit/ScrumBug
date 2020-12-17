import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../../actions/userActions';
import { listMovies } from '../../actions/movieAction';
const theme = {
    field: {
        marginTop: '5rem',
    },
    controls: {
        marginTop: '2rem',
    },
    container: {
        marginLeft: '6rem',
    },
    text: {
        textAlign: 'center',
        fontSize: '15px',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '40px',
    },
    sidePanel: {
        background: 'linear-gradient(50deg, #FF4B2B 40%, #FF416C 90%)',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        color: 'white',
        paddingTop: '8rem',
    },
    mainPanel: {},
    textLink: {
        color: 'black',
        fontSize: '1em',
    },
    root: {
        margin: 0,
        padding: '0',
    },
    sideBar: {
        background: '#333333',
        width: '100vw',
        height: '100vh',
        fontSize: '25px',
    },
    mainBar: {
        background: 'linear-gradient(45deg, #FFFFFF 30%, #FFFFf8 90%)',
        height: '100vh',
    },
    icon: {
        fontSize: '25px',
        paddingRight: '10px',
        marginTop: '-5px',
        paddingLeft: '15px',
    },
    listItem: {
        border: 'none',
        background: '#333333',
        borderRadius: '5px',
        fontWeight: '900',
    },
    selectedItem: {
        backgroundColor: '#202020',
        borderRadius: '5px',
        color: 'white',
        paddingLeft: '23px',
        fontWeight: '900',
    },
};

const AdminDashboard = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listMovies());
            dispatch(listUsers());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    return (
        <div style={theme.root}>
            {userInfo ? (
                <Container fluid>
                    <Row>
                        <Col sm={3} style={theme.sideBar}>
                            <ListGroup className='mt-5'>
                                <ListGroup.Item
                                    action
                                    disabled
                                    className='my-1'
                                    style={theme.selectedItem}
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
                                    <Link
                                        to='/admin/userlist'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                    >
                                        <i
                                            class='fa fa-user'
                                            style={theme.icon}
                                        ></i>
                                        Users
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    className='my-1'
                                    style={theme.listItem}
                                >
                                    <Link
                                        to='/admin/movies'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                    >
                                        <i
                                            class='fa fa-film'
                                            style={theme.icon}
                                        ></i>
                                        Movies
                                    </Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col sm={9} style={theme.mainBar}></Col>
                    </Row>
                </Container>
            ) : (
                <Redirect to='/login'></Redirect>
            )}
        </div>
    );
};

export default AdminDashboard;
