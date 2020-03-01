import {SET_LOGGEDIN, SET_TOKEN, SET_USERDATA} from "../ActionTypes";

const initialState = {
    token: '',
    loggedIn: false,
    user: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
    }
};

const setUserData = (userData) => {
    return {
        type: SET_USERDATA,
        payload: userData
    }
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
    let newState = {
        ...state,
        user: {
            ...state.user
        }
    };

    switch (action.type) {
        case SET_TOKEN:
            newState.token = action.payload;
            localStorage.setItem('token', newState.token);

            return newState;
        case SET_LOGGEDIN:
            newState.loggedIn = action.payload;
            if(!action.payload) {
                newState.token = '';
                newState.user.id = '';
                newState.user.firstName = '';
                newState.user.lastName = '';
                newState.user.email = '';
                newState.user.phoneNumber = '';
                localStorage.removeItem('token');
            }

            return newState;
        case SET_USERDATA:
            newState.user.id = action.payload.id;
            newState.user.firstName = action.payload.firstName;
            newState.user.lastName = action.payload.lastName;
            newState.user.email = action.payload.email;
            newState.user.phoneNumber = action.payload.phoneNumber;

            return newState;
        default:
            return state;
    }
}

export {setToken, setLoggedIn, setUserData};