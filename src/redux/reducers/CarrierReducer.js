import {SET_CARRIER, SET_LOGO} from "../ActionTypes";

const initialState = {
    name: 'Truckers Portal',
    email: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    factoring: false,
    factoringName: '',
    factoringStreet: '',
    factoringCity: '',
    factoringState: '',
    factoringZip: '',
    logo: ''
};

const setCarrierData = (carrierData) => {
    return {
        type: SET_CARRIER,
        payload: carrierData
    }
};

const setCarrierLogo = (logo) => {
    return {
        type: SET_LOGO,
        payload: logo
    }
};

export default function(state = initialState, action) {
    if (action.type === SET_CARRIER) {
        let newState = {
            ...action.payload,
            logo: state.logo
        };

        return newState;
    }else if(action.type === SET_LOGO) {
        return {
            ...state,
            logo: action.payload
        };
    }

    return state;
}

export {setCarrierData, setCarrierLogo};