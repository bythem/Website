import React, { Component } from "react";
import { Link } from "react-router-dom";
import { db, fbStorage } from "../firebase";
import { UserAdd } from "grommet-icons";
import FileUploader from "react-firebase-file-uploader";

class Feedbacks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.userData,
      editProfile: false,
    };
  }

  componentDidMount = () => {
    document.title = "THEM | Profile Page ";
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  updateProfile = (firstName, lastName, avatarurl, uid) => {
    let dref = db.ref("/users/");
    dref
      .orderByChild("user_id")
      .equalTo(uid)
      .once("value", (snapshot) => {
        return snapshot;
      })
      .then((res) => {
        if (res.exists()) {
          let refkey = Object.keys(res.val())[0];
          let ref = db.ref("/users/" + refkey);
          console.log(firstName);
          console.log(lastName);
          ref
            .update({
              user_first_name: firstName,
              user_last_name: lastName,
              user_avatar: avatarurl,
            })
            .then((res) => {
              this.setState({ editProfile: false });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((err) => {
        this.setState({ error: err });
      });
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
      .ref("usersimage")
      .child(filename)
      .getDownloadURL()
      .then((url) => this.setState({ avatarURL: url, s_image: url }));
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="profile-page">
            {!this.state.user.user_first_name ||
            !this.state.user.user_last_name ||
            this.state.editProfile ? (
              <>
                <div className="row">
                  <div className="col-12">
                    {this.state.editProfile ? (
                      <>
                        <h4>Edit Profile</h4>
                      </>
                    ) : (
                      <>
                        <h4>Please Complete Profile Information</h4>
                      </>
                    )}
                  </div>
                  <div className="col-12 my-3 text-center">
                    {this.state.avatarURL ? (
                      <img
                        style={{ maxHeight: "100px" }}
                        src={this.state.avatarURL}
                        className="img img-fluid mb-2"
                      />
                    ) : this.state.user.user_avatar ? (
                      <img
                        style={{ maxHeight: "100px" }}
                        src={this.state.user.user_avatar}
                        className="img img-fluid mb-2"
                      />
                    ) : null}{" "}
                    <br />
                    Update Profile Image
                    <FileUploader
                      className="ml-3"
                      accept="image/*"
                      name="avatar"
                      randomizeFilename
                      storageRef={fbStorage.ref("usersimage")}
                      onUploadStart={this.handleUploadStart}
                      onUploadError={this.handleUploadError}
                      onUploadSuccess={this.handleUploadSuccess}
                      onProgress={this.handleProgress}
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <input
                      name="First Name"
                      type="text"
                      className="form-control"
                      id="user_first_name"
                      placeholder="First Name"
                      value={
                        this.state.user_first_name ||
                        this.state.user.user_first_name ||
                        ""
                      }
                      onChange={this.updateState}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <input
                      name="Last Name"
                      type="text"
                      className="form-control"
                      id="user_last_name"
                      placeholder="Last Name"
                      value={
                        this.state.user_last_name ||
                        this.state.user.user_last_name ||
                        ""
                      }
                      onChange={this.updateState}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <input
                      name="Email Address"
                      type="text"
                      className="form-control"
                      id="user_email"
                      placeholder="Email"
                      value={
                        this.state.user_email ||
                        this.state.user.user_email ||
                        ""
                      }
                      disabled
                    />
                  </div>

                  <div className="col-12 mt-4 text-center">
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => {
                        this.updateProfile(
                          this.state.user_first_name ||
                            this.state.user.user_first_name,
                          this.state.user_last_name ||
                            this.state.user.user_last_name,
                          this.state.avatarURL || "",
                          this.state.user.user_id
                        );
                      }}
                    >
                      Update Profile
                    </button>
                    {this.state.editProfile ? (
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => {
                          this.setState({ editProfile: false });
                        }}
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="row">
                  <div className="col-4 mt-4  text-center">
                    {this.state.user.user_avatar ? (
                      <img
                        alt="Avatar"
                        style={{ maxHeight: "200px" }}
                        src={this.state.user.user_avatar}
                        className="img img-fluid"
                      />
                    ) : (
                      <div
                        className="text-center"
                        onClick={() => {
                          this.setState({ editProfile: true });
                        }}
                      >
                        <UserAdd size="xlarge" className="mb-2" />
                      </div>
                    )}
                  </div>
                  <div className="col-8 mt-4">
                    <h4>
                      {this.state.user.user_first_name}{" "}
                      {this.state.user.user_last_name}
                    </h4>
                    <h6>{this.state.user.user_email}</h6>
                  </div>
                  <div className="col-12 mt-4 text-right">
                    <button
                      className="btn btn-primary"
                      onClick={() => this.setState({ editProfile: true })}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Feedbacks;
