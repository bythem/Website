import React, {Component}  from "react";
import {db, fbStorage} from '../firebase';

class Service extends Component {
  
    constructor(props) {
        super(props);
        
        this.state = {
           images: ''
        }
      // this.getServiceDetailsByPageName = this.getServiceDetailsByPageName.bind(this);
     };
  
    componentDidMount = () => {
       let servicename = this.props.match.params.servicename;
       this.getServiceDetailsByPageName(servicename);
    }

    getServiceDetailsByPageName = servicename => {
     
        let serviceRef = db.ref("/services");
        serviceRef.orderByChild("service_pagename").equalTo(servicename).once("child_added", snapshot => {
         
          document.title = snapshot.val()["service_name"];
          this.setState({ servicedetails: snapshot.val() });
          
        })


        

    }
    

  render() {
    return (
    <React.Fragment>
            <div className="container page-content">
                
                {this.state.servicedetails ? 
                <div className="row">
                    <div className="col-12 mb-3">
                    <h2 className="sdetail-title">{this.state.servicedetails["service_name"]}</h2>
                    </div>
                    
                    <div className="col-12 text-justify">
                    <h5 className="sdetail-description">{this.state.servicedetails["service_description"]}</h5>
                    </div>

                </div> : null

                }
            </div>

      </React.Fragment>
    );
  }
};

export default Service;