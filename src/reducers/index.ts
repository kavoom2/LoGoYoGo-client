import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import accessTokenReducer from "./accessTokenReducer";
import modalStatusReducer from "./modalStatusReducer";
import modalTypeReducer from "./modalTypeReducer";
import userInfoReducer from "./userInfoReducer";

const rootReducer = combineReducers({
  loginReducer,
  accessTokenReducer,
  modalStatusReducer,
  modalTypeReducer,
  userInfoReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
