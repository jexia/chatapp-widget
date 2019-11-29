import * as types from "../consts";

const initialState = {
  admin: {
    email: "",
    password: "",
  },
  user: {
    email: "",
    password: "",
    id: "",
  },
  messagesList: [],
  usersArray: [],
  session_id: null,
  msg_time: null,
  archive_chat: {},
  user_id: "",
  isMovedToArchive: false,
  isMessagesUnread: true,
  activeChatSession: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.CHOOSE_ACTIVE_SESSION:
      return {
        ...state,
        activeChatSession: action.payload,
      };
    case types.READ_MESSAGE:
      return {
        ...state,
        isMessagesUnread: action.payload,
      };
    case types.REMOVE_CHAT:
      return {
        ...state,
        user_id: action.payload,
        isMovedToArchive: true,
      };
    case types.CHANGE_FLAG_ARCHIVE:
      return  {
        ...state,
        isMessagesUnread: false,
      };
    case types.ADD_CHAT_TO_ARCHIVE:
      return {
        ...state,
        archive_chat: action.payload,
      };
    case types.SAVE_LAST_MSG_TIME:
      return {
        ...state,
        msg_time: action.msg_time,
      };
    case types.SAVE_SESSION_ID:
      return {
        ...state,
        session_id: action.session_id,
      };
    case types.RECEIVE_USERS:
      return {
        ...state,
        usersArray: action.usersArray,
      };
    case types.ADD_MESSAGE_TO_LIST:
      return {
        ...state,
        messagesList: action.messagesList,
      };
    case types.TAKE_TOKEN:
      return {
        ...state,
        email: action.email,
        password: action.password,
      } ;
    case types.REQUEST_LOGIN:
        return {
            ...state,
            admin: {
                user_name: action.email,
                password: action.password,
            },
        };
    case types.REQUEST_SIGN_IN:
        return {
            ...state,
            user: {
                email: action.email,
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
    case types.REQUEST_LOGIN_FAILED:
        return {
            ...state,
        };
    case types.SAVE_USERS:
      return {
        ...state,
        users: action.users
      };
    default:
      return {
        ...state,
      }
  }
};

export default user;
