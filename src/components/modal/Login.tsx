import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Actions } from "../../actions/index";
import { isValidEmail, isValidPassword } from "../../utilities/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubSquare,
  faFacebookSquare,
  faGooglePlusSquare,
} from "@fortawesome/free-brands-svg-icons";
import GoogleButton from "../GoogleOauth";

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
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true);
  const [msgEmail, setMsgEmail] = useState<string>("");
  const [msgPassword, setMsgPassword] = useState<string>("");

  const handleModalOpen = (type) => {
    dispatch(Actions.setModalStatus(true));
    dispatch(Actions.setModalType(type));
  };

  // TODO 1. 로그인 로직을 작성해야 합니다.
  const handleLogin = (): void => {
    // TODO 2. 유효성 검사에 따른 에러메시지를 출력해야합니다.(setMessage 사용)
    if (!email) {
      setIsEmailValid(false);
      setMsgEmail("이메일을 입력해주세요.");
      return;
    }

    if (!password) {
      setIsPasswordValid(false);
      setMsgPassword("비밀번호를 입력해주세요.");
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

        axios
          .post("http://localhost:5000/loadlogo", { accessToken: token })
          .then((data) => {
            sessionStorage.setItem(
              "preset",
              JSON.stringify(JSON.parse(data.data.json[0].setting))
            );
          })
          .catch(() => console.log("err"));

        sessionStorage.setItem("accessToken", JSON.stringify(token));
        return axios.post(`${scheme}://${host}:${port}/user/userinfo`, {
          accessToken: token,
        });
      })
      .then((data) => {
        console.log(data);
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
        if (status === 404) {
        }
        setMsgPassword("아이디 또는 비밀번호가 일치하지 않습니다.");
        console.log(err);
      });

    // TODO 3. 정상적으로 로그인되면 모달을 종료합니다.
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
    }
    if (type === "PASSWORD") {
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
    }
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
      <div className="modal-title">
        <span className="logo">logoyogo</span>
        <span className="title">로그인</span>
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
          onKeyPress={enter}
        ></input>
        <span>{msgPassword}</span>
        <label htmlFor="date">비밀번호</label>
      </div>

      <button className="btn-login" onClick={handleLogin}>
        로그인
      </button>

      <span className="modal-social">소셜 계정으로 간편하게 로그인하세요!</span>
      <div className="social-btns">
        <button className="btn-login" onClick={gitOauth}>
          <FontAwesomeIcon icon={faGithubSquare} />
        </button>
        <button>
          <FontAwesomeIcon icon={faFacebookSquare} />
        </button>
        <GoogleButton />
      </div>
      <div className="modal-comment">
        아직 회원이 아니신가요?{" "}
        <span className="btn-login" onClick={() => handleModalOpen("SIGNUP")}>
          회원가입하기
        </span>
      </div>
    </React.Fragment>
  );
}
