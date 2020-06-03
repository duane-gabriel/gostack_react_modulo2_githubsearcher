import React, { Component } from "react";
import logo from "../../assets/logo.png";
import { Container, Form } from "./style";
import api from "../../services/api";
import CompareList from "../../components/CompareList/index";
import moment from "moment";
class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: localStorage.getItem("repos")
      ? JSON.parse(localStorage.getItem("repos"))
      : [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const response = await api.get(`/repos/${this.state.repositoryInput}`);
      response.data.lastCommit = moment(response.data.pushed_at).fromNow();
      this.setState(
        {
          repositoryInput: "",
          repositories: [...this.state.repositories, response.data],
          repositoryError: false,
        },
        () => {
          localStorage.setItem(
            "repos",
            JSON.stringify(this.state.repositories)
          );
        }
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  removeItem = async (id) => {
    let repoFiltered = this.state.repositories.filter((repo) => {
      if (repo.id != id) {
        return repo;
      }
    });
    this.setState({ repositories: repoFiltered }, () => {
      localStorage.setItem("repos", JSON.stringify(repoFiltered));
    });
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="" />
        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={(e) => {
              this.setState({ repositoryInput: e.target.value });
            }}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "Ok"
            )}
          </button>
        </Form>
        <CompareList
          repositories={this.state.repositories}
          removeItem={this.removeItem}
        />
      </Container>
    );
  }
}

export default Main;
