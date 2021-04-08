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

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (): void => {
    // TODO 1. 회원가입 로직을 작성해야 합니다.

    // TODO 2. 유효성 검사에 따른 에러메시지를 출력해야합니다.(setMessage 사용)
    if (!email || !password || !rePassword) {
      setMessage("모든 항목을 입력해주세요");
      return;
    }
    if (password !== rePassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isValidPassword(password)) {
      setMessage(
        "비밀번호는 8~20자의 영문, 숫자, 특수기호의 조합이어야합니다."
      );
      return;
    }
    // * 회원가입이 정상적으로 완료되면 로그인 화면으로 전환합니다.
    axios
      .post(`${scheme}://${host}:${port}/user/signup`, {
        email,
        username,
        password,
      })
      .then((data) => {
        props.handleModal(true, "LOGIN");
      })
      .catch((err) => console.log(err));
  };

  const handleOnChange = (event, type: string): void => {
    if (type === "EMAIL") setEmail(event.target.value);
    if (type === "USERNAME") setUsername(event.target.value);
    if (type === "PASSWORD") setPassword(event.target.value);
    if (type === "REPASSWORD") setRePassword(event.target.value);
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
      <div className="username">
        <span>Username</span>
        <input
          onChange={(e) => {
            handleOnChange(e, "USERNAME");
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
      <div className="password">
        <span>Confirm Password</span>
        <input
          type="password"
          onChange={(e) => {
            handleOnChange(e, "REPASSWORD");
          }}
        ></input>
      </div>

      <div className="message">{message}</div>
      <button className="btn-login" onClick={handleLogin}>
        회원가입
      </button>
    </React.Fragment>
  );
}
