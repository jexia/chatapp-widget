import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import * as constants from '../consts';
import * as actions from '../actionsCreators/actions';
import { projectID } from '../../consts/config';
import {take} from "rxjs/operators";

function* addChatToArchive( payload ) {
  try {
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    let chatToArchive = payload.payload;
    let response = yield axios.post(
      `https://${projectID}.app.jexia.com/ds/archive_chats`,
      chatToArchive,
      {
        headers: {
          'Authorization': "Bearer "+ token,
        }
      }
    );
  } catch (e) {
    console.log(e.message);
  }
}

function* removeChatFromActive( payload ) {
  try {
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    let res = yield axios.delete(
      `https://${projectID}.app.jexia.com/ds/users?cond=[{"field":"id"}, "=", "${payload.payload}"]`,
      {
        headers: {
          "Authorization": "Bearer " + token,
        }
      },
    );
  } catch (e) {
    console.log(e.message);
  }
}

function* resetUnreadMessages( payload ) {
  try {
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    let data = {
      unread: 0,
    };
    console.log(payload);
    const res = yield axios.patch(
      `https://${projectID}.app.jexia.com/ds/users?cond=[{"field":"id"},"=","${payload.payload}"]`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + token,
        }
      }
    );
  } catch (e) {
    console.log(e.message);
  }
}

function* changeFlag( { payload } ) {
  try {
    let updateDS = {
      user: payload.user,
      session_id: payload.session_id,
      last_msg: payload.last_msg,
      unread: false,
    };

    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;

    const res = yield axios.patch(
      `https://${projectID}.app.jexia.com/ds/users?cond=[{"field":"id"},"=","${payload.user_id}"]`,
      updateDS,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + token,
        }
      }
    );
  } catch (e) {
    console.log(e.message);
  }
}

export function* watchDataset() {
  yield takeEvery(constants.ADD_CHAT_TO_ARCHIVE, addChatToArchive);
  yield takeEvery(constants.REMOVE_CHAT, removeChatFromActive);
  yield takeEvery(constants.RESET_UNREAD, resetUnreadMessages);
  yield takeEvery(constants.CHANGE_FLAG_ARCHIVE, changeFlag);
}
