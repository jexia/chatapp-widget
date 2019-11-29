import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import * as constants from '../consts';
import * as actions from '../actionsCreators/actions';
import { projectID } from '../../consts/config';

function* requestToken({ email, password }) {
  try {
    let data = {
      "method": `ums`,
      email: email.email,
      password: email.password,
    };

    let response = yield axios.post(
      `https://${projectID}.app.jexia.com/auth`,
      data,
    );

    yield localStorage.setItem('token', response.data.access_token);

  } catch(e) {
    console.log(e.message);
  }
}


function* signUp({ email, password }) {
  try {
    let data = {
      method: "ums",
      email: email.email,
      password: email.password
    };
    yield axios.post(
    `https://${projectID}.app.jexia.com/ums/signup`,
      data
    );
  } catch(e) {
    yield put(actions.requestAdminLoginFailed());
    console.log(e.message);
  }
}

function* signIn() {
  try {
    let token = JSON.parse(localStorage.getItem('__jexia_tokens__')).apikey.access_token;
    let response = yield axios.get(
      `https://${projectID}.app.jexia.com/ums/user`,
      {
        headers: {
          'Authorization': "Bearer "+ token,
        }
      }
    );
    yield put(actions.requestLoginSuccess(response.data.id, response.data.email));
  } catch (e) {
    console.log(e.message);
  }

}

export function* watchAuth() {
  yield takeEvery(constants.REQUEST_LOGIN, signUp);
  yield takeEvery(constants.TAKE_TOKEN, requestToken);
  yield takeEvery(constants.REQUEST_SIGN_IN, signIn)
}
