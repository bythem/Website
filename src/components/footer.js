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
              <Link to="" className="ml-2  no-text-decoration footer-text">
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
                href="https://www.instagram.com/themhyd/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="social-icon" color="white"></Instagram>
              </a>
            </div>
            <div className="col-12 mt-2 d-flex justify-content-center">
              <Link to="/services" className="mx-2 text-white">
                Services
              </Link>
              <>|</>
              <Link to="/portfolio" className="mx-2 text-white">
                Portfolio
              </Link>
              <>|</>
              <Link to="/contact" className="mx-2 text-white">
                Contact
              </Link>
            </div>

            <div
              style={{ color: "#d0d0d0" }}
              className="col-12 mt-2 d-flex justify-content-center"
            >
              © {new Date().getFullYear()} THEM STUDIOS. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;
