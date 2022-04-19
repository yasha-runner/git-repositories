import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentRepo, getContributors } from '../../store/actions/repos';
import './card.less';

export const Card = (props) => {
  const navigate = useNavigate();
  const { username, reponame } = useParams();
  const [repo, setRepo] = useState({ owner: {} });
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    getCurrentRepo(username, reponame, setRepo);
    getContributors(username, reponame, setContributors);
  }, []);

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-btn">
        Назад
      </button>
      <div className="card">
        <img src={repo.owner.avatar_url} alt="" />
        <div className="name">{repo.name}</div>
        <div className="stars">{repo.stargazers_count}</div>
      </div>
      {contributors.map((c, index) => (
        <div>
          {index + 1}. {c.login}
        </div>
      ))}
    </div>
  );
};
