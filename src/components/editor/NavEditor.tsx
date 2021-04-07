import { RootState } from "../../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions/index";

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

  return (
    <div id="nav-editor">
      <button className="btn-nav">UNDO</button>
      <button className="btn-nav">REDO</button>
      <button
        className="btn-nav"
        onClick={() => {
          handleModalOpen("PREVIEW");
        }}
      >
        PREVIEW
      </button>
      <button className="btn-nav">SAVE</button>
    </div>
  );
}
