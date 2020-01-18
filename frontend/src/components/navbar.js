import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  logout = e => {
    localStorage.clear();
  };

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
                Logout
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
                Login
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
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#">
            QUESTIONARE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/">
                  <a className="nav-link" href="#">
                    Lastest Question <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my_answers">
                  <a className="nav-link" href="#">
                    My answers
                  </a>
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/questions">
                  <a className="nav-link" href="#">
                    see old questions <span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
              <li className="nav-item dropdown">
                {/* <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Dropdown
                </a> */}
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider" />
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              {this.log()}
            </ul>
            <form className="form-inline my-2 my-lg-0">
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
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
