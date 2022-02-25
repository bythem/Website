import React, { Component } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import FadeIn from "react-fade-in";

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

    if (!this.props.title) {
      this.getProjects();
    } else {
      this.getProjectsByService(this.props.serviceProjects);
    }
  };

  getProjects = () => {
    const p_ref = db.ref("/projects");
    p_ref.orderByChild("active").once("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({ plist: snapshot.val() });
      }
    });
  };

  // shouldComponentUpdate = (nextProps, nextState) => {
  //   if (this.props.serviceKey !== nextProps.serviceKey) {
  //     this.getProjectsByService(this.props.serviceProjects);
  //     this.forceUpdate();
  //     return true;
  //   }
  //   return false;
  // };

  getProjectsByService = (serviceProjects) => {
    const p_ref = db.ref("/projects");
    p_ref.orderByChild("active").once("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({
          plist: snapshot.val(),
          serviceProjects: serviceProjects,
        });
        this.forceUpdate();
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <FadeIn transitionDuration="2000">
          <div className="page-content container">
            <div className="row">
              {this.state.plist ? (
                <>
                  <div className="col-12 mb-4">
                    {this.props.title ? (
                      <h3 className="page-title mt-4">{this.props.title}</h3>
                    ) : (
                      <h2 className="page-title">Portfolio</h2>
                    )}
                  </div>

                  {this.state.serviceProjects && this.state.plist
                    ? this.state.serviceProjects.map((id) => {
                        let p = this.state.plist;
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
                      })
                    : Object.keys(this.state.plist).map((id) => {
                        let p = this.state.plist;
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
        </FadeIn>
      </React.Fragment>
    );
  }
}

export default Portfolio;
