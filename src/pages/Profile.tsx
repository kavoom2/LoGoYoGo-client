import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProfileMain from "../components/ProfileMain";
import ProfilePassword from "../components/ProfilePassword";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/index";
import { Actions } from "../actions/index";
import "../scss/Profile.scss";

const axios: any = require("axios");
axios.default.withCredentials = true;
const scheme: string = process.env.REACT_APP_SERVER_SCHEME;
const host: string = process.env.REACT_APP_SERVER_HOST;
const port: string = process.env.REACT_APP_SERVER_PORT;

export default function Profile() {
  const history = useHistory();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.accessTokenReducer.accessToken
  );
  const handleRedirectMain = (): void => {
    history.push("/");
  };

  const [profileOn, setProfileOn] = useState(false);

  const handleProfileMain = (): void => {
    setProfileOn(true);
  };
  const handelMyLogo = (): void => {
    setProfileOn(false);
  };

  //회원탈퇴
  const handleDeleteId = () => {
    axios
      .post(`${scheme}://${host}:${port}/user/deleteid`, {
        accessToken: accessToken,
      })
      .then(() => {
        history.push("/");
        dispatch(Actions.setUserInfo("", ""));
        dispatch(Actions.setLoginStatus(false));
        dispatch(Actions.setAccessToken(""));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <header>
          <div id="nav">
            <span className="title" onClick={handleRedirectMain}>
              LOGOYOGO
            </span>
          </div>
        </header>
        <aside className="profile-aside">
          <div>
            <div onClick={handleRedirectMain}>LOGOYOGO</div>
          </div>
          <div>
            <button onClick={handelMyLogo}>내 로고</button>
          </div>
          <div>
            <button onClick={handleProfileMain}>내 프로필</button>
          </div>
        </aside>
        <section className="profile-container">
          {!profileOn ? (
            <div>내 로고가 들어올 예정</div>
          ) : (
            <div>
              <div>
                <Router>
                  <Switch>
                    <Route exact path="/profile">
                      <ProfileMain />
                      <div>
                        <button onClick={handleDeleteId}>회원탈퇴</button>
                      </div>
                    </Route>
                    <Route exact path="/profile/password">
                      <ProfilePassword />
                    </Route>
                  </Switch>
                </Router>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
