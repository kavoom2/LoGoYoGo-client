import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../reducers/index";
import { Actions } from "../actions/index";

require("dotenv").config();

const axios: any = require("axios");
axios.default.withCredentials = true;
const scheme: string = process.env.REACT_APP_SERVER_SCHEME;
const host: string = process.env.REACT_APP_SERVER_HOST;
const port: string = process.env.REACT_APP_SERVER_PORT;

function ProfileMain() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginState = useSelector(
    (state: RootState) => state.loginReducer.isLogin
  );
  const userInfoState = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );
  const accessToken = useSelector(
    (state: RootState) => state.accessTokenReducer.accessToken
  );
  console.log(loginState);
  console.log(userInfoState);

  const handleRedirectPassword = (): void => {
    history.push("/profile/password");
  };
  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  //회원탈퇴
  const handleDeleteId = () => {
    axios
      .post(`${scheme}://${host}:${port}/user/deleteid`, {
        accessToken: accessToken,
      })
      .then((data) => {
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
          <nav onClick={handleRedirectProfile}>
            <h1>Profile</h1>
          </nav>
          <nav onClick={handleRedirectPassword}>
            <h1>비밀번호 변경</h1>
          </nav>
        </header>
        <section>
          <div>
            <div>
              <label>username</label>
            </div>
            <div>
              <span>{userInfoState.username}</span>
            </div>
          </div>
          <div>
            <div>
              <label>email</label>
            </div>
            <div>
              <span>{userInfoState.email}</span>
            </div>
          </div>
          <div>
            <button onClick={handleDeleteId}>회원탈퇴</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileMain;
