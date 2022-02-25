import React, { Component } from "react";
import PageContent from "../components/pagecontent";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

class About extends Component {
  componentDidMount = () => {
    document.title = "THEM STUDIOS | About theM";
  };

  render() {
    return (
      <FadeIn transitionDuration="1000">
        <div className=" index-page text-center">
          <div className="container">
            <div className="d-flex flex-column flex-md-row justify-content-center mt-5">
              <div className="mb-2">
                <PageContent pagecontentid="-MDIt4KlYbfKpBOh36ua" />
              </div>
              <div
                className="d-none d-md-block"
                style={{
                  borderLeft: "2px solid #69884d",
                  height: "400px",
                  margin: "20px",
                }}
              ></div>
              <div className="mb-2">
                <PageContent pagecontentid="-MDGRuhFTBixRVFspb4V" />
              </div>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-center">
              <div className="h-100 text-center mt-3">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/bythem-f0fdb.appspot.com/o/images%2Fdbaff600-ba03-4138-9692-1ea93e97578e.webp?alt=media&token=8d63ec35-7025-4b13-9dec-1215a55262bb"
                  className="about-image img img-fluid mx-auto"
                />
              </div>
              <div className="ml-3 mt-3">
                <div className="ml-2 text-left">
                  <h2> Maneesh J</h2>
                  <h5>Founder & Principal Designer</h5>
                </div>
                <div className="d-flex justify-content-start">
                  <Link to="/services" className="mx-2">
                    Services
                  </Link>
                  <>|</>
                  <Link to="/portfolio" className="mx-2">
                    Portfolio
                  </Link>
                  <>|</>
                  <Link to="/contact" className="mx-2">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default About;
