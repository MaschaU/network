import React from "react";
import axios from "./axios.js"; // copy created in axios.js
import {Link} from "react-router-dom";

export default class Resetpassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            password: "",
            repeatedPassword: "",
            stage: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
        this.getStageHtml = this.getStageHtml.bind(this);
        this.handleSubmitCode = this.handleSubmitCode.bind(this);
        // console.log("This is this:", this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmitEmail(e) {
        e.preventDefault();
        const { email } = this.state;
        console.log("This is the email:", email);
        axios.post("/resetpassword/email", { email }).then(response => {
            // console.log("This is the response:", response);
            console.log("Is the response.data true?", response.data);
            if (response.data) {
                this.setState({
                    stage: 1
                });

            } else {
                this.setState({
                    error: "If you have entered the right email, you will find the instructions in your inbox"
                });
                this.setState({
                    email: ""
                });
            }
        }).catch(error=>{
            console.log("Error in axios POST req password:", error);
        });
    }

    /*handleSubmitCode(e) {
        e.preventDefault();
        if ()
    }*/

    getStageHtml() {
        // console.log(this.state.stage);
        console.log("This is second this:", this);
        if (this.state.stage == 0) {
            return(
                <div>
                    <p>Enter your email</p>
                    <input type="text" name="email" onChange={this.handleChange} placeholder="Email" />
                    <button onClick={this.handleSubmitEmail}>Submit!</button>
                </div>
            );
        } else if (this.state.stage == 1) {
            return(
                <div>
                    <p>The email should be in your inbox.</p>
                    <p>Type in the code we&apos;ve sent you, confirm your new password and you&apos;re good to go </p>
                    <input type="text" name="code" value={this.state.code} onChange={this.handleChange} placeholder="code" />
                    <input type="text" name="password" onChange={this.handleChange} placeholder="Password" />
                    <input type="text" name="repeatedPassword" onChange={this.handleChange} placeholder="Re-type your Password" />
                    <button onClick={this.handleSubmitCode}>Submit!</button>
                </div>
            );
        } else {
            return(
                <div>
                    <p>Congrats!</p>
                    <p>You Have successfully changed your password.</p>
                    <p>Have fun!</p>
                    <Link to="/login">Login</Link>
                </div>
            );
        }
        
    }
    
    render() {
        return (
            <div>
                {this.getStageHtml(this.state.stage)}
                <label>{this.state.error}</label>
                <Link to="/">Take me back to registration!</Link>
            </div>
        );
    }
}