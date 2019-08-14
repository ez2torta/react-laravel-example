import { combineReducers } from 'redux'
import authReducer from './auth'
import ticketReducer from './ticket'

const reducers = combineReducers({
     auth: authReducer,
     ticket: ticketReducer
});

export default reducers