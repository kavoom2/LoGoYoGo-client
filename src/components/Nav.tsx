import { RootState } from "../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../actions/index";
import { useHistory } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

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

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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

    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      history.push("/");
    }
  };

  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  const handleHamburger = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (sessionStorage.getItem("userinfo")) {
      let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
      const { username, email } = userinfo;
      dispatch(Actions.setUserInfo(username, email));
      dispatch(Actions.setLoginStatus(true));
    }
  }, []);

  const handleCloseHamburgerEvent = useCallback(() => {
    if (isMenuOpen) setIsMenuOpen(false);
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResizeEvent = () => {
      const stageWidth = document.body.clientWidth;
      if (stageWidth <= 768) setIsMobile(true);
      if (stageWidth > 768) setIsMobile(false);
    };

    window.addEventListener("resize", handleResizeEvent);
    handleResizeEvent();
    return () => {
      window.removeEventListener("resize", handleResizeEvent);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleCloseHamburgerEvent, false);
    return () => {
      window.removeEventListener("click", handleCloseHamburgerEvent);
    };
  }, [handleCloseHamburgerEvent]);

  const renderNav = () => {
    if (isMobile) {
      return "";
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  const renderHambuger = () => {
    if (isMobile) {
      return (
        <div id="nav-hamburger" className={isMenuOpen ? "active" : "inactive"}>
          {isLogin ? (
            <div
              className={
                isMenuOpen
                  ? "hamburger-items active"
                  : "hamburger-items inactive"
              }
            >
              <div className="hamburger-item" onClick={handleLogout}>
                로그아웃
              </div>
              <div className="hamburger-item" onClick={handleRedirectProfile}>
                프로필
              </div>
            </div>
          ) : (
            <div
              className={
                isMenuOpen
                  ? "hamburger-items active"
                  : "hamburger-items inactive"
              }
            >
              <div
                className="hamburger-item"
                onClick={() => {
                  handleModalOpen("LOGIN");
                }}
              >
                로그인
              </div>
              <div
                className="hamburger-item"
                onClick={() => {
                  handleModalOpen("SIGNUP");
                }}
              >
                회원가입
              </div>
            </div>
          )}
        </div>
      );
    } else return "";
  };

  return (
    <>
      <div id="nav">
        <span className="title" onClick={() => history.push("/")}>
          LOGOYOGO
        </span>
        {isMobile ? (
          !isMenuOpen ? (
            <span className="title-burger">
              <FontAwesomeIcon icon={faBars} onClick={handleHamburger} />
            </span>
          ) : (
            <span className="title-burger">
              <FontAwesomeIcon icon={faTimes} onClick={handleHamburger} />
            </span>
          )
        ) : (
          ""
        )}

        {renderNav()}
      </div>
      {renderHambuger()}
    </>
  );
}
