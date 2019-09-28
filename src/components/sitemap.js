import React, { Component } from "react";
import { db } from '../firebase';
import { Link } from "react-router-dom";
import { FacebookOption, Instagram, Phone } from "grommet-icons";


class Sitemap extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: ''
        }
      };

    componentDidMount = () => {
        /** BIND SERVICES DROPDOWN WITH AVAILABLE SERVICE */
        const s_ref = db.ref("/services");
        s_ref.once("value", snapshot => {
          if (snapshot) {
            this.setState({ slist: snapshot })
          }
        })


        const p_ref = db.ref("/projects");
        p_ref.once("value", snapshot => {
          if (snapshot) {
            this.setState({ plist: snapshot })
          }
        })
      }


    


    render() {
        return (
            <React.Fragment>
                <div className="mt-5">
                    <div className="container">
                        <div className="row ">
                            <div className="col-12">
                                <Link to="/" className="no-text-decoration footer-text "> <h5 className="text-dark">THEM STUDIOS</h5></Link>
                            </div>
                            <div className="col-12 d-flex flex-column">

                                <Link to="/services" className="mt-2">Services</Link>
                                <Link to="/portfolio" className="mt-2">Portfolio</Link>
                                <Link to="/portfolio" className="mt-2">Contact</Link>
                            </div>
                            <div className="col-12 mt-5">
                                <Link to="/services" className="no-text-decoration footer-text "> <h5 className="text-dark">SERVICES</h5></Link>
                            </div>
                            <div className="col-12 d-flex flex-column">
                            {this.state.slist &&
                                Object.keys(this.state.slist.val()).map(id => {
                                    let s = this.state.slist.val();
                                return (
                                    <Link className="mt-2" to={{ pathname: `services/${s[id]["service_pagename"]}`, serviceid: `${id}` }}>{s[id]["service_name"]}</Link>


                                )})
                                }
                                
                            </div>
                            <div className="col-12 mt-5">
                                <Link to="/portfolio" className="no-text-decoration footer-text "> <h5 className="text-dark">PORTFOLIO</h5></Link>
                            </div>
                            <div className="col-12 d-flex flex-column">
                            {this.state.plist &&
                                Object.keys(this.state.plist.val()).map(id => {
                                    let p = this.state.plist.val();
                                return (
                                    <Link className="mt-2" to={{ pathname: `projects/${p[id]["project_pagename"]}`, projectid: `${id}` }}>{p[id]["project_name"]}</Link>


                                )})
                                }
                                
                            </div>
                            


                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default Sitemap;