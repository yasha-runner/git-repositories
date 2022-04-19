import React from 'react';
import { NavLink } from 'react-router-dom';
import './repo.less';

export const Repo = (props) => {
  const repo = props.repo;
  return (
    <div className="repo">
      <div className="repo-header">
        <div className="repo-header-name">
          <NavLink to={`/card/${repo.owner.login}/${repo.name}`}>
            {repo.name}
          </NavLink>
        </div>
        <div className="repo-header-stars">{repo.stargazers_count}</div>
      </div>
      <div className="repo-last-commit">{repo.update_at}</div>
      <a hraf={repo.html_url} className="repo-link">
        Ссылка на репозиторий: {repo.html_url}
      </a>
    </div>
  );
};
