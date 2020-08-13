import React, { Component } from "react";
import { Link } from "react-router-dom";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="row">
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/addservice">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title">
                      {" "}
                      Add New Service{" "}
                    </h5>
                    <p className="card-text service-card-description text-justify">
                      {" "}
                      Add new service, and image url in the form is the cover
                      image that is shown on the services page{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/editservice">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title">
                      {" "}
                      Edit / Delete Service{" "}
                    </h5>
                    <p className="card-text service-card-description text-justify">
                      {" "}
                      You can edit or delete a particular service.{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/addproject">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title">
                      {" "}
                      Add New Project{" "}
                    </h5>
                    <p className="card-text service-card-description text-justify">
                      {" "}
                      Add new project to Portfolio. Select type of service
                      dropdown so that will automatically displayed in services
                      page.{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/editproject">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title">
                      {" "}
                      Edit / Delete Project{" "}
                    </h5>
                    <p className="card-text service-card-description text-justify">
                      {" "}
                      You can edit or delete a particular project.{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/addprojectimages">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title">
                      {" "}
                      Add Project Images{" "}
                    </h5>
                    <p className="card-text service-card-description text-justify">
                      {" "}
                      Add Images to a particular project.{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/webimages">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title"> Web Images </h5>
                    <p className="card-text service-card-description text-justify">
                      {" "}
                      View all the images on the website{" "}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/createreviewlinks">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title">
                      {" "}
                      Create Review Links
                    </h5>
                    <p className="card-text service-card-description text-justify">
                      Generate review links to send to Client
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 mb-3">
              <Link className="no-text-decoration" to="/pagecontents">
                <div className="card services-card h-100">
                  <div className="card-body">
                    <h5 className="card-title service-title"> Page Contents</h5>
                    <p className="card-text service-card-description text-justify">
                      Create or edit page content based on location
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
