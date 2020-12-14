import React from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Controls from '../../components/controls/Control';
import { useForm } from './useForm';
import { useDispatch, useSelector } from 'react-redux';
import { registerAuth } from '../../actions/userActions';
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

export const AccountSetup = (props) => {
    const { values, inputChange } = props;
    const validate = (fieldValues = values) => {
        let temp = { ...errorMessage };
        if ('fullName' in fieldValues)
            temp.fullName = fieldValues.fullName
                ? ''
                : 'This field is required.';
        if ('email' in fieldValues)
            temp.email =
                /$^|.+@.+..+/.test(fieldValues.email) && fieldValues.email
                    ? ''
                    : 'Email is not valid.';
        if ('password' in fieldValues)
            temp.password =
                fieldValues.password.length > 3
                    ? ''
                    : 'Minimum of 11 numbers required.';
        setError({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === '');
    };

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error } = userRegister;

    const dispatch = useDispatch();

    const { errorMessage, setError } = useForm(values, true, validate);

    const handleInput = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(registerAuth(values.email, props));
        }
    };
    return (
        <Form>
            {' '}
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
                        <Container style={theme.container}>
                            {error && (
                                <Message variant='danger'>{error}</Message>
                            )}
                            {loading && <Loader />}
                        </Container>

                        <Container style={theme.field}>
                            <Controls.Input
                                label='Full Name'
                                name='fullName'
                                value={values.fullName}
                                onChange={inputChange('fullName')}
                                error={errorMessage.fullName}
                            />
                            <Controls.Input
                                label='Email'
                                name='email'
                                value={values.email}
                                onChange={inputChange('email')}
                                error={errorMessage.email}
                            />
                            <Controls.Input
                                label='Password'
                                name='password'
                                value={values.password}
                                onChange={inputChange('password')}
                                type='password'
                                error={errorMessage.password}
                            />
                            <Controls.Button
                                type='submit'
                                text='Submit'
                                onClick={handleInput}
                                style={theme.controls}
                            />
                        </Container>
                        <Col
                            style={{
                                color: 'black',
                                textAlign: 'center',
                            }}
                        >
                            Already have an account?{' '}
                            <Link
                                to={'/login'}
                                style={{
                                    color: 'blue',
                                    textDecoration: 'underline',
                                }}
                            >
                                Login
                            </Link>
                        </Col>
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};

export default AccountSetup;
