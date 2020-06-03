import React from "react";
import { Container, Repository } from "./style";
import PropTypes from "prop-types";

const CompareList = ({ repositories, removeItem }) => (
  <Container>
    {repositories.map((repository, i) => (
      <Repository key={i}>
        <div className="icon-container">
          <i
            className="fa fa-times"
            onClick={() => {
              removeItem(repository.id);
            }}
          ></i>
        </div>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count} <small>stars</small>
          </li>
          <li>
            {repository.forks_count} <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small> last commit</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_counter: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    })
  ).isRequired,
};

export default CompareList;
