import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { Table, Button, Row, Col, ListGroup, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { listMovies, deleteMovie } from '../../actions/movieAction';
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
        marginLeft: '27rem',
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

const AdminMovies = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const movieList = useSelector((state) => state.movieList);
    const { loading, error, moviesList } = movieList;

    useEffect(() => {
        if (userInfo) {
            dispatch(listMovies());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);
    // const editHandler = (id) => {
    //     dispatch(getUserDetails(id));
    //     history.push(`/admin/user/${id}/edit`);
    // };

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            history.push('/login');
            dispatch(deleteMovie(id));
        }
    };

    return (
        <div style={theme.root}>
            {userInfo ? (
                <Container fluid>
                    {!movieList ? (
                        <Redirect to='/login'></Redirect>
                    ) : (
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
                                        style={theme.listItem}
                                    >
                                        <Link
                                            to='/admin/userList'
                                            style={{
                                                textDecoration: 'none',
                                                color: 'white',
                                                paddingLeft: '5px',
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
                                        style={theme.selectedItem}
                                        disabled
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
                                <Form style={theme.mainPanel}>
                                    <Container>
                                        <Row>
                                            <Col xs lg='5' style={theme.title}>
                                                <h1>Movies</h1>
                                            </Col>
                                            <Col
                                                xs
                                                lg='2'
                                                style={{ marginTop: '1.2rem' }}
                                            >
                                                <LinkContainer
                                                    to={`/admin/add-movie`}
                                                >
                                                    <Button
                                                        variant='danger'
                                                        className='btn-sm'
                                                    >
                                                        Add Movies
                                                    </Button>
                                                </LinkContainer>
                                            </Col>
                                        </Row>
                                    </Container>

                                    {loading ? (
                                        <Loader />
                                    ) : error ? (
                                        <Message variant='danger'>
                                            {error}
                                        </Message>
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
                                                    <th>TITLE</th>
                                                    <th>GENRE</th>
                                                    <th>DIRECTOR</th>
                                                    <th>EDIT MOVIE</th>
                                                    <th>DELETE MOVIE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {moviesList?.map((movie) => (
                                                    <tr key={movie._id}>
                                                        <td>{movie.title}</td>
                                                        <td>{movie.genre}</td>
                                                        <td>
                                                            {movie.director}
                                                        </td>
                                                        <td>
                                                            <LinkContainer
                                                                to={`/admin/user/${movie._id}/edit`}
                                                            >
                                                                <Button
                                                                    variant='light'
                                                                    className='btn-sm'
                                                                >
                                                                    <i className='fas fa-edit'></i>
                                                                </Button>
                                                            </LinkContainer>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                variant='danger'
                                                                className='btn-sm'
                                                                onClick={() =>
                                                                    deleteHandler(
                                                                        movie._id
                                                                    )
                                                                }
                                                            >
                                                                <i className='fas fa-trash'></i>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                    )}
                </Container>
            ) : (
                <Redirect to='/login'></Redirect>
            )}
        </div>
    );
};

export default AdminMovies;
