import { ACTIONS } from "../actions/index";
import { initialState } from "./initialState";

interface Action {
  type: string;
  payload: any;
}

const accessTokenReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ACTIONS.SET_ACCESSTOKEN: {
      return Object.assign({}, state, {
        accessToken: action.payload.accessToken,
      });
    }

    default:
      return state;
  }
};

export default accessTokenReducer;
