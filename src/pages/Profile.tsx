import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProfileMain from "../components/ProfileMain";
import ProfilePassword from "../components/ProfilePassword";
import { useHistory } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const history = useHistory();
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
  return (
    <div>
      <div>
        <header>
          <div>
            <span className="title" onClick={handleRedirectMain}>
              LOGOYOGO
            </span>
          </div>
          <button onClick={handelMyLogo}>내 로고</button>
          <button onClick={handleProfileMain}>내 프로필</button>
        </header>
        <aside>
          <div id="sidebar">
            <div onClick={handleRedirectMain}>LOGOYOGO</div>
          </div>
        </aside>
        <section>
          {!profileOn ? (
            <div>내 로고가 들어올 예정</div>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/profile">
                  <ProfileMain />
                </Route>
                <Route exact path="/profile/password">
                  <ProfilePassword />
                </Route>
              </Switch>
            </Router>
          )}
        </section>
      </div>
    </div>
  );
}
