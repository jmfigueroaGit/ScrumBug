import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    dispatch(login(email, password));
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
          marginTop: '30vh',
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
            Doesn't have an account yet?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              Register
            </Link>
          </Col>
        </Row>{' '}
      </Card>
    </FormContainer>
  );
};

export default LoginScreen;
