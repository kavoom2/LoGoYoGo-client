import { initialState, stateType } from "./initialState";
import { ACTIONS, ActionsType } from "../actions/index";

const modalStatusReducer = (
  state: stateType = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case ACTIONS.SET_MODALSTATUS: {
      return Object.assign({}, state, {
        isModalOpen: action.payload,
      });
    }
    default:
      return state;
  }
};

export default modalStatusReducer;
