import React from "react";
import { Link } from "react-router-dom";
import { FacebookOption, Instagram, Phone } from "grommet-icons";


const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer mt-5">
        <div className="container">
          <div className="row ">
            <div className="col-6">
              <Link to="" className="no-text-decoration footer-text"> THEM STUDIOS</Link>
            </div>
            <div className="col-6 text-right">
              <a href="tel:+91770227722222"><Phone className="social-icon" color="white"></Phone></a>
              <Link to="/"><FacebookOption className="social-icon mx-3" color="white"></FacebookOption></Link>
              <Link to="/"><Instagram className="social-icon" color="white"></Instagram></Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Footer;