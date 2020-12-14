import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import Controls from '../../components/controls/Control';
import { useDispatch, useSelector } from 'react-redux';
import { findUserAuth } from '../../actions/userActions';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
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

export const AccountSetup = (props) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userEmailAuth = useSelector((state) => state.userEmailAuth);
    const { loading, error, user } = userEmailAuth;

    useEffect(() => {
        if (user) {
            history.push('/authentication-1');
        }
    }, [history, user]);

    const handleInput = (e) => {
        e.preventDefault();
        if (email.length === 0) {
            setMessage('Please fill in required fields');
        } else {
            dispatch(findUserAuth(email));
        }
    };

    return (
        <Form>
            <Container style={theme.root}>
                <Row>
                    <Col style={theme.mainPanel}>
                        <h1 style={theme.text}>Credentials</h1>
                        <Container>
                            {message && (
                                <Message variant='danger'>{message}</Message>
                            )}
                            {error && (
                                <Message variant='danger'>{error}</Message>
                            )}
                            {loading && <Loader />}
                        </Container>
                        <Container style={theme.field}>
                            <Controls.Input
                                label='Email'
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Controls.Button
                                type='submit'
                                text='Submit'
                                onClick={handleInput}
                            />
                        </Container>
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
                            Enter your personal details and start journey with
                            us
                        </p>
                        <Link to='/login'>
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
        </Form>
    );
};

export default AccountSetup;
