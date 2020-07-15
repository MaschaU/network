// it is going to contain all the info about users
// we want to fatch all the info about the logged in user from the server
// we want to do it in the react component
// every component we want a user to see must be renderd through App
// we will get all the info about the user from the App component (via props)

import React from "react";
import axios from "./axios";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Profilepic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import Bioeditor from "./bioeditor";
import Otherprofile from "./otherprofile";




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
        const bio = this.state.bio;
        // console.log("render bio is ", bio);
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" render={()=>(
                            <Profile overrideProfilePic={this.state.profilePic}/>
                        )}
                        />
                        <Route path="/user/:id" component={Otherprofile}/>
                            
                    </div>   
                </BrowserRouter>
                <button onClick={this.toggleModal}>Set your photo</button>
                {this.state.uploaderVisible&&(
                    <Uploader setProfilePic={this.setProfilePic}
                        closeModal={this.closeModal}
                        toggleModal={this.toggleModal}/>
                )}
                <Bioeditor bio={bio} />
            </div>
        );
    }
}