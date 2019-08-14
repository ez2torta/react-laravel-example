import { push } from 'react-router-redux';

import { put, takeEvery, call} from 'redux-saga/effects';
import axios from 'axios';

function loginCall(userData) {
    console.log(userData)
    // userData  => user, pass
    axios.get(process.env.REACT_APP_API_URL)
    return axios.get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson');
}

export function* loginSaga(action) {
  try {
      const userdata = action.payload // user, pass
      yield put({type: 'LOGIN_STATUS', status: 'loading'});
      let resp = yield call(loginCall, userdata);
      yield put({
          type: 'USER_DATA_RECEIVE',
          payload: resp.data,
      });
      yield put({type: 'LOGIN_STATUS', status: 'complete'});
      // Hacer la redirección? (la va a hacer el componente)

  } catch (err) {
      yield put({type: 'LOGIN_STATUS', status: 'error', err});
  }
}

export const authSagas = [
    takeEvery("LOGIN", loginSaga),
  ]