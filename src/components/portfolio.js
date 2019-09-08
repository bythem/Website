import React, { Component } from "react";
import { db } from '../firebase';
import { Link } from "react-router-dom";

class Portfolio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ''
    }
  };

  componentWillMount = () => {
    document.title = "THEM - Portfolio"; // SET PAGE TITLE
    // GET ALL SERVICES FROM FIREBASE REAL TIME DATABASE
    const p_ref = db.ref("/projects");
    p_ref.once("value", snapshot => {
      if (snapshot) {
        this.setState({ plist: snapshot })
      }
    })
  }




  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="row">
            <div className="col-12 mb-4">
              <h2 className="page-title">PORTFOLIO</h2>
            </div>
            {this.state.slist &&
              Object.keys(this.state.plist.val()).map(id => {
                let p = this.state.plist.val();
                return (
                  <div className="col-md-6 col-lg-4 mb-3">
                    <Link className="no-text-decoration" to={{ pathname: `projects/${p[id]["project_pagename"]}`, projectid: `${id}` }}>
                        <img src="https://amycarman.com/files/amycarman3/cache/5d082b60a6c5d482a8bfa1113dd351f6.jpg" className="img img-fluid" />
                        <div className="card-body">
                          <h5 className="card-title project-title"> {p[id]["project_name"]}</h5>
                          <p className="card-text project-card-description text-justify"> {p[id]["project_description"]}</p>
                        </div>
                      </Link>
                  </div>
                )
              })
            }
          </div>
        </div>

      </React.Fragment>
    );
  }
};

export default Portfolio;