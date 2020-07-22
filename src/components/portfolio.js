import React, { Component } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

class Portfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  componentDidMount = () => {
    document.title = "THEM - Portfolio"; // SET PAGE TITLE
    // GET ALL PROJECTS FROM FIREBASE REAL TIME DATABASE

    if (this.props.title) {
      if (this.props.serviceKey)
        this.getProjectsByService(this.props.serviceKey);
    } else {
      const p_ref = db.ref("/projects");
      p_ref.once("value", (snapshot) => {
        if (snapshot) {
          this.setState({ plist: snapshot });
          this.forceUpdate();
        }
      });
    }
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.serviceKey !== nextProps.serviceKey) {
      if (nextProps.serviceKey)
        setTimeout(() => {
          this.getProjectsByService(nextProps.serviceKey);
        }, 250);
      return true;
    }
    return false;
  };

  getProjectsByService = (serviceId) => {
    let projectimagesRef = db.ref("/projects");
    let count = 0;
    projectimagesRef
      .orderByChild("project_service")
      .equalTo(serviceId)
      .once("value", (snapshot) => {
        if (snapshot.val()) {
          count = Object.keys(snapshot.val()).length;
          this.setState({
            plist: snapshot,
            projectscount: count,
          });
          this.forceUpdate();
        } else {
          this.setState({ plist: null, projectscount: count });
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content container">
          <div className="row">
            {this.state.plist ? (
              <>
                <div className="col-12 mb-4">
                  {this.props.title ? (
                    <h3 className="page-title mt-4">{this.props.title}</h3>
                  ) : (
                    <h2 className="page-title">PORTFOLIO</h2>
                  )}

                  {this.state.serviceId}
                </div>

                {Object.keys(this.state.plist.val()).map((id) => {
                  let p = this.state.plist.val();
                  return (
                    <div key={id} className="col-md-6 col-lg-4 mb-3">
                      <Link
                        className="no-text-decoration"
                        to={{
                          pathname: `/project/${p[id]["project_pagename"]}`,
                          projectid: `${id}`,
                        }}
                      >
                        <div
                          className="portfolio-project-card"
                          style={{
                            backgroundImage: `url(${p[id]["project_image"]})`,
                          }}
                        >
                          {/* <img src={p[id]["project_image"]} className="img img-fluid portfolio-project-image" /> */}
                          <div className="portfolio-project-short-description">
                            <div className="project-border-top"></div>
                            <div className="description text-center">
                              <h5 className="description-title mb-0">
                                {" "}
                                {p[id]["project_name"]}
                              </h5>
                              <small className="description-text">
                                {" "}
                                {p[id]["project_location"]}
                              </small>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Portfolio;
