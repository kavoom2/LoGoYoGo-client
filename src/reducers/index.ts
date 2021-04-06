import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import accessTokenReducer from "./accessTokenReducer";
import userInfo from "./userInfoReducer";

const rootReducer = combineReducers({
  loginReducer,
  accessTokenReducer,
  userInfo,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
