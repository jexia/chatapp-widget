import * as types from "../consts";

const initialState = {
  user: {
    user_name: "",
    password: "",
  },
  messagesList: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.TAKE_TOKEN:
      return {
          ...state,
          email: action.email,
          password: action.password,
      } ;
    case types.CREATE_USER:
      return {
        ...state,
        user: {
          user_name: action.email,
          password: action.password,
        }
      };
    case types.REQUEST_LOGIN:
      return {
          ...state,
          user: action.email,
          password: action.password,
      };
    case types.REQUEST_SIGN_IN:
      return {
          ...state,
          user: {
              user_name: action.email,
              password: action.password,
          }
      };
    case types.REQUEST_LOGIN_SUCCESS:
      return {
          ...state,
        user: {
            id: action.id,
            email: action.email,
        }
      };
    default:
      return {
        ...state,
      }
  }
};

export default user;