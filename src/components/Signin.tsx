import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo, setLoginStatus, setAccessToken } from "../actions/index";
import { isValidEmail, isValidPassword } from "../utilities/index";

require("dotenv").config();
const axios: any = require("axios");
axios.default.withCredentials = true;
const scheme: string = process.env.REACT_APP_SERVER_SCHEME;
const host: string = process.env.REACT_APP_SERVER_HOST;
const port: string = process.env.REACT_APP_SERVER_PORT;

const Signin = (props: any): any => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleInputValue = (key: any) => (e: any): void => {
    if (key === "EMAIL") setEmail(e.target.value);
    else if (key === "PASSWORD") setPassword(e.target.value);
  };

  const handleSignin = (): void => {
    //입력칸 전부 입력했는지 확인
    //console.log(email, password);
    if (!email || !password) {
      setAlert("전부 입력해주세요");
    }

    //유효성 검사
    //이메일은 유형에 맞게 썼는지, 비밀번호는 8~20자의 영문, 숫자, 특수문자가 포함되었는지 확인

    if (!isValidEmail(email)) {
      setAlert("유효하지 않은 이메일");
      return;
    }

    if (!isValidPassword(password)) {
      setAlert("비밀번호는 영문, 숫자, 특수문자로 8~20자로 작성해야 합니다.");
      return;
    }

    //리퀘스트 보내기
    axios
      .post(
        `${scheme}://${host}:${port}/user/signin`,
        { email, password },
        { withCredentials: true, crossDomain: true }
      )
      .then((data: any) => {
        const token: any = data.data.data.accessToken;
        dispatch(setAccessToken(token));
        dispatch(setLoginStatus());
        return axios.get(`${scheme}://${host}:${port}/user/info`, {
          withCredentials: true,
          crossDomain: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      })
      .then((data: any) => {
        console.log(data.data);
        const { username, email } = data.data.data;
        dispatch(setUserInfo(username, email));
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h1>Sign In</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="email"
          onChange={handleInputValue("EMAIL")}
        ></input>
      </div>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={handleInputValue("PASSWORD")}
        ></input>
      </div>
      <div>
        <div className="alert">{alert}</div>
      </div>
      <div>
        <button onClick={handleSignin}>signin</button>
      </div>
    </div>
  );
};

export default Signin;
