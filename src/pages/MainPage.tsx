import Nav from "../components/Nav";
import LandingPart1 from "../components/LandingPart1";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { setLoginStatus, setUserInfo, setAccessToken } from "../actions/index";
import "../scss/MainPage.scss";
import "../scss/_CommonComponents.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";

require("dotenv").config();

export default function MainPage() {
  const dispatch = useDispatch();

  const loginState = useSelector((state: RootState) => state.loginReducer);
  const isLogin = loginState.isLogin;

  const handleSignout = (): void => {
    dispatch(setUserInfo("", ""));
    dispatch(setLoginStatus());
    dispatch(setAccessToken(""));
  };

  return (
    <div id="container-mainpage">
      <Nav />
      <LandingPart1 />
    </div>
  );
}
