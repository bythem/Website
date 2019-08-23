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
          </div>
        </div>

      </React.Fragment>
    );
  }
};

export default Contact;