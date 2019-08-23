import React, { Component } from 'react';
import { Route, Redirect, Switch, Link } from "react-router-dom";
import './App.css';
import IndexPage from "./components/index";
import Services from "./components/services";
import NavBar from "./components/navbar";
import AddService from "./components/addservice";
import Footer from "./components/footer"
import WebImages from "./components/webimages";
import Service from "./components/service";
import Login from "./components/login";
import PrivateRoute from "./components/privateroute";
import Admin from "./components/admin";
import AddProject from "./components/addproject";
import EditService from "./components/editservice";
import Portfolio from "./components/portfolio";
import Contact from "./components/contact";
import { fbAuth } from "./firebase";
import { connect } from "react-redux";
import { UPDATE_USER, SIGN_OUT } from "./js/actions/index"


const mapStateToProps = state => {
  return state;
}

const mapDispatchToProps = dispatch => {
  return {
    UPDATE_USER: (user) => {
      dispatch(UPDATE_USER(user))
    },
    SIGN_OUT: () => {
      dispatch(SIGN_OUT())
    }
  };
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      authenticated: false,
      user: null
    }
  };

  componentWillMount() {
    fbAuth.onAuthStateChanged(user => {
      if (user) {
        this.props.UPDATE_USER(user);
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
      }
    });
  }

  handleSignOut = () => {
    fbAuth.signOut().then(() => {
      this.props.SIGN_OUT();
    }).catch(function (error) {
      // An error happened.
    });
  }

  render() {

    return (
      <div className="main-container">
        <NavBar />
        <main className="container home-content">
          <Switch>
            <Route path="/them-login" component={Login} />
            <Route path="/services/:servicename" component={Service} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/contact" component={Contact} />
            <Route exact path="/services" render={(props) => <Services {...props} isAuthed={this.state.currentUser} />} />
            <Route path="/index" component={IndexPage} />
            <PrivateRoute exact path="/addservice" component={AddService} authenticated={this.props.authenticated} />
            <PrivateRoute exact path="/addproject" component={AddProject} authenticated={this.props.authenticated} />
            <PrivateRoute exact path="/them-admin" component={Admin} authenticated={this.props.authenticated} />
            <PrivateRoute exact path="/editservice" component={EditService} authenticated={this.props.authenticated} />
            <Redirect from="/" exact to="/index" component={IndexPage} />
            <Route path="/webimages" component={WebImages} />
            <Redirect to="/not-found" />
          </Switch>
        </main>

        {this.props.authenticated &&
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6 mb-3">
                {this.props.currentUser} <Link className="btn btn-primary mx-4" to="/them-admin" >GO HOME</Link>
              </div>
              <div className="col-md-6 mb-3">
                <input type="button" className="btn btn-danger mx-4" value="SIGN OUT" onClick={() => this.handleSignOut()} />
              </div>
            </div>
          </div>
        }
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
