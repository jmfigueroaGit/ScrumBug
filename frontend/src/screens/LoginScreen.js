import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { useForm } from './RegisterScreen/useForm';
import { login } from '../actions/userActions';
import Controls from '../components/controls/Control';
import { useHistory, useLocation } from 'react-router-dom';
const theme = {
    root: {
        width: '60%',
        position: 'absolute',
        marginTop: '2.5rem',
        marginLeft: '6rem',
    },
    field: {
        marginTop: '3.5rem',
    },
    controls: {
        marginTop: '2rem',
    },
    container: {
        marginLeft: '-.7rem',
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
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    textLink: {
        color: 'black',
        fontSize: '1em',
    },
};

const LoginScreen = (props) => {
    const location = useLocation();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (email.length === 0 || password.length === 0) {
            setMessage('Please fill in required fields');
        } else {
            dispatch(login(email, password));
        }
    };
    return (
        <Container style={theme.root}>
            <Row>
                <Col style={theme.mainPanel}>
                    <h1 style={theme.text}>Credentials</h1>
                    <Container style={theme.container}>
                        {message && (
                            <Message variant='danger'>{message}</Message>
                        )}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                    </Container>
                    <Container style={theme.field}>
                        <Controls.Input
                            label='Email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Controls.Input
                            label='Password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                        />
                        <Controls.Button
                            type='submit'
                            text='Submit'
                            onClick={submitHandler}
                            style={theme.controls}
                        />
                    </Container>
                    <Row className='py-3 text-center' style={theme.textLink}>
                        <Col>
                            <Link
                                to={'/ForgetPassword'}
                                style={{
                                    textDecoration: 'underline',
                                }}
                            >
                                Forget Password?
                            </Link>
                        </Col>
                    </Row>{' '}
                </Col>
                <Col style={theme.sidePanel}>
                    <h1
                        style={{
                            fontSize: '3rem',
                            textAlign: 'center',
                            fontWeight: 1000,
                            color: 'white',
                        }}
                    >
                        ScrumBug Cinema
                    </h1>
                    <p
                        style={{
                            fontSize: '.9rem',
                            textAlign: 'center',
                            fontWeight: 1000,
                        }}
                    >
                        Enter your personal details and start journey with us
                    </p>
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : '/register'
                        }
                    >
                        <Button
                            variant='outline-info'
                            style={{
                                fontSize: '1em',
                                color: 'white',
                                width: '10vw',
                                borderRadius: 300,
                                marginLeft: '9em',
                            }}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginScreen;
