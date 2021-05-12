export type stateType = {
  isLogin: boolean;
  accessToken: string;
  isModalOpen: boolean;
  modalType: string;
  userInfo: {
    username: string;
    email: string;
  };
};

export const initialState = {
  isLogin: false,
  accessToken: "",
  isModalOpen: false,
  modalType: "",
  userInfo: {
    username: "",
    email: "",
  },
};
