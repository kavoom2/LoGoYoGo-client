import { initialState } from "./initialState";

interface Action {
  type: string;
  payload: any;
}

const accessTokenReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default accessTokenReducer;
