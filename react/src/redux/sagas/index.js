import { all } from 'redux-saga/effects';
import { ticketSagas } from './ticket';
import { authSagas } from './auth';

export default function* rootSaga() {
  yield all([
    ...ticketSagas,
    ...authSagas
  ])
}