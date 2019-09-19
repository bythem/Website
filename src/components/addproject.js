import React, { Component } from "react";
import { db, fbStorage } from '../firebase';
import FileUploader from "react-firebase-file-uploader";

class AddProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
    this.updateState = this.updateState.bind(this);
  };
  updateState = (e) => {
    this.setState({ [e.target.id] : e.target.value  })
}
  componentDidMount = () => {
    /** BIND SERVICES DROPDOWN WITH AVAILABLE SERVICE */
    const s_ref = db.ref("/services");
    s_ref.once("value", snapshot => {
      if (snapshot) {
        this.setState({ slist: snapshot })
      }
    })
  }

  handleComplete = (p_name, p_description, p_service, p_image,p_location) => {
    const projectID = db.ref("/projects").push();
    projectID
      .set(
        {
          project_name: p_name,
          project_description: p_description,
          project_service: p_service,
          project_image:p_image,
          project_location:p_location,
          project_pagename: p_name.toString().toLowerCase().replace(/\s/g, '-'), //lowercase and no space will be helpful for URLs
          project_created_at: Date.now()
        },
        function (error) {
          if (error) {
            alert("Data could not be saved." + error);
          } else {
            alert("Data saved successfully.");
            window.location.reload();
          }
        }
      )
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    alert(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fbStorage.ref("images").child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url }));
  };


  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="row">
            <div className="col-12">
              <h2>Add New Project</h2>
            </div>
            <div className="col-12">
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.p_name} id="p_name" placeholder="Enter Project Name" 
                  onChange={this.updateState} />

              </div>
              <div className="form-group">
                <input type="text" className="form-control" value={this.state.p_location} id="p_location" placeholder="Project Location " 
                  onChange={this.updateState} />
              </div>

              <div className="form-group">
                <textarea type="text" className="form-control" value={this.state.p_description} id="p_description" placeholder="Describe the Project" 
                  onChange={this.updateState} />
              </div>

              <div className="form-group">
                <input type="text" className="form-control" value={this.state.p_image} id="p_image" placeholder="Project Cover Image url " 
                  onChange={this.updateState} />
              </div>
              

              <div className="form-group">

                <select className="form-control" value={this.state.p_service} id="p_service"
                  onChange={this.updateState}>
                    <option value="empty">SELECT A SERVICE</option>
                  {this.state.slist &&
                    Object.keys(this.state.slist.val()).map(id => {
                      let s = this.state.slist.val();
                      return (
                        <option value={s[id]["service_name"]}>{s[id]["service_name"]}</option>
                      )
                    })
                  }
                </select>
              </div>

              <button onClick={() => this.handleComplete(this.state.p_name, this.state.p_description, this.state.p_service, this.state.p_image,this.state.p_location)} className="btn btn-primary">Submit</button>

            </div>
            <div className="col-12 mt-5">
              <h5>Upload images here</h5>

              {this.state.isUploading &&
                <div className="progress-bar" role="progressbar" style={{ width: this.state.progress + '%' }} aria-valuenow={this.state.progress} aria-valuemin="0" aria-valuemax="100">{this.state.progress}</div>
              }
              {this.state.avatarURL &&
                <div className="uploaded image">
                  <label>Image:</label>
                  <a target="_blank" href={this.state.avatarURL}><img className="img img-fluid" src={this.state.avatarURL} /></a>
                </div>
              }
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
          </div>
        </div>

      </React.Fragment>
    );
  }
};

export default AddProject;