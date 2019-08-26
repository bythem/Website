import React, { Component } from "react";
import { db, fbStorage } from '../firebase';
import FileUploader from "react-firebase-file-uploader";

class AddProjectImages extends Component {
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
    const s_ref = db.ref("/projects");
    s_ref.once("value", snapshot => {
      if (snapshot) {
        this.setState({ slist: snapshot })
      }
    })
  }

  handleComplete = (p_name, p_image) => {
    const projectID = db.ref("/projectimages").push();
    projectID
      .set(
        {
          project_name: p_name,
          project_image: p_image,
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
              <h2>Add New Project Image</h2>
            </div>
            <div className="col-12">
              
              <div className="form-group">

                <select className="form-control" value={this.state.p_name} id="p_name"
                  onChange={this.updateState}>
                  {this.state.slist &&
                    Object.keys(this.state.slist.val()).map(id => {
                      let s = this.state.slist.val();
                      return (
                        <option value={s[id]["project_name"]}>{s[id]["project_name"]}</option>
                      )
                    })
                  }
                </select>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" value={this.state.p_image} id="p_image" placeholder="Project Image url " 
                  onChange={this.updateState} />
              </div>

              <button onClick={() => this.handleComplete(this.state.p_name, this.state.p_image)} className="btn btn-primary">SUBMIT</button>

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

export default AddProjectImages;