import React, { Component } from "react";
import { db } from '../firebase';
import { History, Star, Money, Accessibility } from "grommet-icons";
import GalleryU from "./gallery";

class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ilist: false
    }
  }
  componentDidUpdate(prevProps) {
    // will be true
    const locationChanged =
      this.props.location !== prevProps.location;
      if(locationChanged)
      {
        let projectpagename = this.props.match.params.projectname;
        this.getTripDetailsByPageName(projectpagename);
      }
     
    // INCORRECT, will *always* be false because history is mutable.
    // const locationChanged =
    //   this.props.history.location !== prevProps.history.location;
  }

  componentDidMount = () => {
    let projectpagename = this.props.match.params.projectname;
    this.getProjectDetailsByPageName(projectpagename);
  }

  getImagesByProject = (projectid) => {
    let list, photosList = [];
    let tripsRef = db.ref("/projectimages");
    tripsRef.orderByChild("image_projectid").equalTo(projectid).once("value", snapshot => {
      if (snapshot.val()) {
        list = snapshot.val();
        Object.keys(list).map((id, index) => {
          photosList.push({ 'src': list[id]["image_projectimage"], 
          'caption':list[id]["image_caption"] });
        })
        this.setState({ photosList: photosList });
      } else {
        this.setState({ photosList: null })
      }
    })
  }

  getProjectDetailsByPageName = (pageName) => {
    //Search function firebase realtime database this way of getting data is efficient.
    let tripRef = db.ref("/projects");
    tripRef.orderByChild("project_pagename").equalTo(pageName).once("child_added", snapshot => {
      
      document.title = snapshot.val()["project_name"];
      this.setState({ projectDetails: snapshot.val() });
      this.getImagesByProject(snapshot.key);
    })
  }


  render() {
    return (
      <React.Fragment>
        <div className="">
          {this.state.projectDetails ?
            <div className="tripgroup-details">
             
              <div className="container">
              <div className="row">
                    <div className="col-12 mb-3">
                    <h2 className="sdetail-title">{this.state.projectDetails["project_name"]}</h2>
                    </div>
                    
                    <div className="col-12 text-justify">
                    <h5 className="sdetail-description">{this.state.projectDetails["project_description"]}</h5>
                    </div>
                  <div className="col-12 my-2">
                    {this.state.photosList ? (
                      <GalleryU images={this.state.photosList} />
                    ) : null}
                  </div>
                  
                </div>
              </div>
            </div>: null
          }
        </div>

      </React.Fragment>
    );
  }
};

export default Trip;