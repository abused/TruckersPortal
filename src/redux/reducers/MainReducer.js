import {combineReducers} from "redux";
import TokenReducer from "./TokenReducer";
import CarrierReducer from "./CarrierReducer";

export default combineReducers({
    token: TokenReducer,
    carrier: CarrierReducer
});