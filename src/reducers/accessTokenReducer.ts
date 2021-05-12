import { ACTIONS, ActionsType } from "../actions/index";
import { initialState, stateType } from "./initialState";

const accessTokenReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.SET_ACCESSTOKEN: {
      return Object.assign({}, state, {
        accessToken: action.payload,
      });
    }

    default:
      return state;
  }
};

export default accessTokenReducer;
