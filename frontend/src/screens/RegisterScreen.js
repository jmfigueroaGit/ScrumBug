import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
const RegisterScreen = ({ location, history }) => {
    const [questions, setQuestions] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState(null);

    const redirect = location.search ? location.search.split('=')[1] : '/';
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password do not match!');
        } else {
            dispatch(register(name, email, password, questions, answer));
        }
    };
    return (
        <FormContainer>
            {loading && <Loader />}
            <Card
                border='danger'
                style={{
                    width: '30rem',
                    height: '30rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    marginTop: '15vh',
                }}
            >
                <h1 className='text-center' style={{ color: 'white' }}>
                    Sign Up
                </h1>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <Form onSubmit={submitHandler} className='mt-5'>
                    <Form.Group controlId='name'>
                        <Form.Control
                            className='ml-4'
                            style={{ width: '27rem' }}
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

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

                    <Form.Group controlId='confirmPassword'>
                        <Form.Control
                            className='ml-4'
                            style={{ width: '27rem' }}
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                    <Button
                        type='submit'
                        variant='danger'
                        className='ml-4 '
                        style={{ width: '27rem' }}
                    >
                        Register
                    </Button>
                </Form>
                <Row className='py-3 text-center' style={{ fontSize: '1em' }}>
                    <Col>
                        Have an account?
                        <Link
                            to={
                                redirect
                                    ? `/login?redirect=${redirect}`
                                    : '/login'
                            }
                            style={{
                                color: 'white',
                                textDecoration: 'underline',
                            }}
                        >
                            Login
                        </Link>
                    </Col>
                </Row>{' '}
            </Card>
        </FormContainer>
    );
};

export default RegisterScreen;
