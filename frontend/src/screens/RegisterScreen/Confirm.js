import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { useHistory, useLocation } from 'react-router-dom';

export const Confirm = (props) => {
    const {
        values: { fullName, email, password, question, answer },
    } = props;
    const history = useHistory();
    const location = useLocation();
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
        dispatch(register(fullName, email, password, question, answer));
    };

    const back = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    return (
        <div className='form-container'>
            <h1 className='mb-5'>Confirm</h1>
            <ul class='list-group'>
                <li className='list-group-item'>Name: {fullName}</li>
                <li className='list-group-item'>Email: {email}</li>
                <li className='list-group-item'>Password: {password}</li>
                <li className='list-group-item'>
                    Security Question: <a href={question}>{question}</a>
                </li>
                <li className='list-group-item'>
                    Answer: <a href={answer}>{answer}</a>
                </li>
            </ul>

            <br />
            <br />

            <div className='row'>
                <div className='col-6'>
                    <button className='btn btn-danger' onClick={back}>
                        Back
                    </button>
                </div>
                <div className='col-6 text-right'>
                    <button className='btn btn-primary' onClick={submitHandler}>
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Confirm;
