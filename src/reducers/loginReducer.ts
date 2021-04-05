import { initialState } from "./initialState";

interface Action {
  type: string;
  payload: any;
}

const loginReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default loginReducer;
