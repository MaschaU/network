// it is going to contain all the info about users
// we want to fatch all the info about the logged in user from the server
// we want to do it in the react component
// every component we want a user to see must be renderd through App
// we will get all the info about the user from the App component (via props)

import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link, HashRouter } from "react-router-dom";
import Profilepic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";




export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            profilePic: null,
            bio: null,
            uploaderVisible: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.setProfilePic = this.setProfilePic.bind(this);
        this.closeModal = this.closeModal.bind(this);
    
    }

    // lifecycle methods
    componentDidMount() {
        axios.get("/user").then((response)=>{
            // console.log("This is the response:", response.data);
            if (!response.data.profilePic) {
                response.data.profilePic = "/logo.jpg";
            }
            // Careful with this: every single property returned in response.data
            // will overwrite the corresponding property in the component state.
            // It will work now, but future addition of fields may overwrite
            // critical data and introduce hard-to-find bugs
            // COMMENTED OUT -- this.setState(response.data);

            this.setState({firstName: response.data.firstName});
            this.setState({lastName: response.data.lastName});
            this.setState({profilePic: response.data.profilePic});
            this.setState({bio: response.data.bio});
            // console.log(this.state);
        });
        console.log("This.state in get user:", this.state);
    }

    toggleModal() {
        // console.log("toggleModal works");
        if (this.state.uploaderVisible) {
            this.setState({
                uploaderVisible: false,
            });
        } else {
            this.setState({
                uploaderVisible: true,
            });
        }
    }

    setProfilePic(newProfilePic) {
        // console.log("setProfilePic works");
        this.setState({
            profilePic: newProfilePic,
        });
    }

    closeModal(){
        this.setState({
            uploaderVisible: false
        });
    }

    render() {
        return(
            <div>
                <button onClick={this.toggleModal}>Upload</button>
                {this.state.uploaderVisible&&(
                    <Uploader setProfilePic={this.setProfilePic}
                        closeModal={this.closeModal}
                        toggleModal={this.toggleModal}/>
                )}
                <div className="divUploader">
                    {this.state.firstName}
                    {this.state.lastName}
                    <img src={this.state.profilePic}/>
                    {this.state.bio}
                </div>
                
            </div>
        );
    }

  

}