import React, { useState, useEffect } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Controls from '../../components/controls/Control';
import { useDispatch, useSelector } from 'react-redux';
import { registerAuth } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const theme = {
    root: {
        width: '60%',
        position: 'absolute',
        marginTop: '2.5rem',
        marginLeft: '17rem',
    },
    field: {
        marginTop: '3rem',
    },
    controls: {
        marginTop: '1rem',
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
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        color: 'white',
        paddingTop: '8rem',
    },
    mainPanel: {
        background: 'linear-gradient(45deg, #FFFFFF 30%, #FFFFf8 90%)',
        height: '75vh',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    textLink: {
        color: 'black',
        fontSize: '1em',
    },
};

export const AccountSetup = () => {
    const history = useHistory();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo) {
            history.push('/register/security-question-v1');
        }
    }, [history, userInfo]);

    const handleInput = (e) => {
        e.preventDefault();
        if (
            email.length === 0 ||
            fullName.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
        ) {
            setMessage('Please fill in required fields');
        } else {
            if (password === confirmPassword)
                dispatch(registerAuth(fullName, email, password));
            else setMessage('Password mismatch');
        }
    };

    return (
        <Form>
            <Container style={theme.root}>
                <Row>
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
                            To keep connected with us please login with your
                            personal info
                        </p>
                        <Link to={'/login'}>
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
                                Sign In
                            </Button>
                        </Link>
                    </Col>
                    <Col style={theme.mainPanel}>
                        <h1 style={theme.text}>Credentials</h1>
                        {message && (
                            <Message variant='danger'>{message}</Message>
                        )}
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <Container style={theme.field}>
                            <Controls.Input
                                label='Full Name'
                                name='fullName'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <Controls.Input
                                label='Email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Controls.Input
                                label='Password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Controls.Input
                                label='Confirm Password'
                                name='password'
                                type='password'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            <Controls.Button
                                type='submit'
                                text='Submit'
                                style={theme.controls}
                                onClick={handleInput}
                            />
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};

export default AccountSetup;
