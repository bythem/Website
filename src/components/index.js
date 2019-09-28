import React, { Component } from "react";
import ReactTypingEffect from "react-typing-effect";


class IndexPage extends Component {


  componentDidMount = () => {
    document.title = "THEM STUDIOS | Planning | Interior Design | Furniture & Accessory Design | Landscape Design";
  }

  render() {
    return (

      <div className=" index-page text-center">
        <div className="container">
          <h1 className="quote my-5">
            Simple is hard - Martin Charles Scorsese
            </h1>
        </div>
        <div className="container-fluid homepage-images-div">
          <div className="row">
            <div className="d-none d-md-block col-md-3 ">
              <div className="homepage-images-left"
              >

              </div></div>
            <div className="col-md-6 ">
              <div className="homepage-images-center"

              >

              </div></div>
            <div className="d-none d-md-block col-md-3">
              <div className=" homepage-images-right">


              </div></div>
          </div>

        </div>
        <div className="container">
          <h3 className="homepage-about-title my-5">
            What We Do
            </h3>

          <p className="text-justify">
            We create designs in a collaborative environment enabling us to deliver the client’s ultimate vision.
            Our innovative design style creates an
            extremely successful partnership with our clients.
            It is our passion to constantly pursue fresh inspiration.
            We continually search for the most compelling design styles and highest quality of materials available.
            Hours of extensive market research allow us to create each design specific to your target market.
               We take pride in our work ethic, our eye for innovative designs, and our commitment to our clients.</p>
        </div>
      </div>
    )

  }




};

export default IndexPage;