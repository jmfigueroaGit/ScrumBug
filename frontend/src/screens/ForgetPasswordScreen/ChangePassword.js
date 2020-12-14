import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Controls from '../../components/controls/Control';
import { useForm } from './useForm';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../actions/userActions';
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

export const ChangePassword = (props) => {
    const history = useHistory();
    const { values, inputChange } = props;

    const validate = (fieldValues = values) => {
        let temp = { ...errorMessage };
        if ('password' in fieldValues)
            temp.password =
                fieldValues.password.length >= 6
                    ? ''
                    : 'Minimum of 6 numbers required.';
        setError({
            ...temp,
        });
        if ('confirmPassword' in fieldValues)
            temp.confirmPassword =
                fieldValues.confirmPassword.length > 3
                    ? ''
                    : 'Minimum of 6 numbers required.';
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
            if (values.password === values.confirmPassword) {
                dispatch(forgetPassword(values.email, values.password));
                history.push('/login');
            }
        }
    };
    return (
        <Form>
            {' '}
            <Container style={theme.root}>
                <Row>
                    <Col style={theme.mainPanel}>
                        <h1 style={theme.text}>Credentials</h1>
                        {error && <Message variant='danger'>{error}</Message>}
                        {loading && <Loader />}
                        <Container style={theme.field}>
                            <Controls.Input
                                label='Password'
                                name='password'
                                value={values.password}
                                onChange={inputChange('password')}
                                type='password'
                                error={errorMessage.password}
                            />
                            <Controls.Input
                                label='Confirm Password'
                                name='password'
                                value={values.confirmPassword}
                                onChange={inputChange('confirmPassword')}
                                type='password'
                                error={errorMessage.confirmPassword}
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
                        <Link to={'/register'}>
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

export default ChangePassword;
