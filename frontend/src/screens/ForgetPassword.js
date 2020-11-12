import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { forgetPassword } from '../actions/userActions';

const ForgetPassword = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answer, setAnswer] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const dispatch = useDispatch();

    const userForget = useSelector((state) => state.userForget);
    const { loading, error, user } = userForget;

    useEffect(() => {
        if (user) {
            history.push(redirect);
        }
    }, [history, user, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgetPassword(email, password, questions, answer));
    };
    return (
        <FormContainer>
            <Card
                border='danger'
                style={{
                    width: '30rem',
                    height: '25rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    marginTop: '20vh',
                }}
            >
                <h1 className='text-center' style={{ color: 'white' }}>
                    Sign In
                </h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className='mt-5'>
                    <Form.Group controlId='email'>
                        <Form.Control
                            className='ml-4'
                            style={{ width: '27rem' }}
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='questions'>
                        <Form.Control
                            as='select'
                            className='ml-4'
                            style={{ width: '27rem' }}
                            onChange={(e) => setQuestions(e.target.value)}
                            value={questions}
                            placeholder='Select Questions'
                        >
                            <option key='blankChoice' hidden value>
                                Select Questions
                            </option>
                            <option>What is your favorite book?</option>
                            <option>
                                What is the name of the road you grew up on?
                            </option>
                            <option>What is your mother’s maiden name?</option>
                            <option>
                                What was the name of your first/current/favorite
                                pet?
                            </option>
                            <option>
                                What was the first company that you worked for?
                            </option>
                            <option>Where did you meet your spouse?</option>
                            <option>
                                Where did you go to high school/college?
                            </option>
                            <option>What is your favorite food?</option>
                            <option>What city were you born in?</option>
                            <option>
                                Where is your favorite place to vacation?
                            </option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='answer'>
                        <Form.Control
                            className='ml-4'
                            style={{ width: '27rem' }}
                            type='name'
                            placeholder='Enter Your Answer'
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password'>
                        <Form.Control
                            className='ml-4'
                            style={{ width: '27rem' }}
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        type='submit'
                        variant='danger'
                        className='ml-4 '
                        style={{ width: '27rem' }}
                    >
                        Sign In
                    </Button>
                </Form>
                <Row className='py-3 text-center' style={{ fontSize: '1em' }}>
                    <Col>
                        <Link
                            to={'/ForgetPassword'}
                            style={{
                                color: 'white',
                                textDecoration: 'underline',
                            }}
                        >
                            Forget Password?
                        </Link>
                    </Col>
                </Row>{' '}
                <Row className='text-center' style={{ fontSize: '1em' }}>
                    <Col>
                        Doesn't have an account yet?{' '}
                        <Link
                            to={
                                redirect
                                    ? `/register?redirect=${redirect}`
                                    : '/register'
                            }
                            style={{
                                color: 'white',
                                textDecoration: 'underline',
                            }}
                        >
                            Register
                        </Link>
                    </Col>
                </Row>{' '}
            </Card>
        </FormContainer>
    );
};

export default ForgetPassword;
