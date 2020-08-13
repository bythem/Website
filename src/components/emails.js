import React, { Component } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";

class Emails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadCount: 0,
    };
  }

  componentDidMount = () => {
    const cf_ref = db.ref("/contactrequests");
    cf_ref.orderByChild("contact_name").once("value", (snapshot) => {
      if (snapshot) {
        this.setState({ cflist: snapshot });
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
            <p>{this.state.unreadCount} unread email(s)</p>
          </div>
          <div className="list-group">
            {this.state.cflist &&
              Object.keys(this.state.cflist.val()).map((id) => {
                let cf = this.state.cflist.val();
                return (
                  <Link
                    key={id}
                    className={
                      "list-group-item list-group-item-action no-text-decoration " +
                      (cf[id]["contact_viewed"] ? " " : "email-unread")
                    }
                    to={{ pathname: `/email/${[id]}` }}
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-2 text-dark">
                        <b>From:</b> {cf[id]["contact_email"]}
                      </h6>
                      <small>
                        {this.getNumberOfDaysAgo(
                          cf[id]["contact_request_created_at"]
                        )}{" "}
                        day(s) ago
                      </small>
                    </div>
                    <small className="text-muted">
                      <b>SUBJECT:</b> {cf[id]["contact_comments"]}
                    </small>
                  </Link>
                );
              })}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Emails;
