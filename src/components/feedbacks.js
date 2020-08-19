import React, { Component } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { Star } from "grommet-icons";

class Feedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadCount: 0,
    };
  }

  componentDidMount = () => {
    document.title = "THEM | Feedbacks";
    const pref = db.ref("/projects").once("value", (snapshot) => {
      this.setState({ plist: snapshot.val() });
    });

    const cf_ref = db.ref("/feedbacks");
    cf_ref.orderByChild("cusmt").once("value", (snapshot) => {
      if (snapshot.val()) {
        this.setState({ flist: snapshot });
      }
    });

    let unreadCount = 0;

    cf_ref
      .orderByChild("contact_viewed")
      .equalTo(false)
      .once("value", function (snapshot) {
        return unreadCount;
      })
      .then((unreadCount) => {
        let count;
        if (unreadCount.val()) {
          count = Object.keys(unreadCount.val()).length;
        } else {
          count = 0;
        }
        this.setState({ unreadCount: count });
      });
  };

  getProjectName = (projectid) => {
    let projects = this.state.plist;
    return projects[projectid].project_name;
  };

  getNumberOfDaysAgo = (date) => {
    const date2 = new Date(Date.now());
    const date1 = new Date(date);
    const diffTime = Math.abs(date2 - date1);

    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="my-3">
            <h2 className="page-title">Customer Feedbacks</h2>
          </div>
          <div className="list-group">
            {this.state.flist ? (
              Object.keys(this.state.flist.val()).map((id) => {
                let cf = this.state.flist.val();
                return (
                  <div
                    key={id}
                    className={
                      "list-group-item list-group-item-action no-text-decoration " +
                      (cf[id]["contact_viewed"] ? " " : "email-unread")
                    }
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-2 text-dark">
                        <b>Project: </b>
                        {this.getProjectName(cf[id].customerproject_id)}
                      </h6>
                      <small>
                        {this.getNumberOfDaysAgo(cf[id].feedback_created_at)}{" "}
                        day(s) ago
                      </small>
                    </div>
                    <p className="text-muted my-3">
                      <b>Comments:</b> {cf[id]["feedback_comments"]}
                    </p>
                    <div className="d-flex flex-column flex-sm-row">
                      <div className="form-group">
                        <label>Rating</label>
                        <div className="text-left">
                          {[...Array(5)].map((res, i) => {
                            return (
                              <Star
                                key={i + 1}
                                color={
                                  cf[id].feedback_rating >= i + 1
                                    ? "#69884D"
                                    : "silver"
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div className="ml-sm-auto">
                        <a
                          className="btn btn-primary btn-submit text-white"
                          href={"mailto:" + cf[id].feedback_email}
                        >
                          Email Customer
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="card text-center bg-danger font-weight-bold">
                <div className="card-body text-white">
                  No Customer Feedbacks yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feedbacks;
