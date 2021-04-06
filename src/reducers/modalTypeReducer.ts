import { initialState, stateType } from "./initialState";
import { ACTIONS, ActionsType } from "../actions/index";

const modalTypeReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.SET_MODALTYPE: {
      return Object.assign({}, state, {
        modalType: action.payload,
      });
    }
    default:
      return state;
  }
};

export default modalTypeReducer;
