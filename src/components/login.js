import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { fbAuth } from '../firebase';
import { connect } from "react-redux";


const mapStateToProps = state => {
    return state;
}

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: ''
        }
        this.updateState = this.updateState.bind(this);
    };
    updateState(e) {
        this.setState({ email: this.refs.email.value, password: this.refs.password.value });
    }

    handleSubmit = async (email, password) => {
        fbAuth.signInWithEmailAndPassword(email, password).then(() => {
            this.props.history.push("/");
        }).catch(function (error) {
            // Handle Errors here.
            alert("Unable to sign in " + error.message);
            // ...
        });
    }


    render() {
        if (this.props.authenticated) {
            return <Redirect to="/them-admin" />
        }
        else {
            return (
                <React.Fragment>
                    <div className="container page-content">
                        <div className="row">
                            <div className="col-12">
                                <h2>Please login</h2>
                            </div>
                            <div className="col-12">
                                <div className="form-group">
                                    <input type="email" className="form-control" id="user_name" placeholder="User Name" ref="email"
                                        onChange={this.updateState.bind(this)} />

                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" id="user_password" placeholder="Password" ref="password"
                                        onChange={this.updateState.bind(this)} />
                                </div>

                                <button onClick={() => this.handleSubmit(this.state.email, this.state.password)} className="btn btn-primary">Submit</button>

                            </div>
                        </div>
                    </div>

                </React.Fragment>
            )
        }
    }
};

export default connect(mapStateToProps, null)(Login);