import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatedPassword: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state[e.target.name]);

    }

    handleSubmit(e) {
        if (this.state.password != this.state.repeatedPassword) {
            this.setState({
                error: "Nah, this will not work. Passwords need to match."
            });
        } else {
            const data = this.state;
            axios.post("/registeredUser", data).then(response => {
                console.log("This is the response:",response);
                location.replace("/");
            }).catch(err => {
                this.setState({
                    error: err
                });
            });
        }
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="registration-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="firstName" onChange={this.handleChange} placeholder="First Name" />
                    <input type="text" name="lastName" onChange={this.handleChange} placeholder="Last Name" />
                    <input type="text" name="email" onChange={this.handleChange} placeholder="Email" />
                    <input type="text" name="password" onChange={this.handleChange} placeholder="Password" />
                    <input type="text" name="repeatedPassword" onChange={this.handleChange} placeholder="Re-type Password" />
                    <button>Sign Up!</button>
                </form>
                <span>{this.state.error}</span>
                <a href="#">Already a user? Sign in</a>
            </div>
        );
    }
}