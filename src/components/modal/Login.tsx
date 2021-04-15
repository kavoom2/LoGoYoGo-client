import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../actions/index";
import { isValidEmail, isValidPassword } from "../../utilities/index";

require("dotenv").config();
const axios: any = require("axios");
axios.default.withCredentials = true;
const scheme: string = process.env.REACT_APP_SERVER_SCHEME;
const host: string = process.env.REACT_APP_SERVER_HOST;
const port: string = process.env.REACT_APP_SERVER_PORT;

export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleModalOpen = (type) => {
    dispatch(Actions.setModalStatus(true));
    dispatch(Actions.setModalType(type));
  };

  // TODO 1. 로그인 로직을 작성해야 합니다.
  const handleLogin = (): void => {
    // TODO 2. 유효성 검사에 따른 에러메시지를 출력해야합니다.(setMessage 사용)
    if (!email || !password) {
      setMessage("이메일과 비밀번호를 전부 입력해주세요.");
      return;
    }

    axios
      .post(
        `${scheme}://${host}:${port}/user/signin`,
        { email, password },
        { withCredentials: true, crossDomain: true }
      )
      .then((data) => {
        const token = data.data.accessToken;
        dispatch(Actions.setAccessToken(token));
        dispatch(Actions.setLoginStatus(true));
        return axios.post(`${scheme}://${host}:${port}/user/userinfo`, {
          accessToken: token,
        });
      })
      .then((data) => {
        const username = data.data.data.name;
        const email = data.data.data.email;
        const json = { username: username, email: email };
        dispatch(Actions.setUserInfo(username, email));
        props.handleModal(false, "");
        sessionStorage.removeItem("canvas");
        sessionStorage.setItem("userinfo", JSON.stringify(json));
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 404) setMessage("아이디 또는 비밀번호가 틀렸습니다.");
        console.log(err);
      });
    // TODO 3. 정상적으로 로그인되면 모달을 종료합니다.
  };

  const handleOnChange = (event, type: string): void => {
    if (type === "EMAIL") setEmail(event.target.value);
    if (type === "PASSWORD") setPassword(event.target.value);
  };

  const gitOauth = (): void => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=6aa0dad3f84236a84221"
    );
  };

  const enter = (e): void => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <React.Fragment>
      <div className="email">
        <span>Email</span>
        <input
          onChange={(e) => {
            handleOnChange(e, "EMAIL");
          }}
        ></input>
      </div>
      <div className="password">
        <span>Password</span>
        <input
          type="password"
          onChange={(e) => {
            handleOnChange(e, "PASSWORD");
          }}
          onKeyPress={enter}
        ></input>
      </div>
      <div className="message">{message}</div>
      <button className="btn-login" onClick={handleLogin}>
        로그인
      </button>
      <button className="btn-login" onClick={() => handleModalOpen("SIGNUP")}>
        회원가입
      </button>
      <button className="btn-login" onClick={gitOauth}>
        git 로그인
      </button>
    </React.Fragment>
  );
}
