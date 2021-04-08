import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const userInfoReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.SET_USERINFO: {
      console.log("action", action.payload);
      return Object.assign({}, state, {
        userInfo: action.payload,
      });
    }
    default:
      return state;
  }
};

export default userInfoReducer;
