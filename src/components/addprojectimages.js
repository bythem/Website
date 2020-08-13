import React, { Component } from "react";
import { db, fbStorage } from "../firebase";
import FileUploader from "react-firebase-file-uploader";
import GalleryU from "./gallery";

class AddProjectImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      filenames: [],
      downloadURLs: [],
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  updateProject = (e) => {
    this.setState({ [e.target.id]: e.target.value });

    if (e.target.value || e.target.value !== "empty") {
      this.getImagesByProject(e.target.value);
    }
  };

  componentDidMount = () => {
    /** BIND PROJECTS DROPDOWN WITH AVAILABLE SERVICE */
    const p_ref = db.ref("/projects");
    p_ref.once("value", (snapshot) => {
      if (snapshot) {
        this.setState({ plist: snapshot });
      }
    });
  };

  updateCaption = (id, val, route) => {
    if (val) {
      let ref = db.ref("/projectimages/" + route);
      ref.update({
        image_caption: val,
      });
      this.getImagesByProject(this.state.i_projectid);
    }
  };

  getImagesByProject = (projectid) => {
    let list,
      photosList = [];
    let projectimagesRef = db.ref("/projectimages");
    projectimagesRef
      .orderByChild("image_projectid")
      .equalTo(projectid)
      .once("value", (snapshot) => {
        if (snapshot.val()) {
          list = snapshot.val();
          Object.keys(list).map((id, index) => {
            photosList.push({
              src: list[id]["image_projectimage"],
              caption: list[id]["image_caption"],
              route: id,
            });
          });
          this.setState({ photosList: photosList });
        } else {
          this.setState({ photosList: null });
        }
      });
  };

  handleComplete = (i_projectid, i_projectimage, i_projectimagecaption) => {
    const projectID = db.ref("/projectimages").push();
    projectID.set(
      {
        image_projectid: i_projectid,
        image_projectimage: i_projectimage,
        image_caption: i_projectimagecaption,
        image_created_at: Date.now(),
      },
      function (error) {
        if (error) {
          alert("Data could not be saved." + error);
        } else {
          alert("Data saved successfully.");
          window.location.reload();
        }
      }
    );
  };

  updateMultipleImagesToProject = async (
    i_projectid,
    i_projectimage,
    i_projectimagecaption
  ) => {
    const projectID = await db.ref("/projectimages").push();
    projectID.set(
      {
        image_projectid: i_projectid,
        image_projectimage: i_projectimage,
        image_caption: i_projectimagecaption,
        image_created_at: Date.now(),
      },
      function (error) {
        if (error) {
          alert("Data could not be saved." + error);
        }
      }
    );
    this.getImagesByProject(i_projectid);
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
      .then((url) => this.setState({ avatarURL: url, i_projectimage: url }));
  };

  handleMultipleUploadSuccess = async (filename) => {
    let downloadURL = await fbStorage
      .ref("images")
      .child(filename)
      .getDownloadURL();

    this.setState((oldState) => ({
      filenames: [...oldState.filenames, filename],
      downloadURLs: [...oldState.downloadURLs, downloadURL],
      progress: 100,
      isUploading: false,
    }));
    //console.log(downloadURL);
    this.updateMultipleImagesToProject(
      this.state.i_projectid,
      downloadURL,
      " "
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="row">
            <div className="col-12">
              <h2>Add New Project Image</h2>
            </div>
            <div className="col-12">
              <div className="form-group">
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

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.i_projectimage}
                  id="i_projectimage"
                  placeholder="Project Image url "
                  onChange={this.updateState}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.i_projectimagecaption}
                  id="i_projectimagecaption"
                  placeholder="Project Image Caption "
                  onChange={this.updateState}
                />
              </div>

              <button
                onClick={() =>
                  this.handleComplete(
                    this.state.i_projectid,
                    this.state.i_projectimage,
                    this.state.i_projectimagecaption
                  )
                }
                className="btn btn-primary"
              >
                SUBMIT
              </button>
            </div>
            <div className="col-12 mt-5">
              <h5>Upload images here</h5>

              {this.state.isUploading && (
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: this.state.progress + "%" }}
                  aria-valuenow={this.state.progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {this.state.progress}
                </div>
              )}
              {this.state.avatarURL && (
                <div className="uploaded image">
                  <label>Image:</label>
                  <a target="_blank" href={this.state.avatarURL}>
                    <img className="img img-fluid" src={this.state.avatarURL} />
                  </a>
                </div>
              )}
              <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={fbStorage.ref("images")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
            </div>

            <div className="col-12 mt-5">
              {this.state.i_projectid !== "empty" && this.state.i_projectid ? (
                <React.Fragment>
                  <h5>Add Multiple Images Here:</h5>
                  <FileUploader
                    accept="image/*"
                    name="avatar"
                    randomizeFilename
                    storageRef={fbStorage.ref("images")}
                    onUploadStart={this.handleUploadStart}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleMultipleUploadSuccess}
                    onProgress={this.handleProgress}
                    multiple
                  />
                </React.Fragment>
              ) : null}
            </div>
            <div className="col-12 mt-5">
              {this.state.photosList
                ? this.state.photosList.map((val, id) => {
                    return (
                      <div className="row" key={id}>
                        <div
                          className="col-sm-6 my-2"
                          style={{
                            backgroundImage: `url(${val["src"]})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            height: "200px",
                          }}
                        ></div>
                        <div className="col-sm-6 my-2">
                          <b>Current Caption:</b> {val["caption"]}
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Image Caption "
                            onBlur={(e) =>
                              this.updateCaption(
                                id,
                                e.target.value,
                                val["route"]
                              )
                            }
                          />
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProjectImages;
