import "../scss/Modal.scss";
import { RootState } from "../reducers/index";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../actions/index";
import { useEffect } from "react";
import Login from "../components/modal/Login";
import SignUp from "../components/modal/SignUp";
import Preview from "../components/modal/Preview";

export default function Modal() {
  const dispatch = useDispatch();
  const modalType = useSelector(
    (state: RootState) => state.modalTypeReducer.modalType
  );
  const isModalOpen = useSelector(
    (state: RootState) => state.modalStatusReducer.isModalOpen
  );

  useEffect(() => {}, [isModalOpen, modalType]);

  useEffect(() => {
    const handleKeyDownEvent = (e) => {
      if (!isModalOpen) return;
      if (e.keyCode === 27) {
        dispatch(Actions.setModalStatus(false));
        dispatch(Actions.setModalType(""));
      }
    };
    window.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [isModalOpen]);

  // TODO: Modal Handler 함수
  const handleCloseModal = (e) => {
    if (e.target.id !== "modal-background") return;

    dispatch(Actions.setModalStatus(false));
    dispatch(Actions.setModalType(""));
  };

  const handleModal = (status: boolean, type: string) => {
    dispatch(Actions.setModalStatus(status));
    dispatch(Actions.setModalType(type));
  };

  // TODO: MODAL STATUS ----> false: OFF, true: ON
  // TODO: MODAL TYPE ----> "LOGIN": LOGIN, "PREVIEW": PREVIEW
  const ModalTypes = [
    <Login handleModal={handleModal} />,
    <SignUp handleModal={handleModal} />,
    <Preview handleModal={handleModal} />,
  ];
  const ModalTypesIndex = ["LOGIN", "SIGNUP", "PREVIEW"];

  console.log(modalType);

  return (
    <div
      id="modal-background"
      className={isModalOpen ? "active" : "deactive"}
      onClick={(e) => {
        handleCloseModal(e);
      }}
    >
      <div id="modal-header">LOGOYOGO</div>
      <div id="modal-container">
        <div id="modal-section">
          {ModalTypes[ModalTypesIndex.indexOf(modalType)]}
        </div>
      </div>
    </div>
  );
}
