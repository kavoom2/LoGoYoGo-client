import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import accessTokenReducer from "./accessTokenReducer";
import modalStatusReducer from "./modalStatusReducer";
import modalTypeReducer from "./modalTypeReducer";
import userInfo from "./userInfoReducer";

const rootReducer = combineReducers({
  loginReducer,
  accessTokenReducer,
  modalStatusReducer,
  modalTypeReducer,
  userInfo,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
