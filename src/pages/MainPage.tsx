import Nav from "../components/Nav";
import LandingPart1 from "../components/LandingPart1";
import LandingPart2 from "../components/LandingPart2";
import LandingPart3 from "../components/LandingPart3";
import LandingPart4 from "../components/LandingPart4";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Actions } from "../actions/index";
import "../scss/MainPage.scss";
import "../scss/_CommonComponents.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import axios from "axios";

require("dotenv").config();

export default function MainPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logoname, setLogoName] = useState<string>("");

  const handleLogoName = (event) => {
    setLogoName(event.target.value);
    sessionStorage.setItem("logo", event.target.value);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      getAccessToken(authorizationCode);
    }
    if (sessionStorage.getItem("canvas")) {
      getcanvas();
    }
  });

  async function getAccessToken(authorizationCode) {
    await axios
      .post("http://localhost:5000/callback", {
        authorizationCode: authorizationCode,
      })
      .then((data) => {
        let token = data.data.accessToken;
        dispatch(Actions.setAccessToken(token));
        dispatch(Actions.setLoginStatus(true));
        getuserinfo(token);
      });
  }

  async function getuserinfo(token) {
    await axios
      .get("https://api.github.com/user", {
        headers: {
          authorization: `token ${token}`,
        },
      })
      .then((data) => {
        const { email, login } = data.data;
        let username = login;
        dispatch(Actions.setUserInfo(username, email));
      });
  }

  const getcanvas = () => {
    history.push("/maker/editor");
  };

  return (
    <div id="container-mainpage">
      <Nav />
      <LandingPart1 handleLogoName={handleLogoName} />
      <LandingPart2 />
      <LandingPart3 />
      <LandingPart4 />
    </div>
  );
}
