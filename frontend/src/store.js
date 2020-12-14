import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userLoginReducer,
    userRegisterReducer,
    userEmailAuthReducer,
    userAuthenticationReducer_v1,
    userAuthenticationReducer_v2,
    userAuthenticationReducer_v3,
    userListReducer,
    userDetailsReducer,
    userUpdateReducer,
} from './reducers/userReducers';
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userEmailAuth: userEmailAuthReducer,
    userAuthentication_v1: userAuthenticationReducer_v1,
    userAuthentication_v2: userAuthenticationReducer_v2,
    userAuthentication_v3: userAuthenticationReducer_v3,
    userList: userListReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const userFromStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

const userCheckQuestionStorage = localStorage.getItem('userQuestion')
    ? JSON.parse(localStorage.getItem('userQuestion'))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    userForget: { user: userCheckQuestionStorage },
    userQuestion: { user: userFromStorage },
};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
