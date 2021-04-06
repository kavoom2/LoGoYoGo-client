import React from "react";
import { useState, useEffect } from "react";

export default function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState(
    "에러메시지입니다. 빈 값으로 변경하세요."
  );

  const handleLogin = (): void => {
    // TODO 1. 회원가입 로직을 작성해야 합니다.
    // TODO 2. 유효성 검사에 따른 에러메시지를 출력해야합니다.(setMessage 사용)
    // * 회원가입이 정상적으로 완료되면 로그인 화면으로 전환합니다.
    props.handleModal(true, "LOGIN");
  };

  const handleOnChange = (event, type: string): void => {
    if (type === "EMAIL") setEmail(event.target.value);
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
