import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import intl from "react-intl-universal";
import request from "../utils/request";

class Navbar extends Component {
  state = {
    isAdmin: false
  };
  logout = e => {
    const lang = localStorage.getItem("lang");
    localStorage.clear();
    localStorage.setItem("lang", lang);
  };
  checkIfAdmin() {
    request("get", "/isAdmin")
      .then(res => {
        if (res.data.isAdmin) {
          this.setState({ isAdmin: true });
        }
      })
      .catch(e => console.log(e));
  }

  componentDidMount() {
    this.checkIfAdmin();
  }
  changeLanguage(e) {
    localStorage.setItem("lang", e.target.value);
    window.location.reload();
  }
  log = () => {
    return (
      <>
        {localStorage.getItem("API_TOKEN") ? (
          <li className="nav-item">
            <Link to="/login">
              <a
                className="nav-link"
                href="#"
                tabIndex={-1}
                onClick={this.logout}
                aria-disabled="true"
              >
                {intl.get("LOGOUT")}
              </a>
            </Link>
          </li>
        ) : (
          <li className="nav-item">
            <Link to="/login">
              <a
                className="nav-link"
                href="#"
                tabIndex={-1}
                aria-disabled="true"
              >
                {intl.get("LOGIN")}
              </a>
            </Link>
          </li>
        )}
      </>
    );
  };
  render() {
    return (
      <div className="top-nav">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="navbar-brand" href="#">
            {intl.get("BIBLE_COMPETITION")}
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/">
                  <a className="nav-link" href="#">
                    {intl.get("LATEST_QUESTION")}{" "}
                    <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my_answers">
                  <a className="nav-link" href="#">
                    {intl.get("MY_ANSWERS") || "My answers"}
                  </a>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/questions">
                  <a className="nav-link" href="#">
                    {intl.get("SEE_OLD_QUESTIONS")}{" "}
                    <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              {this.state.isAdmin ? (
                <li
                  className="nav-item admin"
                  onClick={() => this.props.history.push("/admin")}
                >
                  <a className="nav-link" href="#">
                    ADMIN
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
              ) : (
                ""
              )}
              {this.log()}
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={this.changeLanguage}
                  value={localStorage.getItem("lang") === "ar" ? "ar" : "en"}
                >
                  <option value="en">English</option>
                  <option value="ar">العربية</option>
                </select>
              </div>
            </ul>
            {/* <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form> */}
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navbar);
