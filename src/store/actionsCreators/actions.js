import * as consts from "../consts";

// action for create token
export const createToken = (email, password) => ({
  type: consts.TAKE_TOKEN,
  email,
  password,
});

export const createUserToken = (email, password) => ({
  type: consts.CREATE_TOKEN,
  email,
  password,
});

// action for create user
export const createUserName = (user_name) => ({
  type: consts.CREATE_USER,
  user_name,
});

// action for create new message
export const createNewMessage = (message) => ({
  type: consts.CREATE_NEW_MESSAGE,
  message,
});

// action to add message to array
export const addMessageToList = (messagesList) => ({
  type: consts.ADD_MESSAGE_TO_LIST,
  messagesList,
});

// action for admin login
export const requestAdminLogin = (email, password) => ({
  type: consts.REQUEST_LOGIN,
  email,
  password,
});

export const requestLogin = () => ({
  type: consts.REQUEST_SIGN_IN,
});

export const requestLoginSuccess = (id, email) => ({
  type: consts.REQUEST_LOGIN_SUCCESS,
  id,
  email,
});

export const requestAdminLoginFailed = () => ({
  type: consts.REQUEST_LOGIN_FAILED,
});

// save users to Set
export const saveUsersInSet = (users) => ({
  type: consts.SAVE_USERS,
  users,
});

export const receiveDataFromDataset = (usersArray) => ({
  type: consts.RECEIVE_USERS,
  usersArray,
});

// save session id to chat with user
export const saveSessionId = (session_id) => ({
  type: consts.SAVE_SESSION_ID,
  session_id,
});

// save last msg time
export const saveLastMsgTime = (msg_time) => ({
  type: consts.SAVE_LAST_MSG_TIME,
  msg_time,
});

// remove chat to archive
export const removeChatToArchive = (payload) => ({
  type: consts.ADD_CHAT_TO_ARCHIVE,
  payload,
});

// remove from active chats
export const removeChatFromActive = (payload) => ({
  type: consts.REMOVE_CHAT,
  payload,
});

// reset unread messages
export const resetUnreadMessages = (payload) => ({
  type: consts.RESET_UNREAD,
  payload,
});

export const changeFlagOfMessage= (payload) => ({
  type: consts.CHANGE_FLAG_ARCHIVE,
  payload,
});

export const checkMessages = (payload) => ({
  type: consts.READ_MESSAGE,
  payload,
});

export const chooseActiveSession = (payload) => ({
  type: consts.CHOOSE_ACTIVE_SESSION,
  payload,
});
