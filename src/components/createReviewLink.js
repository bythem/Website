import React, { Component } from "react";
import { db } from "../firebase";
import { Link } from "react-router-dom";

class CreateReviewLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  componentDidMount = () => {
    document.title = "THEM - Create Link"; // SET PAGE TITLE
    // GET ALL PROJECTS FROM FIREBASE REAL TIME DATABASE

    const p_ref = db.ref("/projects");
    p_ref.once("value", (snapshot) => {
      if (snapshot) {
        this.setState({ plist: snapshot });
        this.forceUpdate();
      }
    });
  };

  updateProject = (e) => {
    if (!e.target.value || e.target.value === "empty") {
      this.setState({ projectid: null, generatedLink: null });
    } else {
      let url = "https://bythem.studio/feedback/" + e.target.value;
      this.setState({ projectid: e.target.value, generatedLink: url });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content container">
          <div className="row">
            {this.state.plist ? (
              <>
                <div className="col-12 mb-4">
                  <h3>Create Review Link</h3>
                </div>
                <div className="form-group col-12">
                  <select
                    className="form-control"
                    value={this.state.i_projectid}
                    id="i_projectid"
                    onChange={this.updateProject}
                  >
                    <option value="empty">SELECT A PROJECT</option>
                    {this.state.plist &&
                      Object.keys(this.state.plist.val()).map((id) => {
                        let p = this.state.plist.val();
                        return (
                          <option value={id} key={id}>
                            {p[id]["project_name"]}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-12 my-3">
                  {this.state.generatedLink ? (
                    <div
                      style={{
                        backgroundColor: "rgba(63,63,63,1)",
                        padding: "20px",
                        borderRadius: "7px",
                      }}
                      className="d-flex flex-row"
                    >
                      <div className="text-white">
                        {this.state.generatedLink}
                      </div>

                      <div className="ml-auto">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              this.state.generatedLink
                            )
                          }
                        >
                          COPY
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateReviewLink;
