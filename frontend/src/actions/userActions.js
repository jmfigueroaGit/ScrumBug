import axios from 'axios';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_EMAIL_AUTH_REQUEST,
    USER_EMAIL_AUTH_SUCCESS,
    USER_EMAIL_AUTH_FAIL,
    USER_EMAIL_AUTH_RESET,
    USER_AUTHENTICATION_v1_FAIL,
    USER_AUTHENTICATION_v1_REQUEST,
    USER_AUTHENTICATION_v1_SUCCESS,
    USER_AUTHENTICATION_v1_RESET,
    USER_AUTHENTICATION_v2_FAIL,
    USER_AUTHENTICATION_v2_SUCCESS,
    USER_AUTHENTICATION_v2_REQUEST,
    USER_AUTHENTICATION_v2_RESET,
    USER_AUTHENTICATION_v3_FAIL,
    USER_AUTHENTICATION_v3_SUCCESS,
    USER_AUTHENTICATION_v3_REQUEST,
    USER_AUTHENTICATION_v3_RESET,
    USER_UPDATE_PASSWORD_FAIL,
    USER_UPDATE_PASSWORD_SUCCESS,
    USER_UPDATE_PASSWORD_REQUEST,
    USER_UPDATE_PASSWORD_RESET,
    USER_LIST_FAIL,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_RESET,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_RESET,
    USER_UPDATE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_REQUEST,
    MOVIE_LIST_REQUEST,
    MOVIE_LIST_SUCCESS,
    MOVIE_LIST_FAIL,
    MOVIE_ADD_REQUEST,
    MOVIE_ADD_SUCCESS,
    MOVIE_ADD_FAIL,
    MOVIE_ADD_RESET,
    MOVIE_UPDATE_REQUEST,
    MOVIE_UPDATE_SUCCESS,
    MOVIE_UPDATE_FAIL,
    MOVIE_UPDATE_RESET,
    MOVIE_DELETE_REQUEST,
    MOVIE_DELETE_SUCCESS,
    MOVIE_DELETE_FAIL,
    MOVIE_DELETE_RESET,
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
            '/api/users/register',
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

export const registerAuth = (fullName, email, password) => async (dispatch) => {
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
            '/api/users/auth',
            { fullName, email, password },
            config
        );
        dispatch({
            type: USER_REGISTER_SUCCESS,
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

export const findUserAuth = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_EMAIL_AUTH_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/forgotPassword/auth',
            { email },
            config
        );

        dispatch({
            type: USER_EMAIL_AUTH_SUCCESS,
            payload: data,
        });

        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_EMAIL_AUTH_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const authQuestion_1 = (email, answer) => async (dispatch) => {
    try {
        dispatch({
            type: USER_AUTHENTICATION_v1_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/forgotPassword/auth/v1',
            { email, answer },
            config
        );

        dispatch({
            type: USER_AUTHENTICATION_v1_SUCCESS,
            payload: data,
        });

        localStorage.setItem('authentication_v1', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_AUTHENTICATION_v1_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const authQuestion_2 = (email, answer) => async (dispatch) => {
    try {
        dispatch({
            type: USER_AUTHENTICATION_v2_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/forgotPassword/auth/v2',
            { email, answer },
            config
        );

        dispatch({
            type: USER_AUTHENTICATION_v2_SUCCESS,
            payload: data,
        });

        localStorage.setItem('authentication_v2', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_AUTHENTICATION_v2_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const authQuestion_3 = (email, answer) => async (dispatch) => {
    try {
        dispatch({
            type: USER_AUTHENTICATION_v3_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/forgotPassword/auth/v3',
            { email, answer },
            config
        );

        dispatch({
            type: USER_AUTHENTICATION_v3_SUCCESS,
            payload: data,
        });

        localStorage.setItem('authentication_v3', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_AUTHENTICATION_v3_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetPassword = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_UPDATE_PASSWORD_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.put(
            '/api/users/forgotPassword/resetPassword',
            { email, password },
            config
        );

        dispatch({
            type: USER_UPDATE_PASSWORD_SUCCESS,
            payload: data,
        });
        dispatch({ type: USER_EMAIL_AUTH_RESET });
        dispatch({ type: USER_AUTHENTICATION_v1_RESET });
        dispatch({ type: USER_AUTHENTICATION_v2_RESET });
        dispatch({ type: USER_AUTHENTICATION_v3_RESET });
        dispatch({ type: USER_UPDATE_PASSWORD_RESET });

        localStorage.setItem('userUpdate', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PASSWORD_FAIL,
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

        const { data } = await axios.get(`/api/users/admin`, config);

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

export const securityQuestion1 = (
    fullName,
    email,
    password,
    question1,
    answer1
) => async (dispatch) => {
    try {
        dispatch({
            type: USER_AUTHENTICATION_v1_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/auth/v1',
            { fullName, email, password, question1, answer1 },
            config
        );

        dispatch({
            type: USER_AUTHENTICATION_v1_SUCCESS,
            payload: data,
        });

        localStorage.setItem('authentication_v1', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_AUTHENTICATION_v1_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const securityQuestion2 = (
    fullName,
    email,
    password,
    question1,
    answer1,
    question2,
    answer2
) => async (dispatch) => {
    try {
        dispatch({
            type: USER_AUTHENTICATION_v2_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/auth/v2',
            {
                fullName,
                email,
                password,
                question1,
                answer1,
                question2,
                answer2,
            },
            config
        );

        dispatch({
            type: USER_AUTHENTICATION_v2_SUCCESS,
            payload: data,
        });

        localStorage.setItem('authentication_v2', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_AUTHENTICATION_v2_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const securityQuestion3 = (
    fullName,
    email,
    password,
    question1,
    answer1,
    question2,
    answer2,
    question3,
    answer3
) => async (dispatch) => {
    try {
        dispatch({
            type: USER_AUTHENTICATION_v3_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/auth/v3',
            {
                fullName,
                email,
                password,
                question1,
                answer1,
                question2,
                answer2,
                question3,
                answer3,
            },
            config
        );

        dispatch({
            type: USER_AUTHENTICATION_v3_SUCCESS,
            payload: data,
        });

        dispatch({ type: USER_AUTHENTICATION_v1_RESET });
        dispatch({ type: USER_AUTHENTICATION_v2_RESET });
        dispatch({ type: USER_AUTHENTICATION_v3_RESET });
        localStorage.removeItem('userInfo');
        document.location.href = '/login';
        dispatch({ type: USER_LIST_RESET });

        localStorage.setItem('authentication_v3', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_AUTHENTICATION_v3_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};


