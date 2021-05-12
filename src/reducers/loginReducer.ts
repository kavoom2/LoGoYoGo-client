import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const loginReducer = (state: stateType = initialState, action: ActionsType) => {
  switch (action.type) {
    case ACTIONS.SET_LOGINSTATUS: {
      return Object.assign({}, state, {
        isLogin: action.payload,
      });
    }

    default:
      return state;
  }
};

export default loginReducer;
