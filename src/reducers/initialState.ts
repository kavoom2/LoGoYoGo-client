export type stateType = {
  isLogin: boolean;
  accessToken: string;
  isModalOpen: boolean;
  modalType: string;
};

export const initialState = {
  isLogin: false,
  accessToken: "",
  isModalOpen: false,
  modalType: "",
};
