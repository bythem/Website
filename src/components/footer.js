import React from "react";
import { Link } from "react-router-dom";
import { LinkedinOption, Instagram, Phone } from "grommet-icons";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer mt-5">
        <div className="container">
          <div className="row ">
            <div className="col-6">
              <Link to="" className="no-text-decoration footer-text">
                {" "}
                THEM STUDIOS
              </Link>
            </div>
            <div className="col-6 text-right">
              <a href="tel:+917702277247">
                <Phone className="social-icon" color="white"></Phone>
              </a>
              <a
                href="https://www.linkedin.com/company/them-studios"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOption
                  className="social-icon mx-3"
                  color="white"
                ></LinkedinOption>
              </a>
              <a
                href="https://www.instagram.com/bythem.studio/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="social-icon" color="white"></Instagram>
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
