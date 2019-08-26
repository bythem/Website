import React, {Component}  from "react";
import {db, fbStorage} from '../firebase';
import FileUploader from "react-firebase-file-uploader";

class EditProject extends Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
           data: ''
        }
     };
     

     componentDidMount = () => {
     

        /* Bind service to the dropdown*/
        const p_ref = db.ref("/projects");
        p_ref.once("value", snapshot => {
           if(snapshot){

            this.setState({plist :snapshot})
           }
        })

        const s_ref = db.ref("/services");
        s_ref.once("value", snapshot => {
          if (snapshot) {
            this.setState({ slist: snapshot })
          }
        })

        
     }

     handleComplete = (p_name,p_description, p_image, p_projectid, p_service) => {

      /* Update the changes made to the service */
      console.log(p_service)
      db.ref("/projects/"+p_projectid).update(
           {
            project_name: p_name,
            project_description: p_description,
            project_service: p_service,
            project_image:p_image,
            project_pagename: p_name.toString().toLowerCase().replace(/\s/g, '-'), //lowercase and no space will be helpful for URLs
            project_created_at: Date.now()
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



      projectSelected = (e) => {
        if(e.target.value !== "empty")
        {
          this.setState({_projectid: e.target.value})
          const s_ref = db.ref("/projects/"+e.target.value);
            s_ref.once("value", snapshot => {
                if (snapshot) {
                  this.setState({
                      p_name: snapshot.val()["project_name"], 
                      p_description: snapshot.val()["project_description"], 
                      p_image: snapshot.val()["project_image"],
                      p_service: snapshot.val()["project_service"]
                    })
                }
            })
        }
      }


      deleteProject = (id) => {
       
          
          if (window.confirm('Are you sure you want to delete?')) 
          {
              db.ref("/projects/").child(id).remove().then(function() {
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
                        <h2>Edit Project</h2>
                    </div>

                    <div className="col-12 my-5">
                    <div className="form-group">

                    <select className="form-control" id="p_projectid"
                      onChange={this.projectSelected} value={this.state.p_projectid}>
                      <option value="empty">SELECT A PROJECT</option>
                      {this.state.plist &&
                        Object.keys(this.state.plist.val()).map(id => {
                          let p = this.state.plist.val();
                          return (
                            <option value={id}>{p[id]["project_name"]}</option>
                          )
                        })
                      }
                    </select>
                    </div>


                    </div>

                    <div className="col-12">
                        <div className="form-group">
                            <input type="text" className="form-control" id="p_name" placeholder="Enter Service Name"
                            value={this.state.p_name} onChange={this.updateState} />
                            
                        </div>
                        <div className="form-group">
                            <textarea type="text" className="form-control" id="p_description" placeholder="Describe the Service" 
                            onChange={this.updateState} value={this.state.p_description}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="p_image" placeholder="paste the URL here" 
                             onChange={this.updateState} value={this.state.p_image}
                            />
                        </div>
                        <div className="form-group">
                          <select className="form-control" id="p_service"
                            onChange={this.updateState} value={this.state.p_service}>
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
                        
                        <button onClick={() => this.handleComplete(this.state.p_name,this.state.p_description,this.state.p_image,this.state.p_projectid, this.state.p_service )} className="btn btn-primary">Update Project</button>

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

                    <input type="checkbox" onChange={this.showallservices} checked={this.state.showallservices}/> SHOW ALL PROJECTS

                    <br/>
                        <div className="row">
                        {this.state.showallservices && 
                        
                            Object.keys(this.state.plist.val()).map(id => {
                              let p = this.state.plist.val();
                              return (
                                <div className="col-12 mb-3" style={{padding:'10px', border:'1px solid black'}}><span className="tex-left">{p[id]["project_name"]}</span> 
                                <span style={{float:'right'}}>
                                <button onClick={() => this.deleteProject(id)} className="btn btn-danger">Delete Project</button>
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

export default EditProject;