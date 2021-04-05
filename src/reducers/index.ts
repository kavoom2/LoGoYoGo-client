import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import accessTokenReducer from "./accessTokenReducer";

const rootReducer = combineReducers({
  loginReducer,
  accessTokenReducer,
});

export default rootReducer;
