import { createStore } from 'redux';

const initialState = {
  isLogged: !!sessionStorage.secip,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_STATUS': {
      const newState = { ...state };
      newState.isLogged = !!sessionStorage.secip;
      return newState;
    }
    default: {
      return state;
    }
  }
};

const store = createStore(reducer);

export default store;
