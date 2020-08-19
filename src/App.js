import React, { Component } from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import "./App.css";
import IndexPage from "./components/index";
import Services from "./components/services";
import NavBar from "./components/navbar";
import AddService from "./components/addservice";
import Footer from "./components/footer";
import WebImages from "./components/webimages";
import Service from "./components/service";
import Login from "./components/login";
import PrivateRoute from "./components/privateroute";
import Admin from "./components/admin";
import AddProject from "./components/addproject";
import EditService from "./components/editservice";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import EditProject from "./components/editproject";
import Project from "./components/project";
import Emails from "./components/emails";
import EmailDetails from "./components/emaildetails";
import CreateReviewLinks from "./components/createReviewLink";
import FeedBacks from "./components/feedbacks";
import FeedBack from "./components/feedback";
import { fbAuth } from "./firebase";
import { connect } from "react-redux";
import { UPDATE_USER, SIGN_OUT } from "./js/actions/index";
import AddProjectImages from "./components/addprojectimages";
import Sitemap from "./components/sitemap";
import ScrollToTop from "./components/scrolltotop";
import PageContents from "./components/pagecontents";
import { Home, Mail, Power, User, Star } from "grommet-icons";
import {
  getUserDetails,
  getUserDetailsPending,
  getUserDetailsError,
} from "./js/reducers/handleuserReducer";
import About from "./components/about";
import fetchUserDetails from "./js/actioncreators/getUserDetails";
import Feedback from "./components/feedback";
import Feedbacks from "./components/feedbacks";

const mapStateToProps = (state) => ({
  userDetailsError: getUserDetailsError(state),
  userDetails: getUserDetails(state),
  userDetailsPending: getUserDetailsPending(state),
  useractivity: state.useractivity,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUserDetails: fetchUserDetails,
      UPDATE_USER: UPDATE_USER,
      SIGN_OUT: SIGN_OUT,
    },
    dispatch
  );

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null,
    };
  }

  componentDidMount() {
    fbAuth.onAuthStateChanged((user) => {
      if (user) {
        this.props.UPDATE_USER(user);
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false,
        });
      }
    });
  }

  handleSignOut = () => {
    fbAuth
      .signOut()
      .then(() => {
        this.props.SIGN_OUT();
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  render() {
    return (
      <div className="main-container">
        <NavBar />
        <main className=" home-content">
          <ScrollToTop />
          <Switch>
            <Route path="/them-login" component={Login} />
            <Route path="/about-them" component={About} />
            <Route path="/services/:servicename" component={Service} />
            <Route path="/project/:projectname" component={Project} />
            <Route path="services/project/:projectname" component={Project} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/contact" component={Contact} />
            <Route path="/feedback/:feedbackid" component={FeedBack} />
            <Route
              exact
              path="/services"
              render={(props) => (
                <Services {...props} isAuthed={this.state.currentUser} />
              )}
            />
            <Route path="/index" component={IndexPage} />
            <Route path="/sitemap" component={Sitemap} />
            <PrivateRoute
              exact
              path="/addservice"
              component={AddService}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/addprojectimages"
              component={AddProjectImages}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/addproject"
              component={AddProject}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/them-admin"
              component={Admin}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/editservice"
              component={EditService}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/emails"
              component={Emails}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/editproject"
              component={EditProject}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/pagecontents"
              component={PageContents}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/pagecontents/:contentid"
              component={PageContents}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/createreviewlinks"
              component={CreateReviewLinks}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/feedbacks"
              component={Feedbacks}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/feedbacks/:reviewid"
              component={Feedbacks}
              authenticated={this.props.useractivity.authenticated}
            />
            <PrivateRoute
              exact
              path="/email/:email"
              component={EmailDetails}
              authenticated={this.props.useractivity.authenticated}
            />
            <Redirect from="/" exact to="/index" component={IndexPage} />
            <Route path="/webimages" component={WebImages} />
            <Redirect to="/not-found" />
          </Switch>
        </main>

        {this.props.useractivity.authenticated && (
          <div className="container mt-5">
            <div className="d-flex flex-row">
              <div
                className="d-flex flex-column"
                style={{
                  padding: "25px",
                }}
              >
                <ul className="list-group list-group-horizontal-md">
                  <li className="list-group-item">
                    <Link to="/them-admin" className="align-self-center">
                      <User className="mr-3" color="black"></User>
                      {this.props.useractivity.currentUser}
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link className="align-self-center" to="/them-admin">
                      <Home className="mr-3" color="black"></Home>HOME
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link className="" to="/emails">
                      <Mail className="mr-3" color="black"></Mail>EMAILS
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link className="" to="/feedbacks">
                      <Star className="mr-3" color="gold"></Star>FeedBacks
                    </Link>
                  </li>
                  <li className="list-group-item bg-danger ">
                    <a
                      className="text-white"
                      onClick={() => this.handleSignOut()}
                    >
                      <Power className="mr-3" color="white"></Power>SIGN OUT
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
