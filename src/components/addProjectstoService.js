import React, { Component } from "react";
import { db, fbStorage } from "../firebase";
import Select from "react-select";
import { Close } from "grommet-icons";

class AddProjectsToService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
    };
  }

  componentDidMount = () => {
    let serviceId = this.props.serviceId;
    this.setState({
      serviceDetails: this.props.serviceDetails,
    });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.props.serviceDetails !== nextProps.serviceDetails) {
      this.filterProjects(nextProps.serviceDetails, nextProps.serviceId);
      return true;
    }
    return false;
  };

  updateProjects = () => {
    let newProjectsList = [];
    if (this.state.selected.length > 0) {
      this.state.selected.map((res) => {
        return newProjectsList.push(res.value);
      });
    }
    this.state.newProjectsList.map((res) => {
      return newProjectsList.push(res.value);
    });

    if (newProjectsList.length > 0) {
      db.ref("/services/" + this.state.serviceId)
        .child("service_projects")
        .set(newProjectsList);
      db.ref("/services/" + this.state.serviceId).once("value", (snapshot) => {
        if (snapshot.val()) {
          this.filterProjects(snapshot.val(), this.state.serviceId);
        }
      });
    }
    this.setState({ newProjectsList: null });
  };

  filterProjects = (serviceDetails, serviceId) => {
    const p_ref = db.ref("/projects");
    p_ref.once("value", (snapshot) => {
      if (snapshot.val()) {
        let projects = [],
          selected = [];
        Object.keys(snapshot.val()).map((id) => {
          if (serviceDetails.service_projects) {
            serviceDetails.service_projects.indexOf(id) >= 0
              ? selected.push({
                  label: snapshot.val()[id]["project_name"],
                  value: id,
                })
              : projects.push({
                  label: snapshot.val()[id]["project_name"],
                  value: id,
                });
          } else {
            projects.push({
              label: snapshot.val()[id]["project_name"],
              value: id,
            });
          }
        });
        this.setState({
          projects: projects,
          selected: selected,
          selectedProjects: serviceDetails.service_projects,
          serviceId: serviceId,
        });
        this.forceUpdate();
      }
    });
  };

  updateState = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  deleteProject = (projectid) => {
    let selected = this.state.selectedProjects;
    let serviceId = this.state.serviceId;
    let index = selected.indexOf(projectid);
    if (selected.indexOf(projectid) >= 0) {
      selected.splice(index, 1);
      db.ref("/services/" + this.state.serviceId)
        .child("service_projects")
        .set(selected);

      db.ref("/services/" + serviceId).once("value", (snapshot) => {
        if (snapshot.val()) {
          this.filterProjects(snapshot.val(), serviceId);
        }
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="container page-content">
          <div className="row">
            <div className="col-12 mb-3">
              <h2>Add Projects to Service</h2>

              {this.state.selected ? (
                <div className="d-flex flex-row mb-3">
                  <p className="mr-2">Selected Projects:</p>
                  {this.state.selected.map((res, id) => {
                    return (
                      <div key={id} className="mx-2">
                        <span
                          className="badge badge-pill badge-dark badge-tags"
                          onClick={() => {
                            this.deleteProject(res.value);
                          }}
                        >
                          {res.label}
                          <Close
                            className="social-icon ml-2"
                            color="white"
                          ></Close>
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <Select
                onChange={(opt) => {
                  this.setState({ newProjectsList: opt });
                }}
                options={this.state.projects}
                isMulti
              ></Select>
            </div>

            <div className="col-12">
              <button
                onClick={() => this.updateProjects()}
                className="btn btn-primary"
              >
                Add Projects
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddProjectsToService;
