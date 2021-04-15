import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/index";
import { Actions } from "../actions/index";

require("dotenv").config();

function ProfileMain() {
  const history = useHistory();
  const loginState = useSelector(
    (state: RootState) => state.loginReducer.isLogin
  );
  const userInfoState = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );

  console.log(loginState);
  console.log(userInfoState);

  const handleRedirectPassword = (): void => {
    history.push("/profile/password");
  };
  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  return (
    <div>
      <div>
        <header className="profile-header">
          <nav onClick={handleRedirectProfile}>
            <h1>Profile</h1>
          </nav>
          <nav onClick={handleRedirectPassword}>
            <h1>비밀번호 변경</h1>
          </nav>
        </header>
        <section>
          <div>
            <div className="profile-label">
              <label className="profile-label-content">username</label>
            </div>
            <div className="profile-info">
              <span className="profile-info-content">
                {userInfoState.username}
              </span>
            </div>
          </div>
          <div>
            <div className="profile-label">
              <label className="profile-label-content">email</label>
            </div>
            <div className="profile-info">
              <span className="profile-info-content">
                {userInfoState.email}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileMain;
