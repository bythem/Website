import React, { Component } from "react";
import { fbStorage } from "../firebase";
import Pagination from "./pagination";

class WebImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: "",
      pageStart: 0,
      pageEnd: 8,
    };
    this.updateState = this.updateState.bind(this);
  }
  updateState(e) {
    this.setState({
      s_name: this.refs.s_name.value,
      s_description: this.refs.s_description.value,
    });
  }

  componentDidMount = () => {
    let temp = [];
    let tempLocation = [];
    fbStorage
      .ref("images")
      .listAll()
      .then((res) => {
        res.items.map((images) => {
          images.getDownloadURL().then((url) => {
            tempLocation[tempLocation.length] = images.location.path_;
            temp[temp.length] = url;
            let pageCount = Math.ceil(temp.length / 8);
            this.setState({
              images: temp,
              imageLocation: tempLocation,
              pageCount: pageCount,
            });
          });
        });
      });
  };

  deleteImage = (key) => {
    let imageL = this.state.imageLocation;
    if (window.confirm("Are you sure you want to delete?")) {
      fbStorage
        .ref()
        .child(imageL[key])
        .delete()
        .then(function () {
          // File deleted successfully
          alert("successfully deleted !!");
          window.location.reload();
        })
        .catch(function (error) {
          // Uh-oh, an error occurred!
          alert(error.message);
        });
    }
  };

  handleNextClick = () => {
    this.setState({
      pageStart: parseInt(this.state.pageStart) + 6,
      pageEnd: parseInt(this.state.pageEnd) + 6,
    });
  };
  handlePreviousClick = () => {
    if (parseInt(this.state.pageStart) - 6 > 0) {
      this.setState({
        pageStart: parseInt(this.state.pageStart) - 6,
        pageEnd: parseInt(this.state.pageEnd) - 6,
      });
    } else {
      this.setState({
        pageStart: 0,
        pageEnd: 6,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="row images-div">
            {this.state.images
              ? this.state.images
                  .slice(this.state.pageStart, this.state.pageEnd)
                  .map((url, key) => {
                    return (
                      <div className="col-6 mb-2" key={key}>
                        <div
                          className=""
                          style={{
                            backgroundImage: `url(${url})`,
                            height: "400px",
                            backgroundSize: "cover",
                          }}
                        >
                          <a
                            href={url}
                            className="btn btn-primary"
                            target="_blank"
                          >
                            {" "}
                            VIEW IMAGE
                          </a>
                          <button
                            className="btn btn-danger mt-2"
                            onClick={() => {
                              this.deleteImage(key);
                            }}
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    );
                  })
              : null}

            <Pagination
              handleNextClick={() => this.handleNextClick()}
              handlePreviousClick={() => this.handlePreviousClick()}
            ></Pagination>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default WebImages;
