import {combineReducers} from "redux";
import TokenReducer from "./TokenReducer";

export default combineReducers({
    token: TokenReducer
});