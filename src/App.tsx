import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainPage from "./pages/MainPage";
import Maker from "./pages/Maker";
import Profile from "./pages/Profile";
//모달 구현에 앞서서 렌더링 테스트
import SignUp from "./components/SignUp";
import Signin from "./components/Signin";

import "./css/App.css";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";

function App() {
  const loginState = useSelector((state: RootState) => state.loginReducer);
  const isLogin = loginState.isLogin;

  console.log(isLogin);

  return (
    <Router>
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/profile" component={Profile} />
        <Route path="/maker" component={Maker} />
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
