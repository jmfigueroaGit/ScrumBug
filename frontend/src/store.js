import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    userLoginReducer,
    userRegisterReducer,
    userForgetReducer,
    userQuestionReducer,
    userListReducer,
    userDeleteReducer,
    userDetailsReducer,
    userUpdateReducer,
} from './reducers/userReducers';
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userForget: userForgetReducer,
    userQuestion: userQuestionReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
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
