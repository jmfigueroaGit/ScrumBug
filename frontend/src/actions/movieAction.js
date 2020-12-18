import axios from 'axios';
import {
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
    MOVIE_DETAILS_REQUEST,
    MOVIE_DETAILS_SUCCESS,
    MOVIE_DETAILS_FAIL,
    MOVIE_DETAILS_RESET,
    NOW_LIST_REQUEST,
    NOW_LIST_SUCCESS,
    NOW_LIST_FAIL,
    COMING_LIST_REQUEST,
    COMING_LIST_SUCCESS,
    COMING_LIST_FAIL,
} from '../constant/movieConstants';
import { USER_LIST_RESET } from '../constant/userConstants';
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    document.location.href = '/login';
    dispatch({ type: USER_LIST_RESET });
};

export const listMovies = () => async (dispatch) => {
    try {
        dispatch({
            type: MOVIE_LIST_REQUEST,
        });

        const { data } = await axios.get(`/api/users/movie/list`);

        dispatch({
            type: MOVIE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MOVIE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listComingSoon = () => async (dispatch) => {
    try {
        dispatch({
            type: COMING_LIST_REQUEST,
        });

        const { data } = await axios.get(
            `/api/users/movie/coming?status=Coming Soon`
        );

        dispatch({
            type: COMING_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: COMING_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const listNowShowing = () => async (dispatch) => {
    try {
        dispatch({
            type: NOW_LIST_REQUEST,
        });

        const { data } = await axios.get(
            `/api/users/movie/filter?status=Now Showing`
        );

        dispatch({
            type: NOW_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NOW_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const deleteMovie = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOVIE_DELETE_REQUEST,
        });

        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        await axios.delete(`/api/users/admin/movie/${id}`, config);

        dispatch({
            type: MOVIE_DELETE_SUCCESS,
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
            type: MOVIE_DELETE_FAIL,
            payload: message,
        });
    }
};

export const addMovie = (
    movieTitle,
    genre,
    mainCast,
    director,
    poster,
    language,
    rating,
    cinemaNumber,
    releasedDate,
    endScreening,
    startTime,
    endTime,
    duration,
    status
) => async (dispatch) => {
    try {
        dispatch({
            type: MOVIE_ADD_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const { data } = await axios.post(
            '/api/users/admin/movie/add',
            {
                movieTitle,
                genre,
                mainCast,
                director,
                poster,
                language,
                rating,
                cinemaNumber,
                releasedDate,
                endScreening,
                startTime,
                endTime,
                duration,
                status,
            },
            config
        );

        dispatch({
            type: MOVIE_ADD_SUCCESS,
            payload: data,
        });

        localStorage.setItem('movieInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: MOVIE_ADD_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateMovie = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOVIE_UPDATE_REQUEST,
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

        dispatch({ type: MOVIE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === 'Not authorized, token failed') {
            dispatch(logout());
        }
        dispatch({
            type: MOVIE_UPDATE_FAIL,
            payload: message,
        });
    }
};

export const getMovieDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: MOVIE_DETAILS_REQUEST,
        });

        const {
            movieDetails: { movie },
        } = getState();

        const { data } = await axios.get(`/api/users/admin/movie/${id}`);

        dispatch({
            type: MOVIE_DETAILS_SUCCESS,
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
            type: MOVIE_DETAILS_FAIL,
            payload: message,
        });
    }
};
