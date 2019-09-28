import React, {Component}  from "react";
import {db, fbStorage} from '../firebase';
import FileUploader from "react-firebase-file-uploader";

class AddService extends Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
           data: ''
        }
        this.updateState = this.updateState.bind(this);
     };
     updateState(e) {
        this.setState({s_name: this.refs.s_name.value, s_description: this.refs.s_description.value, s_image: this.refs.s_image.value});
       
     }

     componentDidMount = () => {
     
     }

     handleComplete = (s_name,s_description, s_image) => {
         const serviceID = db.ref("/services").push();
        console.log(s_name+s_description+s_image)
         serviceID
         .set(
           {
             service_name: s_name,
             service_description: s_description,
             service_pagename: s_name.toString().toLowerCase().replace(/\s/g, '-'),
             service_created_at: Date.now(),
             service_image: s_image
           },
           function(error) {
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
        fbStorage.ref("images").child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url, s_image : url }));
      };



  render() {
    return (
    <React.Fragment>
            <div className="container page-content">
                <div className="row">
                    <div className="col-12">
                        <h2>Add new Service</h2>
                    </div>
                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" className="form-control" id="service_name" placeholder="Enter Service Name" ref="s_name" 
                            onChange={this.updateState.bind(this)} />
                            
                        </div>
                        <div className="form-group">
                            <textarea type="text" className="form-control" id="service_description" placeholder="Describe the Service"  ref="s_description" 
                            onChange={this.updateState.bind(this)}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="service_image" placeholder="paste the URL here"  ref="s_image"
                             onChange={this.updateState.bind(this)}
                            />
                        </div>
                       
                        
                        <button onClick={() => this.handleComplete(this.state.s_name,this.state.s_description,this.state.s_image)} className="btn btn-primary">Submit</button>

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

export default AddService;