import React, { Component } from "react";
import PageContent from "../components/pagecontent";
import FadeIn from "react-fade-in";

class IndexPage extends Component {
  componentDidMount = () => {
    document.title =
      "THEM STUDIOS | Planning | Interior Design | Furniture & Accessory Design | Landscape Design";
  };

  render() {
    return (
      <FadeIn transitionDuration="1000">
        <div className=" index-page text-center">
          <div className="container">
            <h1 className="quote mt-3">
              Simple is hard - Martin Charles Scorsese
            </h1>
          </div>
          <div className="container-fluid homepage-images-div">
            <div className="row">
              <div className="d-none d-md-block col-md-3 ">
                <div className="homepage-images-left"></div>
              </div>
              <div className="col-md-6 ">
                <div className="homepage-images-center"></div>
              </div>
              <div className="d-none d-md-block col-md-3">
                <div className=" homepage-images-right"></div>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <PageContent pagecontentid="-MDGRuhFTBixRVFspb4V" />
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default IndexPage;
