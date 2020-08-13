import React, { Component } from "react";
import { db } from "../firebase";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount = () => {
    document.title = "THEM STUDIOS | Contact THEM";
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleComplete = (
    contact_first_name,
    contact_last_name,
    contact_email,
    contact_phone,
    contact_comments
  ) => {
    if (
      contact_first_name &&
      contact_last_name &&
      contact_email &&
      contact_phone &&
      contact_comments
    ) {
      const projectID = db.ref("/contactrequests").push();
      projectID.set(
        {
          contact_first_name: contact_first_name,
          contact_last_name: contact_last_name,
          contact_email: contact_email,
          contact_phone: contact_phone,
          contact_comments: contact_comments,
          contact_pagename: contact_first_name
            .toString()
            .toLowerCase()
            .replace(/\s/g, "-"), //lowercase and no space will be helpful for URLs
          contact_request_created_at: Date.now(),
        },
        function (error) {
          if (error) {
            alert(
              "Sorry for the trouble. Could not submit form please try later." +
                error
            );
          } else {
            alert("Request submitted successfully!!");
            window.location.reload();
          }
        }
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="page-content container">
          <div className="row">
            <div className="col-12 mb-4">
              <h2 className="page-title">CONTACT</h2>
            </div>
            <div className="col-12">
              <p className="mb-4">
                We would love to hear from you! Whether your project is big or
                small, professional design advice will ensure you'll love your
                space for years to come.
              </p>
              <p>
                <b>THEM STUDIOS</b>
                <br />
                <a href="Tel: +917702277247">Tel: +917702277247</a>
                <br />
                <a href="mailto:maneesh@bythem.studio?subject=THEM ENQUIRY">
                  maneesh@bythem.studio
                </a>
              </p>
            </div>
            <div className="col-12 mt-3">
              <h4 className="mb-2">How Can We Contact You?</h4>

              <div className="row">
                <div className="col-md-6 mb-2">
                  <input
                    name="first name"
                    type="text"
                    className="form-control"
                    id="contact_first_name"
                    placeholder="First Name"
                    value={this.state.contact_first_name}
                    onChange={this.updateState}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    name="last name"
                    type="text"
                    className="form-control"
                    id="contact_last_name"
                    placeholder="Last Name"
                    value={this.state.contact_last_name}
                    onChange={this.updateState}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    name="email"
                    type="text"
                    className="form-control"
                    id="contact_email"
                    placeholder="Email Address"
                    value={this.state.contact_email}
                    onChange={this.updateState}
                  />
                </div>
                <div className="col-md-6 mb-2">
                  <input
                    name="number"
                    type="text"
                    className="form-control"
                    id="contact_phone"
                    placeholder="Phone Number"
                    value={this.state.contact_phone}
                    onChange={this.updateState}
                    required
                  />
                </div>
              </div>
              <h4 className="mt-3 mb-2">How Can We Help You?</h4>
              <div className="row">
                <div className="col-12 mb-2">
                  <div className="form-group">
                    <textarea
                      name="additional information"
                      type="text"
                      className="form-control"
                      value={this.state.contact_comments}
                      id="contact_comments"
                      placeholder="Additional information"
                      onChange={this.updateState}
                    />
                  </div>
                </div>
                <div className="col-12 mb-3 text-center">
                  <button
                    onClick={() =>
                      this.handleComplete(
                        this.state.contact_first_name,
                        this.state.contact_last_name,
                        this.state.contact_email,
                        this.state.contact_phone,
                        this.state.contact_comments
                      )
                    }
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d952.0081888958348!2d78.54784052923138!3d17.362156779256775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb996b74434023%3A0x189bf477cc2594c5!2s11-13-981%2Croad%20no.1b%2C%20Rd%20Number%202%2C%20Green%20Hills%20Colony%2C%20Haripuri%20Colony%2C%20Vasavi%20Colony%2C%20L.%20B.%20Nagar%2C%20Hyderabad%2C%20Telangana%20500035%2C%20India!5e0!3m2!1sen!2sus!4v1569088708641!5m2!1sen!2sus"
                frameBorder="0"
                style={{ width: "100%", height: "400px" }}
                allowFullScreen={false}
              ></iframe>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const demoFancyMapStyles = require("./googlemapstyle.json");

const Googlemap = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCy7GTXR3u5zjyD3wFPbN7YAMlIs3t82Gk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    }
  ),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={19}
    defaultCenter={{ lat: 17.362209, lng: 78.548439 }}
    defaultOptions={{ styles: demoFancyMapStyles, mapTypeControl: false }}
  >
    <Marker position={{ lat: 17.362209, lng: 78.548439 }} />
  </GoogleMap>
));

export default Contact;
