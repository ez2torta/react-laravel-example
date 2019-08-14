import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

const client = (token = null) => {
  const defaultOptions = {
    headers: {
      Authorization: token ? `Token ${token}` : '',
    },
  };

  return {
    get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
  };
};

function listUsersCall(callData){
    // callData => token
    const request = client(callData.token);
    return request.get(process.env.REACT_APP_API_URL + '/api/users')
}

function listCall(callData) {
  // callData => token
  const request = client(callData.token);
  return request.get(process.env.REACT_APP_API_URL + '/api/tickets')
}
function createCall(callData) {
  // callData => token, ticketData ?
  const request = client(callData.token);
  return request.post(process.env.REACT_APP_API_URL + '/api/tickets', callData.ticketData)
}
function editCall(callData) {
  // callData => token, ticketData ?
  const request = client(callData.token);
  return request.put(process.env.REACT_APP_API_URL + '/api/tickets', callData.ticketData)
}
function deleteCall(callData) {
  // callData => token, ticketID
  const request = client(callData.token);
  return request.delete(process.env.REACT_APP_API_URL + '/api/tickets/' + callData.ticketId)
}

function assignCall(callData) {
  // callData => token, ticketID
  const request = client(callData.token);
  return request.post(process.env.REACT_APP_API_URL + '/api/tickets/assign', callData.ticketId)
}

function* callSagaGen(action, callType, callFunc){
  try {
    yield put({ type: 'SET_STATUS', status: 'loading' });
    const callData = action.payload // token? + info
    console.log(callData)
    let resp = yield call(callFunc, callData);
    yield put({
      type: callType,
      payload: resp.data,
    });
    yield put({ type: 'SET_STATUS', status: 'complete' });
  } catch (err) {
    yield put({ type: 'SET_STATUS', status: 'error', err });
  }
}

export function* listTicket(action) {
  yield call(callSagaGen, action, 'LIST_TICKET_RESPONSE', listCall)
}
export function* createTicket(action) {
  yield call(callSagaGen, action, 'CREATE_TICKET_RESPONSE', createCall)
  yield call(callSagaGen, action, 'LIST_TICKET_RESPONSE', listCall)
}
export function* editTicket(action) {
  yield call(callSagaGen, action, 'EDIT_TICKET_RESPONSE', editCall)
  yield call(callSagaGen, action, 'LIST_TICKET_RESPONSE', listCall)
}
export function* deleteTicket(action) {
  yield call(callSagaGen, action, 'DELETE_TICKET_RESPONSE', deleteCall)
  yield call(callSagaGen, action, 'LIST_TICKET_RESPONSE', listCall)
}
export function* assignTicket(action) {
  yield call(callSagaGen, action, 'ASSIGN_TICKET_RESPONSE', assignCall)
  yield call(callSagaGen, action, 'LIST_TICKET_RESPONSE', listCall)
}
export function* listUsers(action){
  yield call(callSagaGen, action, 'LIST_USERS_RESPONSE', listUsersCall)
}


export const ticketSagas = [
  takeEvery("LIST_TICKET_REQUEST", listTicket),
  takeEvery("CREATE_TICKET_REQUEST", createTicket),
  takeEvery("EDIT_TICKET_REQUEST", editTicket),
  takeEvery("DELETE_TICKET_REQUEST", deleteTicket),
  takeEvery("ASSIGN_TICKET_REQUEST", assignTicket),
  takeEvery("LIST_USERS_REQUEST", listUsers),
]