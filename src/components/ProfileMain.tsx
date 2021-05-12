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
  const accessToken = useSelector(
    (state: RootState) => state.accessTokenReducer.accessToken
  );

  const handleRedirectPassword = (): void => {
    history.push("/profile/password");
  };
  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  return (
    <div className="profile-container-background">
      <header className="profile-header">
        <nav className="profile-header-a" onClick={handleRedirectProfile}>
          <h2 style={{ fontSize: "23px" }}>Profile</h2>
        </nav>
        {accessToken ? (
          <nav className="profile-header-b" onClick={handleRedirectPassword}>
            <h2 style={{ fontSize: "19px" }}>비밀번호 변경</h2>
          </nav>
        ) : (
          ""
        )}
      </header>
      <section className="profile-section">
        <div>
          <div className="profile-label">
            <label className="profile-label-content">사용자 이름</label>
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
            <span className="profile-info-content">{userInfoState.email}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfileMain;
