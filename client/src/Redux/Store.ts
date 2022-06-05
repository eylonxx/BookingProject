import { combineReducers, createStore } from 'redux';
import { AuthReducer } from './AuthState';
import { VacationsReducer } from './VacationsState';

const reducers = combineReducers({
  authState: AuthReducer,
  vacationState: VacationsReducer,
});

const store = createStore(reducers);

export default store;
