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
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [msgEmail, setMsgEmail] = useState<string>("");
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const [msgUsername, setMsgUsername] = useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [msgPassword, setMsgPassword] = useState<string>("");
  const [isRePasswordValid, setIsRePasswordValid] = useState<boolean>(true);
  const [msgRePassword, setMsgRePassword] = useState<string>("");

  const handleLogin = (): void => {
    // TODO 1. 회원가입 로직을 작성해야 합니다.

    // TODO 2. 유효성 검사에 따른 에러메시지를 출력해야합니다.(setMessage 사용)
    if (!username) {
      setIsUsernameValid(false);
      setMsgUsername("이름을 입력해주세요.");
      return;
    }

    if (!email) {
      setIsEmailValid(false);
      setMsgEmail("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      setMsgPassword("비밀번호를 입력해주세요");
      return;
    }

    if (!rePassword) {
      setIsRePasswordValid(false);
      setMsgRePassword("비밀번호 확인을 입력해주세요.");
      return;
    }

    if (password !== rePassword) {
      return;
    }

    if (!isValidPassword(password) || !isValidEmail(email)) {
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

  const handleModalOpen = (type) => {
    dispatch(Actions.setModalStatus(true));
    dispatch(Actions.setModalType(type));
  };

  const handleOnChange = (event, type: string): void => {
    if (type === "EMAIL") {
      setEmail(event.target.value);
      if (event.target.value.length === 0) {
        setIsEmailValid(true);
        setMsgEmail("");
      } else if (isValidEmail(event.target.value)) {
        setIsEmailValid(true);
        setMsgEmail("");
      } else {
        setIsEmailValid(false);
        setMsgEmail("@을 포함한 이메일 주소를 입력해주세요.");
      }
    } else if (type === "USERNAME") {
      setUsername(event.target.value);
      if (event.target.value.length === 0) {
        setIsUsernameValid(true);
        setMsgUsername("");
      } else if (event.target.value.length > 0) {
        setIsUsernameValid(true);
        setMsgUsername("");
      } else {
        setIsUsernameValid(false);
        setMsgUsername("이름을 입력해주세요");
      }
    } else if (type === "PASSWORD") {
      setPassword(event.target.value);
      if (event.target.value.length === 0) {
        setIsPasswordValid(true);
        setMsgPassword("");
      } else if (isValidPassword(event.target.value)) {
        setIsPasswordValid(true);
        setMsgPassword("");
      } else {
        setIsPasswordValid(false);
        setMsgPassword(
          "영문자, 숫자, 특수문자를 포함하여 8~16자리의 비밀번호를 입력해주세요."
        );
      }

      // *: 비밀번호 입력 시 비밀번호 확인과 일치여부 확인할 필요가 있음
      if (rePassword === event.target.value) {
        setIsRePasswordValid(true);
        setMsgRePassword("");
      } else {
        setIsRePasswordValid(false);
        setMsgRePassword("비밀번호가 일치하지 않습니다.");
      }
      // END
    } else if (type === "REPASSWORD") {
      setRePassword(event.target.value);
      if (event.target.value.length === 0) {
        setIsRePasswordValid(true);
        setMsgRePassword("");
      } else if (password === event.target.value) {
        setIsRePasswordValid(true);
        setMsgRePassword("");
      } else {
        setIsRePasswordValid(false);
        setMsgRePassword("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <React.Fragment>
      <div className="modal-title">
        <span className="logo">logoyogo</span>
        <span className="title">회원가입</span>
      </div>
      <div className="modal-group">
        <input
          className={isUsernameValid ? "" : "invalid"}
          required
          onChange={(e) => {
            handleOnChange(e, "USERNAME");
          }}
        ></input>
        <span>{msgUsername}</span>
        <label htmlFor="date">이름</label>
      </div>

      <div className="modal-group">
        <input
          className={isEmailValid ? "" : "invalid"}
          required
          onChange={(e) => {
            handleOnChange(e, "EMAIL");
          }}
        ></input>
        <span>{msgEmail}</span>
        <label htmlFor="date">이메일</label>
      </div>

      <div className="modal-group">
        <input
          className={isPasswordValid ? "" : "invalid"}
          required
          type="password"
          onChange={(e) => {
            handleOnChange(e, "PASSWORD");
          }}
        ></input>
        <span>{msgPassword}</span>
        <label htmlFor="date">비밀번호</label>
      </div>

      <div className="modal-group">
        <input
          className={isRePasswordValid ? "" : "invalid"}
          required
          type="password"
          onChange={(e) => {
            handleOnChange(e, "REPASSWORD");
          }}
        ></input>
        <span>{msgRePassword}</span>
        <label htmlFor="date">비밀번호 확인</label>
      </div>

      <button className="btn-login" onClick={handleLogin}>
        회원가입
      </button>

      <div className="modal-comment">
        이미 회원이신가요?
        <span className="btn-login" onClick={() => handleModalOpen("LOGIN")}>
          로그인 하기
        </span>
      </div>
    </React.Fragment>
  );
}
