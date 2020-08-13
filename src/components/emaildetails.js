import React, { Component } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

class EmailDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    let cf_id = this.props.match.params.email;
    const cf_ref = db.ref("/contactrequests/" + cf_id);
    cf_ref.once("value", (snapshot) => {
      if (snapshot) {
        this.setState({ cflist: snapshot.val() });
      }
    });
  };

  getNumberOfDaysAgo = (date) => {
    const date2 = new Date(Date.now());
    const date1 = new Date(date);
    const diffTime = Math.abs(date2 - date1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  updateEmailViewedStatus = (currentState) => {
    let updatedState;
    if (currentState) {
      updatedState = false;
    } else {
      updatedState = true;
    }
    let cf_id = this.props.match.params.email;
    const cf_ref = db.ref("/contactrequests/" + cf_id);
    cf_ref.update(
      {
        contact_viewed: updatedState,
      },
      function (error) {
        if (error) {
          alert("Data could not be saved." + error);
        } else {
          alert("Updated Status Successfully.");
          window.location.reload();
        }
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="list-group">
            {this.state.cflist && (
              <div className="emailDetails">
                <div className="row email-details-header mb-3">
                  <div className="col-12">
                    <p className="text-dark d-inline">
                      FROM: {this.state.cflist["contact_email"]}
                    </p>
                    <small className="d-inline float-right">
                      {this.getNumberOfDaysAgo(
                        this.state.cflist["contact_request_created_at"]
                      )}{" "}
                      day(s) ago
                    </small>
                  </div>

                  <div className="col-md-6 mb-2 text-center">
                    <Link
                      className="btn btn-primary btn-submit text-white"
                      onClick={() =>
                        this.updateEmailViewedStatus(
                          this.state.cflist["contact_viewed"]
                        )
                      }
                    >
                      {this.state.cflist["contact_viewed"]
                        ? "Mark As Unread"
                        : "Mark As Read"}
                    </Link>
                  </div>
                  <div className="col-md-6 mb-2 text-center">
                    <a
                      className="btn btn-primary btn-submit text-white"
                      href={"mailto:" + this.state.cflist["contact_email"]}
                    >
                      Email Customer
                    </a>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="emailName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailName"
                    value={
                      this.state.cflist["contact_first_name"] +
                      " " +
                      this.state.cflist["contact_last_name"]
                    }
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailEAddress">Email Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailEAddress"
                    value={this.state.cflist["contact_email"]}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailPhone">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailPhone"
                    value={
                      this.state.cflist["contact_phone"]
                        ? this.state.cflist["contact_phone"]
                        : "N/A"
                    }
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emailMessage">Message</label>
                  <textarea
                    className="form-control"
                    id="emailMessage"
                    value={this.state.cflist["contact_comments"]}
                    readOnly
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default EmailDetails;
