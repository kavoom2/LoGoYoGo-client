import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

// TODO 필요한 MiddleWare는 배열 안에 넣으세요.
const composeEnhancers = composeWithDevTools({
  // * Redux Devtool Helper입니다.
  // * name, actionsBlackList, actionsCreators....
});
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
