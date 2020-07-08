import React from "react";
import axios from "./axios.js"; // copy created in axios.js
import {Link} from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        // console.log("This state:", this.state[e.target.name]));
    }
    handleSubmit(e) {
        const data = this.state;
        axios.post("/userLogin", data).then(response=>{
            // console.log("The response is:", response);
            location.replace("/");
        }).catch(error=>{
            this.setState({
                error: error
            });
            this.setState({
                error: "You messed up something. Wanna give it another shot?"
            });
        });
        e.preventDefault();
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="email" onChange={this.handleChange} placeholder="Email" />
                    <input type="text" name="password" onChange={this.handleChange} placeholder="Password" />
                    <button>Login</button>
                </form>
                <label>{this.state.error}</label>
                <Link to="/resetpassword">Reset your password</Link>
            </div>
        );
    }
}