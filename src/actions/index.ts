interface Return {
  type: string;
  payload?: any;
  // payload: {a: ..., b: ..., c: ...}
}

// -------- ACTIONS ---------- //
export const ACTIONS = {
  // * Use Only Strings
  SET_LOGINSTATUS: "SET_LOGINSTATUS",
  SET_USERINFO: "SET_USERINFO",
  SET_ACCESSTOKEN: "SET_ACCESSTOKEN",
};

// -------- ACTION CREATORS ---------- //

export const setLoginStatus = (): Return => {
  return {
    type: ACTIONS.SET_LOGINSTATUS,
  };
};

export const setUserInfo = (username: string, email: string): Return => {
  return {
    type: ACTIONS.SET_USERINFO,
    payload: { username, email },
  };
};

export const setAccessToken = (accessToken: string): Return => {
  return {
    type: ACTIONS.SET_ACCESSTOKEN,
    payload: { accessToken },
  };
};
