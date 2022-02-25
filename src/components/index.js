import React, { Component } from "react";
import PageContent from "../components/pagecontent";
import FadeIn from "react-fade-in";
import MetaTags from "react-meta-tags";

class IndexPage extends Component {
  componentDidMount = () => {
    document.title =
      "THEM STUDIOS | Planning | Interior Design | Furniture & Accessory Design | Landscape Design";
  };

  render() {
    return (
      <FadeIn transitionDuration="1000">
        <MetaTags>
          <title>
            THEM STUDIOS | Planning | Interior Design | Furniture and Accessory
            Design | Landscape Design
          </title>
          <meta
            name="description"
            content="We excel in providing clients with designs with perfect blend in form and function"
          />
          <meta property="og:title" content="theM Studios" />
          <meta
            property="og:description"
            content="We excel in providing clients with designs with perfect blend in form and function"
          />
          <meta
            property="og:image"
            content="https://firebasestorage.googleapis.com/v0/b/bythem-f0fdb.appspot.com/o/images%2F09404e2e-48f9-4914-bdb8-95d89de4baf2.jpg?alt=media&token=36930f52-dfbe-435c-a415-17d305567775"
          />
          <meta property="og:type" content="website" />
        </MetaTags>
        <div className=" index-page text-center mb-5">
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
          <div className="container my-5">
            <PageContent pagecontentid="-MDGRuhFTBixRVFspb4V" />
          </div>
        </div>
      </FadeIn>
    );
  }
}

export default IndexPage;
