// Workers - функция, внутри которой выполняется асинхронная логика (таймауты, запросы на сервер)
// Watchers - функция наблюдатель, в которой при помощи специальной функции мы указываем action type и worker
// Effects - встроенный набор в saga функции

import { call, put, takeEvery } from 'redux-saga/effects';
import { setRepos } from '../reducers/reposReducer';

const fetchRepos = () =>
  fetch(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars`);

function* fetchRepoWorker() {
  const data = yield call(fetchRepos);
  const json = yield call(() => new Promise((res) => res(data.json())));
  yield put(setRepos(json));
}

export function* repoWatcher() {
  yield takeEvery('FETCH_REPOS', fetchRepoWorker);
}
