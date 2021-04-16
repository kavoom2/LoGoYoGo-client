import { RootState } from "../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../actions/index";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );
  const accessToken = useSelector(
    (state: RootState) => state.accessTokenReducer.accessToken
  );
  const modalType = useSelector(
    (state: RootState) => state.modalTypeReducer.modalType
  );
  const isModalOpen = useSelector(
    (state: RootState) => state.modalStatusReducer.isModalOpen
  );

  // TODO: ---------- Event Handler ---------- //

  const handleModalOpen = (type) => {
    dispatch(Actions.setModalStatus(true));
    dispatch(Actions.setModalType(type));
  };

  // TODO: 로그아웃, 프로필 로직을 작성해야 합니다.

  const handleLogout = (): void => {
    dispatch(Actions.setUserInfo("", ""));
    dispatch(Actions.setLoginStatus(false));
    dispatch(Actions.setAccessToken(""));

    sessionStorage.removeItem("userinfo");
    sessionStorage.removeItem("accessToken");

    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      history.push("/");
    }

    history.push("/");
  };

  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  useEffect(() => {
    if (sessionStorage.getItem("userinfo")) {
      let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      const { username, email } = userinfo;
      dispatch(Actions.setUserInfo(username, email));
      dispatch(Actions.setLoginStatus(true));
    }
    if (sessionStorage.getItem("accessToken")) {
      let accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
      dispatch(Actions.setAccessToken(accessToken));
    }
  }, []);

  return (
    <div id="nav">
      <span className="title" onClick={() => history.push("/")}>
        LOGOYOGO
      </span>
      {isLogin ? (
        <span>
          <button className="btn-nav" onClick={handleLogout}>
            로그아웃
          </button>
          <button className="btn-nav" onClick={handleRedirectProfile}>
            프로필
          </button>
        </span>
      ) : (
        <span>
          <button
            className="btn-nav"
            onClick={() => {
              handleModalOpen("LOGIN");
            }}
          >
            로그인
          </button>
          <button
            className="btn-nav"
            onClick={() => {
              handleModalOpen("SIGNUP");
            }}
          >
            회원가입
          </button>
        </span>
      )}
    </div>
  );
}
