import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reposReducer } from './reposReducer';
import createSagaMiddleware from 'redux-saga';
import { repoWatcher } from '../saga/reposSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  repos: reposReducer,
});

// export const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk)),
// );

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(repoWatcher);
