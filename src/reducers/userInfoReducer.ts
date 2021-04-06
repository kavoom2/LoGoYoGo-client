import { ACTIONS } from "../actions/index";
import { initialState } from "./initialState";

interface Action {
  type: string;
  payload: any;
}

const userInfoReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_USERINFO: {
      return Object.assign({}, state, {
        userinFo: {
          username: action.payload.username,
          email: action.payload.email,
        },
      });
    }
    default:
      return state;
  }
};

export default userInfoReducer;
