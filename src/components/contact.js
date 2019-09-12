import React, { Component } from "react";

class Contact extends Component {

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <div className="row">
            <div className="col-12 mb-4">
              <h2 className="page-title">CONTACT</h2>
            </div>
            <div className="col-12">
              <p className="mb-4">We would love to hear from you! Whether your project is big or small,
              professional design advice will ensure you'll love your space for years to come.</p>
              <p><b>THEM STUDIOS</b><br /><a href="Tel: +917702277244444">Tel: +917702277244444</a>
                <br />
                <a href="mailto:maneesh@bythem.studio?subject=THEM ENQUIRY">maneesh@bythem.studio</a></p>
            </div>

            <div className="col-12">
              <Googlemap/>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
};

const { compose, withProps, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} = require("react-google-maps");
const demoFancyMapStyles = require("./googlemapstyle.json");

const Googlemap = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCy7GTXR3u5zjyD3wFPbN7YAMlIs3t82Gk&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 },
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    })
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={5}
    defaultCenter={props.center}
    defaultOptions={{ styles: demoFancyMapStyles, mapTypeControl: false }}
  >
  
  </GoogleMap>
);


export default Contact;