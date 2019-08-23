import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <nav className=" navbar navbar-expand-sm navbar-light ">
      <div className="container">
        <Link className="brand" to="/">
         <img src="https://firebasestorage.googleapis.com/v0/b/bythem-f0fdb.appspot.com/o/images%2F3e570b10-e4b8-4fbf-9d96-35b100382cf4.png?alt=media&token=f291a73b-4002-4682-a723-ce8d272e43c2"
          className="logo"
          ></img>
         <h1 className="logo-text">THEM STUDIOS</h1>
        </Link>
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <Link className="nav-link" to="/">
                <b>A</b>
                BOUT
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">
                <b>S</b>
                ERVICES
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/portfolio">
                <b>P</b>
                ORTFOLIO
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link" to="/contact">
                <b>C</b>
                ONTACT
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>


   );
};

export default NavBar;