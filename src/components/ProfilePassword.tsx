import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isValidPassword } from "../utilities/index";
import { RootState } from "../reducers";

require("dotenv").config();

const axios: any = require("axios");
axios.default.withCredentials = true;
const scheme: string = process.env.REACT_APP_SERVER_SCHEME;
const host: string = process.env.REACT_APP_SERVER_HOST;
const port: string = process.env.REACT_APP_SERVER_PORT;

function ProfilePassword(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [reNewPw, setReNewPw] = useState("");
  const [isCurrentPwValid, setIsCurrentPwValid] = useState<boolean>(true);
  const [msgCurrentPw, setMsgCurrentPw] = useState<string>("");
  const [isNewPwValid, setIsNewPwValid] = useState<boolean>(true);
  const [msgNewPw, setMsgNewPw] = useState<string>("");
  const [isReNewPwValid, setIsReNewPwValid] = useState<boolean>(true);
  const [msgReNewPw, setMsgReNewPw] = useState<string>("");
  const [message, setMessage] = useState("");
  const accessToken = useSelector(
    (state: RootState) => state.accessTokenReducer.accessToken
  );

  const handleChangePassword = (): void => {
    //유효성 검사
    if (!currentPw || !newPw || !reNewPw) {
      setMessage("모든 항목을 입력해주세요");
      return;
    }

    //새 비밀번호, 확인이 일치하지 않을 경우
    if (!isValidPassword(newPw)) {
      setMessage(
        "비밀번호는 8~20자의 영문, 숫자, 특수기호의 조합이어야합니다."
      );
      return;
    }
    if (newPw !== reNewPw) {
      setMessage("새로운 비밀번호가 일치하지 않습니다.");
    }

    axios
      .post(`${scheme}://${host}:${port}/user/editpw`, {
        accessToken: accessToken,
        password: currentPw,
        editpw: newPw,
      })
      .then((data) => {
        console.log(data.data);
        handleRedirectProfile();
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err.response.status);
      });
  };

  const handleOnChange = (event, type: string): void => {
    if (type === "CURRENTPW") {
      setCurrentPw(event.target.value);
      if (event.target.value.length === 0) {
        setIsCurrentPwValid(true);
        setMsgCurrentPw("");
      } else if (isValidPassword(event.target.value)) {
        setIsCurrentPwValid(true);
        setMsgCurrentPw("");
      } else {
        setIsCurrentPwValid(false);
        setMsgCurrentPw("현재 비밀번호를 입력해주세요.");
      }
    } else if (type === "NEWPW") {
      setNewPw(event.target.value);
      if (event.target.value.length === 0) {
        setIsNewPwValid(true);
        setMsgNewPw("");
      } else if (isValidPassword(event.target.value)) {
        setIsNewPwValid(true);
        setMsgNewPw("");
      } else {
        setIsNewPwValid(false);
        setMsgNewPw(
          "영문자, 숫자, 특수문자를 포함하여 8~16자리의 비밀번호를 입력해주세요."
        );
      }
    } else if (type === "RENEWPW") {
      setReNewPw(event.target.value);
      if (event.target.value.length === 0) {
        setIsReNewPwValid(true);
        setMsgReNewPw("");
      } else if (newPw === event.target.value) {
        setIsReNewPwValid(true);
        setMsgReNewPw("");
      } else {
        setIsReNewPwValid(false);
        setMsgReNewPw("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  const handleRedirectPassword = (): void => {
    history.push("/profile/password");
  };

  return (
    <div className="profile-container-background">
      <header className="profile-header">
        <nav className="profile-header-b" onClick={handleRedirectProfile}>
          <h2 style={{ fontSize: "23px" }}>Profile</h2>
        </nav>
        <nav className="profile-header-a" onClick={handleRedirectPassword}>
          <h2 style={{ fontSize: "19px" }}>비밀번호 변경</h2>
        </nav>
      </header>
      <section className="profile-section">
        <div className="profile-group">
          <br></br>
          <input
            className={isCurrentPwValid ? "" : "invalid"}
            required
            type="password"
            onChange={(e) => {
              handleOnChange(e, "CURRENTPW");
            }}
          ></input>
          <span>{msgCurrentPw}</span>
          <label htmlFor="date">현재 비밀번호</label>
        </div>
        <div className="profile-group">
          <br></br>
          <input
            className={isNewPwValid ? "" : "invalid"}
            required
            type="password"
            onChange={(e) => {
              handleOnChange(e, "NEWPW");
            }}
          ></input>
          <span>{msgNewPw}</span>
          <label htmlFor="date">새로운 비밀번호</label>
        </div>
        <div className="profile-group">
          <br></br>
          <input
            className={isReNewPwValid ? "" : "invalid"}
            required
            type="password"
            onChange={(e) => {
              handleOnChange(e, "RENEWPW");
            }}
          ></input>
          <span>{msgReNewPw}</span>
          <label htmlFor="date">새로운 비밀번호 확인</label>
        </div>
      </section>
      <footer>
        <div className="profile-footer">
          <div className="message">{message}</div>
          <div>
            <button
              className="profile-inner-btn"
              onClick={handleChangePassword}
            >
              변경하기
            </button>
            <button
              className="profile-inner-btn"
              onClick={handleRedirectProfile}
            >
              Cancel
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProfilePassword;
