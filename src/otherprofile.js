import React from "react";
import axios from "axios";
import {BrowserRouter, Route} from "react-router-dom";
import Profile from "./profile";

export default class Otherprofile extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id: "",
            firstName: "",
            lastName:"",
            profilePic: null,
            bio: null
        };
    }
    componentDidMount(){
        console.log("Otherprofile in da house!");

    }

}