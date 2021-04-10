import { RootState } from "../../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions/index";

export default function Nav({ canvas }) {
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

  const handleExport = () => {
    if (isLogin) {
      var a: any = document.createElement("a");
      canvas.discardActiveObject().renderAll();

      var selectcanvas: any = document.getElementById("my-canvas");
      var img: string = selectcanvas.toDataURL("image/png; base64");

      a.download = "LoGo.png";
      a.href = img;
      a.click();
      a.remove();
    } else {
      handleModalOpen("LOGIN");
    }
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
      <button className="btn-nav" onClick={handleExport}>
        SAVE
      </button>
    </div>
  );
}
