import { RootState } from "../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../actions/index";

export default function Nav() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const modalType = useSelector(
    (state: RootState) => state.modalTypeReducer.modalType
  );
  const isModalOpen = useSelector(
    (state: RootState) => state.modalStatusReducer.isModalOpen
  );

  // TODO: ---------- Event Handler ---------- //

  const handleModalOpen = (type) => {
    dispatch(Actions.setModalStatus(true));
    dispatch(Actions.setModalType(type));
  };

  // TODO: 로그아웃, 프로필 로직을 작성해야 합니다.

  return (
    <div id="nav">
      <span className="title">LOGOYOGO</span>
      {isLogin ? (
        <span>
          <button className="btn-nav">로그아웃</button>
          <button className="btn-nav">프로필</button>
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
