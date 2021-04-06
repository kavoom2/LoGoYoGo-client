import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import accessTokenReducer from "./accessTokenReducer";
import modalStatusReducer from "./modalStatusReducer";
import modalTypeReducer from "./modalTypeReducer";

const rootReducer = combineReducers({
  loginReducer,
  accessTokenReducer,
  modalStatusReducer,
  modalTypeReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
