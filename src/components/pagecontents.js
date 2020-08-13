import React, { Component } from "react";
import { db, fbStorage } from "../firebase";

class PageContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  componentDidMount = () => {
    /** BIND SERVICES DROPDOWN WITH AVAILABLE SERVICE */
    this.getContent();
  };

  getContent = () => {
    const ref = db.ref("/pagecontent");
    ref.once("value", (snapshot) => {
      if (snapshot) {
        this.setState({ contentlist: snapshot });
      }
    });
  };

  handleComplete = (c_location, c_title, c_description, c_active) => {
    if (c_location && c_description && c_active !== "empty") {
      const contentid = db.ref("/pagecontent").push();
      contentid.set(
        {
          content_location: c_location,
          content_title: c_title,
          content_description: c_description,
          content_active: c_active,
          content_pagename: c_title
            .toString()
            .toLowerCase()
            .replace(/\s/g, "-"), //lowercase and no space will be helpful for URLs
          content_created_at: Date.now(),
        },
        function (error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            alert("Data saved successfully.");
          }
        }
      );
      this.getContent();
    }
  };

  handleUpdate = (contentid, c_location, c_title, c_description, c_active) => {
    if (contentid && c_location && c_description && c_active) {
      /* Update the changes made to the service */

      db.ref("/pagecontent/" + contentid).update(
        {
          content_location: c_location,
          content_title: c_title,
          content_description: c_description,
          content_active: c_active,
          content_pagename: c_title
            .toString()
            .toLowerCase()
            .replace(/\s/g, "-"), //lowercase and no space will be helpful for URLs
          content_created_at: Date.now(),
        },
        function (error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            alert("Data saved successfully.");
          }
        }
      );

      this.getContent();
    }
  };

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = (progress) => this.setState({ progress });

  handleUploadError = (error) => {
    this.setState({ isUploading: false });
    alert(error);
  };

  handleUploadSuccess = (filename) => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fbStorage
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ avatarURL: url, p_image: url }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="row">
            <div className="col-12">
              <h2>Add New Content</h2>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.c_location}
                  id="c_location"
                  placeholder="Enter Location Name"
                  onChange={this.updateState}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.c_title}
                  id="c_title"
                  placeholder="Enter Title "
                  onChange={this.updateState}
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control"
                  value={this.state.c_description}
                  id="c_description"
                  placeholder="Enter Description "
                  onChange={this.updateState}
                />
              </div>

              <div className="form-group">
                <select
                  className="form-control"
                  value={this.state.c_active}
                  id="c_active"
                  onChange={this.updateState}
                >
                  <option value="empty">SELECT STATUS</option>
                  <option value="true">TRUE</option>
                  <option value="false">FALSE</option>
                </select>
              </div>

              <button
                onClick={() =>
                  this.handleComplete(
                    this.state.c_location,
                    this.state.c_title,
                    this.state.c_description,
                    this.state.c_active
                  )
                }
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>

          <div className="">
            {this.state.contentlist ? (
              <div className="row mt-4">
                <div className="col-12">
                  <h2>Existing Contents</h2>
                </div>

                {Object.keys(this.state.contentlist.val()).map((id) => {
                  let c = this.state.contentlist.val();
                  return (
                    <div key={id} className="col-md-6 mb-3">
                      <div className="pagecontent-card">
                        {/* <img src={p[id]["project_image"]} className="img img-fluid portfolio-project-image" /> */}
                        <div className="form-group">
                          <label>{c[id]["content_location"]}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={this.state["c_location_" + id]}
                            id={"c_location_" + id}
                            placeholder="Enter Location Name"
                            onChange={this.updateState}
                          />
                        </div>
                        <div className="form-group">
                          <label>{c[id]["content_title"]}</label>
                          <input
                            type="text"
                            className="form-control"
                            value={this.state["c_title_" + id]}
                            id={"c_title_" + id}
                            placeholder="Enter Title "
                            onChange={this.updateState}
                          />
                        </div>
                        <div className="form-group">
                          <label>{c[id]["content_description"]}</label>
                          <textarea
                            type="text"
                            className="form-control"
                            value={this.state["c_description_" + id]}
                            id={"c_description_" + id}
                            placeholder="Enter Description "
                            onChange={this.updateState}
                          />
                        </div>

                        <div className="form-group">
                          <label>{c[id]["content_active"]}</label>
                          <select
                            className="form-control"
                            value={this.state["c_active_" + id]}
                            id={"c_active_" + id}
                            onChange={this.updateState}
                          >
                            <option value="empty">SELECT STATUS</option>
                            <option value="true">TRUE</option>
                            <option value="false">FALSE</option>
                          </select>
                          <button
                            onClick={() =>
                              this.handleUpdate(
                                id,
                                this.state["c_location_" + id]
                                  ? this.state["c_location_" + id]
                                  : c[id]["content_location"],
                                this.state["c_title_" + id]
                                  ? this.state["c_title_" + id]
                                  : c[id]["content_title"],
                                this.state["c_description_" + id]
                                  ? this.state["c_description_" + id]
                                  : c[id]["content_description"],
                                this.state["c_active_" + id]
                                  ? this.state["c_active_" + id]
                                  : c[id]["content_active"]
                              )
                            }
                            className="btn btn-primary mt-2 "
                          >
                            UPDATE
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PageContent;
