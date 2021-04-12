import { RootState } from "../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../actions/index";
import { useHistory } from "react-router-dom";

export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const userInfo = useSelector(
    (state: RootState) => state.userInfoReducer.userInfo
  );
  const accessToken = useSelector(
    (state: RootState) => state.accessTokenReducer.accessToken
  );
  const modalType = useSelector(
    (state: RootState) => state.modalTypeReducer.modalType
  );
  const isModalOpen = useSelector(
    (state: RootState) => state.modalStatusReducer.isModalOpen
  );
  console.log("islogin", isLogin);
  console.log("info", userInfo);
  console.log("token", accessToken);

  // TODO: ---------- Event Handler ---------- //

  const handleModalOpen = (type) => {
    dispatch(Actions.setModalStatus(true));
    dispatch(Actions.setModalType(type));
  };

  // TODO: 로그아웃, 프로필 로직을 작성해야 합니다.

  const handleLogout = (): void => {
    dispatch(Actions.setUserInfo("", ""));
    dispatch(Actions.setLoginStatus(false));
    dispatch(Actions.setAccessToken(""));
    history.push("/");
    // 코드를 지우기 위해 추가했습니다. 필요 없으시다면 알려주세요
  };

  const handleRedirectProfile = (): void => {
    history.push("/profile");
  };

  return (
    <div id="nav">
      <span className="title">LOGOYOGO</span>
      {isLogin ? (
        <span>
          <button className="btn-nav" onClick={handleLogout}>
            로그아웃
          </button>
          <button className="btn-nav" onClick={handleRedirectProfile}>
            프로필
          </button>
        </span>
      ) : (
        <span>
          <button
            className="btn-nav"
            onClick={() => {
              handleModalOpen("LOGIN");
            }}
          >
            로그인
          </button>
          <button
            className="btn-nav"
            onClick={() => {
              handleModalOpen("SIGNUP");
            }}
          >
            회원가입
          </button>
        </span>
      )}
    </div>
  );
}
