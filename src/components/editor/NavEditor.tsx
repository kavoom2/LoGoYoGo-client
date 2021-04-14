import { RootState } from "../../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../../actions/index";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faRedo, faShareSquare, faEye } from '@fortawesome/free-solid-svg-icons'

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
