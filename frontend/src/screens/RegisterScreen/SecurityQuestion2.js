import React, { useEffect, useState } from 'react';
import Controls from '../../components/controls/Control';
import { Container } from '@material-ui/core';
import { Col, Form, Row } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { securityQuestion2 } from '../../actions/userActions';
import Message from '../../components/Message';

export const getQuestionCollection = () => [
    { id: '1', title: 'Where did you go to high school/college?' },
    { id: '2', title: 'What is your favorite food?' },
    { id: '3', title: 'What city were you born in?' },
    { id: '4', title: 'Where is your favorite place to vacation?' },
    { id: '5', title: 'Where did you meet your Best Friend?' },
];
const theme = {
    root: {
        width: '60%',
        position: 'absolute',
        marginTop: '2.5rem',
        marginLeft: '18rem',
    },
    field: {
        width: '50px',
    },
    controls: {
        marginTop: '3rem',
        width: '150px',
        marginLeft: '3.7rem',
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
    finishSelect: {
        backgroundColor: 'black',
        width: '19%',
        textAlign: 'center',
        fontSize: '15px',
        padding: '5px',
        border: '2px solid #040404',
        borderRadius: '100%',
        color: 'gray',
        fontWeight: '900',
    },
    select: {
        backgroundColor: 'black',
        width: '19%',
        textAlign: 'center',
        fontSize: '15px',
        padding: '5px',
        border: '2px solid #000000',
        borderRadius: '100%',
        color: '#FFD700',
        fontWeight: '900',
    },
    step: {
        width: '19%',
        textAlign: 'center',
        fontSize: '15px',
        padding: '5px',
        border: '2px solid #000000',
        borderRadius: '100%',
        color: 'black',
        fontWeight: '900',
    },
};

export const SecurityQuestion = () => {
    const history = useHistory();
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { error, userInfo } = userRegister;

    const userAuthentication1 = useSelector(
        (state) => state.userAuthentication_v1
    );
    const { authentication_v1 } = userAuthentication1;

    const userAuthentication = useSelector(
        (state) => state.userAuthentication_v2
    );
    const { authentication_v2 } = userAuthentication;

    useEffect(() => {
        if (authentication_v2) {
            history.push('/register/security-question-v3');
        }
    }, [history, authentication_v2]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (question.length === 0 || answer.length === 0) {
            setMessage('Please fill in required fields');
        } else
            dispatch(
                securityQuestion2(
                    userInfo.fullName,
                    userInfo.email,
                    userInfo.password,
                    authentication_v1.question1,
                    authentication_v1.answer1,
                    question,
                    answer
                )
            );
    };

    return (
        <Form>
            {userInfo ? (
                <Container style={theme.root}>
                    <Row>
                        <Col style={theme.mainPanel}>
                            <h1 style={theme.text}>Credentials</h1>
                            <Container>
                                <Row
                                    style={{
                                        paddingLeft: '10rem',
                                    }}
                                >
                                    <Col xs>
                                        <div style={theme.finishSelect}>1</div>
                                    </Col>
                                    <Col xs>
                                        {' '}
                                        <div style={theme.select}>2</div>
                                    </Col>
                                    <Col xs>
                                        {' '}
                                        <div style={theme.step}>3</div>
                                    </Col>
                                </Row>
                            </Container>
                            <Container
                                style={{
                                    paddingLeft: '14rem',
                                    paddingTop: '2rem',
                                }}
                            >
                                {message && (
                                    <Message variant='danger'>
                                        {message}
                                    </Message>
                                )}
                                {error && (
                                    <Message variant='danger'>{error}</Message>
                                )}
                            </Container>
                            <Container
                                maxWidth='xs'
                                style={{ paddingTop: '4rem' }}
                            >
                                <Controls.Select
                                    name='question'
                                    label='Questions'
                                    options={getQuestionCollection()}
                                    value={question}
                                    onChange={(e) =>
                                        setQuestion(e.target.value)
                                    }
                                />
                                <Controls.Input
                                    name='answer'
                                    label='Answer'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                            </Container>
                            <Row>
                                <Col md={4}>
                                    <Link to='/login'>
                                        <Controls.Button
                                            type='submit'
                                            text='Back'
                                            style={theme.controls}
                                        />
                                    </Link>
                                </Col>
                                <Col xs={4}></Col>
                                <Col md={4}>
                                    <Controls.Button
                                        type='submit'
                                        text='Submit'
                                        onClick={submitHandler}
                                        style={theme.controls}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            ) : (
                <Redirect to='/login'></Redirect>
            )}
        </Form>
    );
};

export default SecurityQuestion;
