import React, { Component } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import FadeIn from "react-fade-in";

const mapStateToProps = (state) => {
  return state;
};

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  componentDidMount = () => {
    document.title = "THEM - Services"; // SET PAGE TITLE

    // GET ALL SERVICES FROM FIREBASE REAL TIME DATABASE
    const s_ref = db.ref("/services");
    s_ref.once("value", (snapshot) => {
      if (snapshot) {
        this.setState({ slist: snapshot });
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <FadeIn transitionDuration="1000">
          <div className="page-content container">
            <div className="row">
              <div className="col-12 mb-4">
                <h2 className="page-title">SERVICES</h2>
                <h5 className="sdetail-description text-justify">
                  At <b>Them</b>, we translate our/your vision into reality. The
                  projects of our studios are fulfilled considering your taste
                  and our designs with latest designs. We provide you an album
                  of visualizations which are both functional and aesthetic.
                  With this approach, you receive an everlasting experience of
                  living in your space and we receive immense satisfaction.
                </h5>
              </div>
              {this.state.slist
                ? Object.keys(this.state.slist.val()).map((id) => {
                    let s = this.state.slist.val();
                    let imgurl = s[id]["service_image"];
                    return (
                      <div key={id} className="col-md-6 col-lg-4 mb-4">
                        <Link
                          className="no-text-decoration"
                          to={{
                            pathname: `services/${s[id]["service_pagename"]}`,
                            serviceid: `${id}`,
                          }}
                        >
                          <div className="card services-card h-100">
                            <div
                              className="services-image"
                              style={{ backgroundImage: `url(${imgurl})` }}
                            ></div>
                            <div className="card-body text-center">
                              <h5 className="card-title service-title">
                                {" "}
                                {s[id]["service_name"]}
                              </h5>
                              {/* <p className="card-text service-card-description text-justify">
                                {" "}
                                {s[id]["service_description"]}
                              </p> */}
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </FadeIn>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, null)(Services);
