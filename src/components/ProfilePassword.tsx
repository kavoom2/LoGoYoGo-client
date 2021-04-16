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
    if (type === "CURRENTPW") setCurrentPw(event.target.value);
    else if (type === "NEWPW") setNewPw(event.target.value);
    else if (type === "RENEWPW") setReNewPw(event.target.value);
  };

  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  const handleRedirectPassword = (): void => {
    history.push("/profile/password");
  };

  return (
    <div>
      <header className="profile-header">
        <nav className="profile-header-profile" onClick={handleRedirectProfile}>
          <h1>Profile</h1>
        </nav>
        <nav className="profile-header-pwd" onClick={handleRedirectPassword}>
          <h1>비밀번호 변경</h1>
        </nav>
      </header>
      <section id="profile-section2">
        <div>
          <span>현재 비밀번호</span>
          <br></br>
          <input
            className="profile-input-changepw"
            type="password"
            placeholder="현재 비밀번호"
            onChange={(e) => {
              handleOnChange(e, "CURRENTPW");
            }}
          ></input>
        </div>
        <div>
          <span>새로운 비밀번호</span>
          <br></br>
          <input
            className="profile-input-changepw"
            type="password"
            placeholder="새로운 비밀번호"
            onChange={(e) => {
              handleOnChange(e, "NEWPW");
            }}
          ></input>
        </div>
        <div>
          <span>새로운 비밀번호 확인</span>
          <br></br>
          <input
            className="profile-input-changepw"
            type="password"
            placeholder="새로운 비밀번호 확인"
            onChange={(e) => {
              handleOnChange(e, "RENEWPW");
            }}
          ></input>
        </div>
      </section>
      <footer>
        <div>
          <div className="message">{message}</div>
          <div>
            <button
              className="profile-inner-btn"
              onClick={handleChangePassword}
            >
              변경하기
            </button>
          </div>
          <div>
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
