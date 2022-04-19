import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRepos } from '../../store/actions/repos';
import { fetchRepos, setCurrentPage } from '../../store/reducers/reposReducer';
import { createPages } from '../../utils/util';
import { Repo } from '../repo/Repo';
import './main.less';

export const Main = () => {
  const dispatch = useDispatch();
  const { items, isFetching, currentPage, totalCount, perPage, isFetchError } =
    useSelector((state) => state.repos);
  const [searchValue, setSearchValue] = useState('');
  const pagesCount = Math.ceil(totalCount / perPage);
  const pages = [];

  createPages(pages, pagesCount, currentPage);

  useEffect(() => {
    //dispatch(getRepos(searchValue, currentPage, perPage));
    dispatch(fetchRepos());
  }, [currentPage]);

  const searchHandler = () => {
    dispatch(setCurrentPage(1));
    dispatch(getRepos(searchValue));
  };

  return (
    <div>
      {isFetchError && (
        <div className="alert alert-danger" role="alert">
          Произошла ошибка! Пожалуйста обновите страницу!
        </div>
      )}
      <div className="search">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Input repo name"
          className="search-input"
        />
        <button onClick={() => searchHandler()} className="search-btn">
          Search
        </button>
      </div>
      {isFetching === false ? (
        items.map((repo) => <Repo key={repo.id} repo={repo} />)
      ) : (
        <div className="fetching"></div>
      )}
      <div className="pages">
        {pages.map((page, index) => (
          <span
            key={index}
            className={currentPage === page ? 'current-page' : 'page'}
            onClick={() => dispatch(setCurrentPage(page))}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};
