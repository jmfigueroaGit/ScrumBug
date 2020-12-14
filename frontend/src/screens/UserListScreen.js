import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, getUserDetails } from '../actions/userActions';
import { Form } from './RegisterScreen/useForm';

const theme = {
    root: {
        width: '60%',
        position: 'absolute',
        marginTop: '2.5rem',
        marginLeft: '22rem',
    },
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
    mainPanel: {
        background: 'linear-gradient(45deg, #FFFFFF 30%, #FFFFf8 90%)',
        height: '75vh',
        borderRadius: 30,
    },
    textLink: {
        color: 'black',
        fontSize: '1em',
    },
};

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, successDelete, userInfo]);

    const editHandler = (id) => {
        dispatch(getUserDetails(id));
        history.push(`/admin/user/${id}/edit`);
    };

    return (
        <Form style={theme.mainPanel}>
            <h1 style={theme.text}>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.fullName}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <i
                                            className='fas fa-check'
                                            style={{ color: 'green' }}
                                        ></i>
                                    ) : (
                                        <i
                                            className='fas fa-times'
                                            style={{ color: 'red' }}
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
                                                editHandler(user._id)
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
    );
};

export default UserListScreen;
