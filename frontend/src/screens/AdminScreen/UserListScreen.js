import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Table, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listUsers, getUserDetails } from '../../actions/userActions';
import { Form } from '../RegisterScreen/useForm';

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

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    const editHandler = (id) => {
        dispatch(getUserDetails(id));
        history.push(`/admin/user/${id}/edit`);
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
                        <Col sm={9} style={theme.mainBar}>
                            <Form style={theme.mainPanel}>
                                <h1 style={theme.title}>Users</h1>
                                {loading ? (
                                    <Loader />
                                ) : error ? (
                                    <Message variant='danger'>{error}</Message>
                                ) : (
                                    <Table
                                        striped
                                        bordered
                                        hover
                                        responsive
                                        className='table-sm '
                                        style={theme.text}
                                    >
                                        <thead>
                                            <tr>
                                                <th>NAME</th>
                                                <th>EMAIL</th>
                                                <th>ADMIN</th>
                                                <th>EDIT DETAILS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user._id}>
                                                    <td>{user.fullName}</td>
                                                    <td>
                                                        <a
                                                            href={`mailto:${user.email}`}
                                                        >
                                                            {user.email}
                                                        </a>
                                                    </td>
                                                    <td>
                                                        {user.isAdmin ? (
                                                            <i
                                                                className='fas fa-check'
                                                                style={{
                                                                    color:
                                                                        'green',
                                                                }}
                                                            ></i>
                                                        ) : (
                                                            <i
                                                                className='fas fa-times'
                                                                style={{
                                                                    color:
                                                                        'red',
                                                                }}
                                                            ></i>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <LinkContainer
                                                            to={`/admin/user/${user._id}/edit`}
                                                        >
                                                            <Button
                                                                variant='light'
                                                                className='btn-sm'
                                                                onClick={() =>
                                                                    editHandler(
                                                                        user._id
                                                                    )
                                                                }
                                                            >
                                                                <i className='fas fa-edit'></i>
                                                            </Button>
                                                        </LinkContainer>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Form>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Redirect to='/login'></Redirect>
            )}
        </div>
    );
};

export default UserListScreen;
