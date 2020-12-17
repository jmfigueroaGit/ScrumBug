import React, { useState, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Container } from '@material-ui/core';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { authQuestion_3 } from '../../actions/userActions';
import Controls from '../../components/controls/Control';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

const theme = {
    root: {
        width: '60%',
        position: 'absolute',
        marginTop: '2.5rem',
        marginLeft: '33rem',
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

const Authentication2 = () => {
    const history = useHistory();
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState(null);

    const userEmailAuth = useSelector((state) => state.userEmailAuth);
    const { loading, error, user } = userEmailAuth;

    const dispatch = useDispatch();

    const userAuthentication = useSelector(
        (state) => state.userAuthentication_v3
    );
    const { authentication_v3 } = userAuthentication;

    useEffect(() => {
        if (authentication_v3) {
            history.push('/resetPassword');
        }
    }, [history, authentication_v3]);
    const handleInput = (e) => {
        e.preventDefault();
        if (answer.length === 0) {
            setMessage('Please fill in required fields');
        } else {
            dispatch(authQuestion_3(user.email, answer));
        }
    };

    return (
        <div>
            <Form>
                <Container maxWidth='xs' style={theme.root}>
                    <Row>
                        <Col style={theme.mainPanel}>
                            <h1 style={theme.text}>Credentials</h1>
                            <Container style={{ marginLeft: '-2rem' }}>
                                {message && (
                                    <Message variant='danger'>
                                        {message}
                                    </Message>
                                )}
                                {error && (
                                    <Message variant='danger'>{error}</Message>
                                )}
                                {loading && <Loader />}
                            </Container>
                            <Container style={theme.field}>
                                {user ? (
                                    <h5>{user.question3}</h5>
                                ) : (
                                    <Redirect to='/login'></Redirect>
                                )}

                                <Controls.Input
                                    name='answer'
                                    label='Answer'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />

                                <Controls.Button
                                    type='submit'
                                    text='Submit'
                                    onClick={handleInput}
                                />
                                <Link to='/login'>
                                    <Controls.Button
                                        type='submit'
                                        text='Back'
                                    />
                                </Link>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    );
};

export default Authentication2;
