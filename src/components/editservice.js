import React, {Component}  from "react";
import {db, fbStorage} from '../firebase';
import FileUploader from "react-firebase-file-uploader";

class EditService extends Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
           data: ''
        }
     };
     

     componentDidMount = () => {
     

        /* Bind service to the dropdown*/
        const s_ref = db.ref("/services");
        s_ref.once("value", snapshot => {
           if(snapshot){

            this.setState({slist :snapshot})
           }
        })

        
     }

     handleComplete = (s_name,s_description, s_image, s_serviceid) => {

      /* Update the changes made to the service */

      db.ref("/services/"+s_serviceid).set(
           {
             service_name: s_name,
             service_description: s_description,
             service_pagename: s_name.toString().toLowerCase().replace(" ", "-"),
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

      handleChangeUsername = event =>
        this.setState({ username: event.target.value });

      handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

      handleProgress = progress => this.setState({ progress });

      handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
      };

      handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        fbStorage.ref("images").child(filename).getDownloadURL().then(url => this.setState({ avatarURL: url }));
      };



      serviceSelected = (e) => {
        if(e.target.value !== "empty")
        {
          this.setState({s_serviceid: e.target.value})
          const s_ref = db.ref("/services/"+e.target.value);
            s_ref.once("value", snapshot => {
                if (snapshot) {
                  this.setState({
                      s_name: snapshot.val()["service_name"], 
                      s_description: snapshot.val()["service_description"], 
                      s_image: snapshot.val()["service_image"],
                    })
                }
            })
        }
      }

      deletService = (id) => {
       
          
          if (window.confirm('Are you sure you want to delete?')) 
          {
              db.ref("/services/").child(id).remove().then(function() {
                  // File deleted successfully
                  alert("successfully deleted !!")
                  window.location.reload();
                }).catch(function(error) {
                  // Uh-oh, an error occurred!
                  alert(error.message)
                });
          }
          
    
      }

      showallservices = (e) => {
        this.setState({showallservices: e.target.checked})
      }
      
      updateState = (e) => {
          this.setState({ [e.target.id] : e.target.value  })
      }

  render() {
    return (
    <React.Fragment>
            <div className="container page-content">
                <div className="row">
                    <div className="col-12">
                        <h2>Edit Service</h2>
                    </div>

                    <div className="col-12 my-5">
                        <div className="form-group">

                            <select className="form-control" id="s_serviceid" 
                                onChange={this.serviceSelected} value={this.state.s_serviceid}>
                                  <option value="empty">SELECT A SERVICE</option>
                                {this.state.slist &&
                                    Object.keys(this.state.slist.val()).map(id => {
                                        let s = this.state.slist.val();
                                        return (
                                            <option value={id}>{s[id]["service_name"]}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                    </div>

                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" className="form-control" id="s_name" placeholder="Enter Service Name"
                            value={this.state.s_name} onChange={this.updateState} />
                            
                        </div>
                        <div className="form-group">
                            <textarea type="text" className="form-control" id="s_description" placeholder="Describe the Service" 
                            onChange={this.updateState} value={this.state.s_description}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="s_image" placeholder="paste the URL here" 
                             onChange={this.updateState} value={this.state.s_image}
                            />
                        </div>
                       
                        
                        <button onClick={() => this.handleComplete(this.state.s_name,this.state.s_description,this.state.s_image,this.state.s_serviceid)} className="btn btn-primary">Update Service</button>

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

                    <div className="col-12 mt-5">

                    <input type="checkbox" onChange={this.showallservices} checked={this.state.showallservices}/> SHOW ALL SERVICES

                    <br/>
                        <div className="row">
                        {this.state.showallservices && 
                        
                            Object.keys(this.state.slist.val()).map(id => {
                              let s = this.state.slist.val();
                              return (
                                <div className="col-12 mb-3" style={{padding:'10px', border:'1px solid black'}}><span className="tex-left">{s[id]["service_name"]}</span> 
                                <span style={{float:'right'}}>
                                <button onClick={() => this.deletService(id)} className="btn btn-danger">Delete Service</button>
                                  </span></div>
                              )
                            })
                        }
                        </div>
                    </div>


                </div>
            </div>

      </React.Fragment>
    );
  }
};

export default EditService;