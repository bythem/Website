import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { HamburgerCollapseReverse } from "react-animated-burgers";
import { Phone } from "grommet-icons";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false,
    };
  }

  componentDidMount = () => {};
  showHamburgerMenu = (status) => {
    this.setState({ showNav: status });
  };

  render() {
    return (
      <React.Fragment>
        <nav className=" navbar navbar-expand-sm navbar-light fixed-top">
          <div className="container">
            <Link className="brand" to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/bythem-f0fdb.appspot.com/o/images%2F3e570b10-e4b8-4fbf-9d96-35b100382cf4.png?alt=media&token=f291a73b-4002-4682-a723-ce8d272e43c2"
                className="logo"
                alt="logo"
              ></img>
              <h1 className="logo-text">THEM STUDIOS</h1>
            </Link>

            <HamburgerCollapseReverse
              className="navbar-toggler"
              buttonWidth={25}
              isActive={this.state.showNav}
              onClick={() => this.showHamburgerMenu(!this.state.showNav)}
            />

            <div
              className={
                this.state.showNav
                  ? "navbar-collapse collapse show"
                  : "navbar-collapse collapse"
              }
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/index"
                  >
                    <b>H</b>
                    OME
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/about-them"
                  >
                    <b>A</b>
                    BOUT
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/services"
                  >
                    <b>S</b>
                    ERVICES
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/portfolio"
                  >
                    <b>P</b>
                    ORTFOLIO
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className="nav-link"
                    onClick={() => this.showHamburgerMenu(false)}
                    activeClassName="nav-link-selected"
                    to="/contact"
                  >
                    <b>C</b>
                    ONTACT
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBar;
