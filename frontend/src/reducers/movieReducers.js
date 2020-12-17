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
} from '../constant/movieConstants';

export const movieListReducer = (state = { moviesList: [] }, action) => {
    switch (action.type) {
        case MOVIE_LIST_REQUEST:
            return { loading: true };
        case MOVIE_LIST_SUCCESS:
            return { loading: false, moviesList: action.payload };
        case MOVIE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const movieAddReducer = (state = { movie: {} }, action) => {
    switch (action.type) {
        case MOVIE_ADD_REQUEST:
            return { loading: true };
        case MOVIE_ADD_SUCCESS:
            return { loading: false, movies: action.payload };
        case MOVIE_ADD_FAIL:
            return { loading: false, error: action.payload };
        case MOVIE_ADD_RESET:
            return { movies: {} };
        default:
            return state;
    }
};

export const movieUpdateReducer = (state = { movie: {} }, action) => {
    switch (action.type) {
        case MOVIE_UPDATE_REQUEST:
            return { loading: true };
        case MOVIE_UPDATE_SUCCESS:
            return { loading: false, movie: action.payload };
        case MOVIE_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case MOVIE_UPDATE_RESET:
            return { movies: {} };
        default:
            return state;
    }
};

export const movieDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case MOVIE_DELETE_REQUEST:
            return { loading: true };
        case MOVIE_DELETE_SUCCESS:
            return { loading: false, success: true };
        case MOVIE_DELETE_FAIL:
            return { loading: false, error: action.payload };
        case MOVIE_DELETE_RESET:
            return { movies: {} };
        default:
            return state;
    }
};
