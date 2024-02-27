import { combineReducers } from "redux";
import ProductReducer from "../reducers/ProductReducer";
import AuthReducer from "../reducers/AuthReducer";

const rootReducer = combineReducers({
    product:ProductReducer,
    Auth:AuthReducer,
});

export default rootReducer