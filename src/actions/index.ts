// -------- ACTIONS ---------- //
export const ACTIONS = {
  // * Use Only Strings
  SET_LOGINSTATUS: "SET_LOGINSTATUS",
  SET_MODALSTATUS: "SET_MODALSTATUS",
  SET_MODALTYPE: "SET_MODALTYPE",
  SET_USERINFO: "SET_USERINFO",
  SET_ACCESSTOKEN: "SET_ACCESSTOKEN",
};

// -------- ACTION CREATORS ---------- //
export const Actions = {
  setLoginStatus: (isLogin: boolean) => {
    return {
      type: ACTIONS.SET_LOGINSTATUS,
      payload: isLogin,
    };
  },

  setUserInfo: (username: string, email: string) => {
    return {
      type: ACTIONS.SET_USERINFO,
      payload: { username, email },
    };
  },

  setAccessToken: (accessToken: string) => {
    return {
      type: ACTIONS.SET_ACCESSTOKEN,
      payload: accessToken,
    };
  },

  setModalStatus: (status: boolean) => {
    return {
      type: ACTIONS.SET_MODALSTATUS,
      payload: status,
    };
  },

  setModalType: (modalType: string) => {
    return {
      type: ACTIONS.SET_MODALTYPE,
      payload: modalType,
    };
  },
};

export type ActionsType =
  | ReturnType<typeof Actions.setLoginStatus>
  | ReturnType<typeof Actions.setUserInfo>
  | ReturnType<typeof Actions.setAccessToken>
  | ReturnType<typeof Actions.setModalStatus>
  | ReturnType<typeof Actions.setModalType>;
