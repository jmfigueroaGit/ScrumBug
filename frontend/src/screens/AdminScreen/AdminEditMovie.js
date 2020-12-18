import React, { useEffect, useState, useRef } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import {
    Button,
    Row,
    Col,
    ListGroup,
    Container,
    Form as FormContainer,
    Image,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    getMovieDetails,
    listMovies,
    updateMovie,
} from '../../actions/movieAction';
import { Form } from '../RegisterScreen/useForm';
import Controls from '../../components/controls/Control';
import FileUpload from './FileUpload.js';
import moment from 'moment';
import { MOVIE_ADD_SUCCESS } from '../../constant/movieConstants';
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
    input: {
        fontSize: '12px',
        margin: '0',
        padding: '0',
    },
    fixed: {
        margin: '0',
        padding: '0',
    },
};

const AdminMovies = ({ history, match }) => {
    let [movieTitle, setMovieTitle] = useState('');
    let [genre, setGenre] = useState('');
    let [mainCast, setMainCast] = useState('');
    let [director, setDirector] = useState('');
    let [language, setLanguage] = useState('');
    let [rating, setRating] = useState('');
    let [cinemaNumber, setCinemaNumber] = useState('');
    let [poster, setPoster] = useState('');
    const [message, setMessage] = useState(null);
    let [duration] = useState('');
    const dispatch = useDispatch();
    let status = '';

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const movieList = useSelector((state) => state.movieList);

    const movieDetails = useSelector((state) => state.movieDetails);
    const { loading, error, movie } = movieDetails;

    const movieUpdate = useSelector((state) => state.movieUpdate);
    const { movieAdd } = movieUpdate;
    const movieId = match.params.id;
    useEffect(() => {
        if (movieAdd) {
            if (movie) {
                setMovieTitle(movie.movieTitle);
                setGenre(movie.genre);
                setMainCast(movie.mainCast);
                setDirector(movie.director);
                setLanguage(movie.language);
                setRating(movie.rating);
                setCinemaNumber(movie.cinemaNumber);
                setPoster(movie.poster);
            }
        }
    });

    const submit = (e) => {
        e.preventDefault();

        dispatch(
            updateMovie({
                _id: movieTitle,
                genre,
                mainCast,
                director,
                poster,
                language,
                rating,
                cinemaNumber,
            })
        );
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
                                {movie ? (
                                    <Form style={theme.mainPanel}>
                                        <Container>
                                            <Row>
                                                <Col
                                                    xs
                                                    lg='5'
                                                    style={theme.title}
                                                >
                                                    <h1>Movies</h1>
                                                </Col>
                                                <Col
                                                    xs
                                                    lg='2'
                                                    style={{
                                                        marginTop: '1.2rem',
                                                    }}
                                                >
                                                    <LinkContainer
                                                        to={`/admin/movies`}
                                                    >
                                                        <Button
                                                            variant='danger'
                                                            className='btn-sm'
                                                        >
                                                            Back
                                                        </Button>
                                                    </LinkContainer>
                                                </Col>
                                            </Row>
                                        </Container>
                                        <div style={{ marginLeft: '18.5rem' }}>
                                            {message && (
                                                <Message variant='danger'>
                                                    {message}
                                                </Message>
                                            )}
                                            {error && (
                                                <Message variant='danger'>
                                                    {error}
                                                </Message>
                                            )}
                                        </div>
                                        {loading ? (
                                            <Loader />
                                        ) : (
                                            <Container
                                                style={{ paddingTop: '5rem' }}
                                            >
                                                <Row
                                                    style={
                                                        {
                                                            // marginLeft: '6rem',
                                                            // paddingRight: '9rem',
                                                        }
                                                    }
                                                >
                                                    <Col md={4}>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Movie Title
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Movie Title'
                                                                    name='movieTitle'
                                                                    value={
                                                                        movieTitle
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setMovieTitle(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Genre
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Genre'
                                                                    name='genre'
                                                                    value={
                                                                        genre
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setGenre(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Main Cast
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Main Cast'
                                                                    name='mainCast'
                                                                    value={
                                                                        mainCast
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setMainCast(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col md={4}>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Director
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Director'
                                                                    name='director'
                                                                    value={
                                                                        director
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDirector(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Language
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Language'
                                                                    name='language'
                                                                    value={
                                                                        language
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setLanguage(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Rating
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Rating'
                                                                    name='rating'
                                                                    type='name'
                                                                    value={
                                                                        rating
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setRating(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={4}>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Cinema Number
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Cinema Number'
                                                                    name='fullName'
                                                                    value={
                                                                        cinemaNumber
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setCinemaNumber(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={theme.fixed}
                                                        >
                                                            <label
                                                                style={
                                                                    theme.input
                                                                }
                                                            >
                                                                Poster URL
                                                            </label>
                                                            <div
                                                                style={
                                                                    theme.fixed
                                                                }
                                                            >
                                                                <Controls.Input
                                                                    label='Cinema Number'
                                                                    name='fullName'
                                                                    value={
                                                                        poster
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setPoster(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginTop:
                                                                    '2.5rem',
                                                            }}
                                                        >
                                                            <Controls.Button
                                                                name='endTime'
                                                                text='Submit'
                                                                onClick={submit}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        )}
                                    </Form>
                                ) : (
                                    <Redirect to='/admin/movies'></Redirect>
                                )}
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
