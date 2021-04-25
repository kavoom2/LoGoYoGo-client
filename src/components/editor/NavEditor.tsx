import { RootState } from "../../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUndo,
  faRedo,
  faShareSquare,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Nav({ canvas }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);
  const accessToken = useSelector(
    (state: RootState) => state.accessTokenReducer.accessToken
  );
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

      if (accessToken) {
        const json = canvas.toJSON();
        axios
          .post("http://localhost:5000/savelogo", {
            accessToken: accessToken,
            json: JSON.stringify(json),
          })
          .then(() => {
            sessionStorage.setItem("preset", JSON.stringify(json));
          });
      }

      var selectcanvas: any = document.getElementById("my-canvas");
      var img: string = selectcanvas.toDataURL("image/png");

      a.download = "LoGo";
      a.href = img;
      a.click();
      a.remove();
    } else {
      const json = canvas.toJSON();
      sessionStorage.setItem("canvas", JSON.stringify(json));
      handleModalOpen("LOGIN");
    }
  };

  return (
    <div id="nav-editor">
      <button className="btn-nav" onClick={() => canvas.undo()}>
        <FontAwesomeIcon icon={faUndo} /> 실행취소
      </button>
      <button className="btn-nav" onClick={() => canvas.redo()}>
        <FontAwesomeIcon icon={faRedo} /> 다시실행
      </button>
      <button
        className="btn-nav"
        onClick={() => {
          const json = canvas.toJSON();
          console.log(json);
          axios.post("http://localhost:5000/save", { json: json });
          canvas.discardActiveObject().renderAll();
          handleModalOpen("PREVIEW");
        }}
      >
        <FontAwesomeIcon icon={faEye} /> 미리보기
      </button>
      <button className="btn-nav" onClick={handleExport}>
        <FontAwesomeIcon icon={faShareSquare} /> 저장하기
      </button>
    </div>
  );
}
