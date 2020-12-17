import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Form, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { getUserDetails, updateUser } from '../../actions/userActions';
import { USER_UPDATE_RESET } from '../../constant/userConstants';

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

        color: 'white',
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
        color: 'white',
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

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [fullName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isActive, setIsActive] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
        } else {
            if (user.name) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.fullName);
                setEmail(user.email);
                setIsActive(user.isActive);
            }
        }
    }, [dispatch, history, userId, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: userId, fullName, email, isActive }));
    };

    return (
        <div style={theme.root}>
            {userInfo ? (
                <Container fluid>
                    <Row>
                        <Col sm={3} style={theme.sideBar}>
                            <ListGroup className='mt-5'>
                                <ListGroup.Item
                                    action
                                    className='my-1'
                                    style={theme.listItem}
                                >
                                    <Link
                                        to='/admin/dashboard'
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                        }}
                                    >
                                        <i
                                            className='fa fa-home'
                                            style={theme.icon}
                                        ></i>
                                        Dashboard
                                    </Link>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    className='my-1'
                                    disabled
                                    style={theme.selectedItem}
                                >
                                    <i
                                        class='fa fa-user'
                                        style={theme.icon}
                                    ></i>
                                    Users
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    className='my-1'
                                    style={theme.listItem}
                                >
                                    <Link
                                        to='/admin/dashboard'
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
                        <Col sm={9} style={theme.mainBar}>
                            <div>
                                <Link
                                    to='/admin/userlist'
                                    className='btn btn-dark my-3 mx-3'
                                >
                                    Go Back
                                </Link>
                                <FormContainer style={theme.container}>
                                    <h1>Edit User</h1>
                                    {loadingUpdate && <Loader />}
                                    {errorUpdate && (
                                        <Message variant='danger'>
                                            {errorUpdate}
                                        </Message>
                                    )}
                                    {loading ? (
                                        <Loader />
                                    ) : error ? (
                                        <Message variant='danger'>
                                            {error}
                                        </Message>
                                    ) : (
                                        <Form>
                                            <Form.Group controlId='name'>
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control
                                                    type='name'
                                                    placeholder='Enter name'
                                                    value={fullName}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                ></Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='email'>
                                                <Form.Label>
                                                    Email Address
                                                </Form.Label>
                                                <Form.Control
                                                    type='email'
                                                    placeholder='Enter email'
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                ></Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId='isactive'>
                                                <Form.Check
                                                    type='checkbox'
                                                    label='Is Active'
                                                    checked={isActive}
                                                    onChange={(e) =>
                                                        setIsActive(
                                                            e.target.checked
                                                        )
                                                    }
                                                ></Form.Check>
                                            </Form.Group>

                                            <Button
                                                type='submit'
                                                variant='primary'
                                                onClick={submitHandler}
                                            >
                                                Update
                                            </Button>
                                        </Form>
                                    )}
                                </FormContainer>
                            </div>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Redirect to='/login'></Redirect>
            )}
        </div>
    );
};

export default UserEditScreen;
