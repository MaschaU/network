import React from "react";
import axios from "./axios.js"; // copy created in axios.js
import {Link} from "react-router-dom";

/*export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            code: "",
            password: "",
            repeatedPassword: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmiEmail = this.handleSubmiEmail.bind(this);
        this.handleSubmitCode = this.handleSubmitCode.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }*/