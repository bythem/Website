import React, { Component } from "react";
import { db, fbStorage } from "../firebase";

class PageContent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    // this.getServiceDetailsByPageName = this.getServiceDetailsByPageName.bind(this);
  }

  componentDidMount = () => {
    this.getContent(this.props.pagecontentid);
  };

  getContent = (pagecontentid) => {
    let contentref = db.ref("/pagecontent/" + pagecontentid);
    contentref.once("value", (snapshot) => {
      if (snapshot.val()) {
        if (snapshot.val().content_active === "true") {
          this.setState({ data: snapshot.val() });
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.data ? (
          <>
            <h3 className="homepage-about-title mb-4">
              {this.state.data.content_title}
            </h3>

            <p
              className="text-left"
              dangerouslySetInnerHTML={{
                __html: this.state.data.content_description,
              }}
            ></p>
          </>
        ) : null}
      </React.Fragment>
    );
  }
}

export default PageContent;
