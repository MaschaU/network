import React from "react";
import axios from "./axios";
import {Link} from "react-router-dom";

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
        // console.log(this.state[e.target.name]);

    }

    handleSubmit(e) {
        if (this.state.password != this.state.repeatedPassword) {
            this.setState({
                error: "Nah, this will not work. Passwords need to match."
            });
        } else {
            const data = this.state;
            axios.post("/registeredUser", data).then(response => {
                // console.log("This is the response:",response);
                location.replace("/welcome#/login");
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
            <div className="divRegistrationAndLogo">
                <img src="./logo.png"></img>
                <div className="divForm">
                    <form className="divRegistrationForm" onSubmit={this.handleSubmit}>
                        <input type="text" name="firstName" onChange={this.handleChange} placeholder="First Name" />
                        <input type="text" name="lastName" onChange={this.handleChange} placeholder="Last Name" />
                        <input type="text" name="email" onChange={this.handleChange} placeholder="Email" />
                        <input type="text" name="password" onChange={this.handleChange} placeholder="Password" />
                        <input type="text" name="repeatedPassword" onChange={this.handleChange} placeholder="Re-type Password" />
                        <button className="glow-on-hover">Sign Up!</button>
                    </form>
                </div>
                
                <label>{this.state.error}</label>
                <Link to="/login">Already a member? Log in!</Link>
            </div>
        );
    }
}

//HOOKS//
/*import {useStatefulFields} from "./hooks/useStatefulFields";
import {useAuthSubmit} from "./hooks/useAuthSubmit";
export default function Registration(){
    const [values, handleChange ] = useStatefulFields();
    const [error, handleCLick] = useAuthSubmit("/registration", value);
    return(
        <div>
            {error && <p>Something broke!</p>}
            <input name="firstName" onChange={handleChange}/>
            <input name="lastName" onChange={handleChange}/>
            <input name="email" onChange={handleChange}/>
            <input name="password" onChange={handleChange}/>
            <button onCLick={handleClick}>Submit</button>
        
        </div>
    );
}*/