import axios from 'axios';
import {
    USER_DELETE_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_FORGET_FAIL,
    USER_FORGET_REQUEST,
    USER_FORGET_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_QUESTION_FAIL,
    USER_QUESTION_PROCEED,
    USER_QUESTION_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_DETAILS_RESET,
    USER_UPDATE_FAIL,
} from '../constant/userConstants';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/login',
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const forgetPassword = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGET_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(
            '/api/users/ForgetPassword',
            { email, password },
            config
        );

        dispatch({
            type: USER_FORGET_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userQuestion', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_FORGET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    document.location.href = '/login';
    dispatch({ type: USER_LIST_RESET });
};

export const register = (fullName, email, password, question, answer) => async (
    dispatch
) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            'api/users',
            { fullName, email, password, question, answer },
            config
        );

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        });

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const checkUser = (email, props) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('api/users/check', { email }, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
        });

        localStorage.setItem('user', JSON.stringify(data));
        props.nextStep();
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const findUser = (email, props) => async (dispatch) => {
    try {
        dispatch({
            type: USER_QUESTION_PROCEED,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post('api/users/find', { email }, config);

        dispatch({
            type: USER_QUESTION_SUCCESS,
            payload: data,
        });

        localStorage.setItem('user', JSON.stringify(data));
        props.nextStep();
    } catch (error) {
        dispatch({
            type: USER_QUESTION_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const compareData = (email, question, answer, props) => async (
    dispatch
) => {
    try {
        dispatch({
            type: USER_FORGET_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(
            'api/users/compare',
            { email, question, answer },
            config
        );

        dispatch({
            type: USER_FORGET_SUCCESS,
        });

        localStorage.setItem('userQuestion', JSON.stringify(data));
        props.nextStep();
    } catch (error) {
        dispatch({
            type: USER_FORGET_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users`, config);

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/users/${id}`, config);

        dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_DELETE_FAIL,
            payload: message,
        });
    }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`/api/users/${id}`, config);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        });
    }
};

export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/users/${user._id}`,
            user,
            config
        );

        dispatch({ type: USER_UPDATE_SUCCESS });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

        dispatch({ type: USER_DETAILS_RESET });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: message,
        });
    }
};

// export const getUserDetails = (id) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: USER_DETAILS_REQUEST,
//         });

//         const {
//             userLogin: { userInfo },
//         } = getState();

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//         };

//         const { data } = await axios.get(`api/users/${id}`, config);

//         dispatch({
//             type: USER_DETAILS_SUCCESS,
//             payload: data,
//         });
//     } catch (error) {
//         dispatch({
//             type: USER_DETAILS_FAIL,
//             payload:
//                 error.response && error.response.data.message
//                     ? error.response.data.message
//                     : error.message,
//         });
//     }
// };
