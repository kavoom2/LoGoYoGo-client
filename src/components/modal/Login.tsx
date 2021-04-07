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
        dispatch(Actions.setAccessToken);
        dispatch(Actions.setLoginStatus(true));
        return axios.post(`${scheme}://${host}:${port}/user/userinfo`, {
          accessToken: token,
        });
      })
      .then((data) => {
        console.log(data);
        const { email } = data.data;
        dispatch(Actions.setUserInfo(email));
        props.handleModal(false, "");
      })
      .catch((err) => {
        console.log(err);
      });
    // TODO 3. 정상적으로 로그인되면 모달을 종료합니다.
  };

  const handleOnChange = (event, type: string): void => {
    if (type === "EMAIL") setEmail(event.target.value);
    if (type === "PASSWORD") setPassword(event.target.value);
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
        ></input>
      </div>
      <div className="message">{message}</div>
      <button className="btn-login" onClick={handleLogin}>
        로그인
      </button>
    </React.Fragment>
  );
}
