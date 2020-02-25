import {SET_LOGGEDIN, SET_TOKEN} from "../ActionTypes";
import {authenticateToken} from "../../utils/ServerUtils";

const initialState = {
    token: '',
    loggedIn: false
};

const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token
    };
};

const setLoggedIn = (loggedIn) => {
    return {
        type: SET_LOGGEDIN,
        payload: loggedIn
    }
};

export default function(state = initialState, action) {
    let newState = {...state};

    switch (action.type) {
        case SET_TOKEN:
            newState.token = action.payload;
            return newState;
        case SET_LOGGEDIN:
            newState.loggedIn = action.payload;
            if(!action.payload) {
                newState.token = '';
                localStorage.removeItem('token');
            }

            return newState;
        default:
            return state;
    }
}

export {setToken, setLoggedIn};