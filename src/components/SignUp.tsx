import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { isValidEmail, isValidPassword } from "../utilities/index";

require("dotenv").config();
const axios: any = require("axios");
axios.default.withCredentials = true;
const scheme: string = process.env.REACT_APP_SERVER_SCHEME;
const host: string = process.env.REACT_APP_SERVER_HOST;
const port: string = process.env.REACT_APP_SERVER_PORT;

const SignUp = (props: any): any => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleInputValue = (key: any) => (e: any): void => {
    if (key === "USERNAME") setUsername(e.target.value);
    else if (key === "EMAIL") setEmail(e.target.value);
    else if (key === "PASSWORD") setPassword(e.target.value);
  };

  const handleSignUp = (): void => {
    //입력칸 전부 입력했는지 확인
    //console.log(username, email, password);
    if (!username || !email || !password) {
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
      .post(`${scheme}://${host}:${port}/user/signup`, {
        username,
        email,
        password,
      })
      .then((data: any) => {
        console.log(data);
        if (
          data.status === 200 &&
          data.data === "이미 존재하는 이메일 입니다."
        ) {
          setAlert("이미 가입한 이메일 주소입니다.");
          return;
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="username"
          onChange={handleInputValue("USERNAME")}
        ></input>
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
        <button onClick={handleSignUp}>signup</button>
      </div>
    </div>
  );
};

export default SignUp;
