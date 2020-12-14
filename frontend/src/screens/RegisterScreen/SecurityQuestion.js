import React, { useEffect } from 'react';
import Controls from '../../components/controls/Control';
import { Container } from '@material-ui/core';
import { useForm } from './useForm';
import { Col, Form, Row } from 'react-bootstrap';
import {} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { register } from '../../actions/userActions';
export const getQuestionCollection = () => [
    { id: '1', title: 'What is the name of the road you grew up on?' },
    { id: '2', title: 'What is your mother’s maiden name?' },
    { id: '3', title: 'What was the name of your first/current/favorite pet?' },
    { id: '4', title: 'What was the first company that you worked for?' },
    { id: '5', title: 'Where did you meet your spouse?' },
];
const theme = {
    root: {
        width: '60%',
        position: 'absolute',
        marginTop: '2.5rem',
        marginLeft: '22rem',
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

export const SecurityQuestion = (props) => {
    const { values, inputChange } = props;
    const history = useHistory();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const dispatch = useDispatch();

    const validate = (fieldValues = values) => {
        let temp = { ...errorMessage };

        if ('question' in fieldValues)
            temp.question =
                fieldValues.question.length !== 0
                    ? ''
                    : 'This field is required';
        if ('answer' in fieldValues)
            temp.answer = fieldValues.answer ? '' : 'This field is required.';
        setError({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === '');
    };

    const { errorMessage, setError } = useForm(values, true, validate);

    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            register(
                values.fullName,
                values.email,
                values.password,
                values.question,
                values.answer
            )
        );
    };

    const back = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    return (
        <Form>
            <Container maxWidth='xs' style={theme.root}>
                <Row>
                    <Col style={theme.mainPanel}>
                        <h1 style={theme.text}>Credentials</h1>
                        <Controls.Select
                            name='question'
                            label='Questions'
                            value={values.question}
                            onChange={inputChange('question')}
                            options={getQuestionCollection()}
                            error={errorMessage.question}
                        />
                        <Controls.Input
                            name='answer'
                            label='Answer'
                            value={values.answer}
                            onChange={inputChange('answer')}
                            error={errorMessage.answer}
                        />
                        <Controls.Button
                            type='submit'
                            text='Submit'
                            onClick={submitHandler}
                        />
                        <Controls.Button
                            type='submit'
                            text='Back'
                            onClick={back}
                        />
                    </Col>
                </Row>
            </Container>
        </Form>
    );
};

export default SecurityQuestion;
