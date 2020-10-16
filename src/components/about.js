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
            <div>
              {/* <div className="col-12 col-md-4 mb-2">
                <div className="h-100 d-flex flex-row align-items-center">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/bythem-f0fdb.appspot.com/o/images%2Fdbaff600-ba03-4138-9692-1ea93e97578e.webp?alt=media&token=8d63ec35-7025-4b13-9dec-1215a55262bb"
                    className="img img-fluid align-self-center"
                  />
                </div>
              </div> */}
              <div className="col-12 ">
                <div className="d-flex justify-content-center">
                  <Link
                    to="/portfolio"
                    className="btn btn-primary mr-2"
                    style={{ width: "127px" }}
                  >
                    View Portfolio
                  </Link>
                  <Link
                    to="/contact"
                    className="btn btn-primary"
                    style={{ width: "127px" }}
                  >
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
