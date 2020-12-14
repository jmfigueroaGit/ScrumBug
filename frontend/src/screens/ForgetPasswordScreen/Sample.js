import React from 'react';
import Controls from '../../components/controls/Control';
import { Container } from '@material-ui/core';
import { Col, Form, Row } from 'react-bootstrap';
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
    return (
        <div>
            <Form>
                <Container maxWidth='xs' style={theme.root}>
                    <Row>
                        <Col style={theme.mainPanel}>
                            <h1 style={theme.text}>Credentials</h1>
                            <Container
                                style={{ marginLeft: '-2rem' }}
                            ></Container>
                            <Container style={theme.field}>
                                <Controls.Select
                                    name='question'
                                    label='Questions'
                                    options={getQuestionCollection()}
                                />
                                <Controls.Input name='answer' label='Answer' />
                                <Controls.Button type='submit' text='Submit' />
                                <Controls.Button type='submit' text='Back' />
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    );
};

export default SecurityQuestion;
