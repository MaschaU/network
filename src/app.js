// it is going to contain all the info about users
// we want to fatch all the info about the logged in user from the server
// we want to do it in the react component
// every component we want a user to see must be renderd through App
// we will get all the info about the user from the App component (via props)

import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false
        };
        this.toggleModal = this.toggleModal.bind(this); 
    }

    // lifecycle methods
    componentDidMount() { // runs automatically once the component loads
        // console.log("my component has mounted!");
        axios.get("/user").then(response=>{
            // nmake axios requestr to servet and get info aboput the user(firstName, lastName, profile pic)
            // store the response from the server in state
            // get to a point where you can log in this.state and see the users first, last name and profile pic
            // modify users table to include new column- profile pic
        });

    }

    // our click event function
    // it updates a state to "true"
    // toggleModal function needs to be binded because this in toggleModal is undefined
    toggleModal() {
        // console.log("I'm triggering my toggleModal!");
        this.setState({
            uploaderIsVisible: true,
        });


    }

    // we define a method for receiving a profile pic and putting it in the state
    // we then pass this function to Uploader
    setImage(newProfilePic) {
        this.setState({
            profilePic: newProfilePic
        });
    }

    render() {
        console.log("This state is:", this.state);
        return(
            <div>
                <h1>App</h1>
                <ProfilePic 
                    first={this.state.firstName} 
                    last={this.state.lastName}   
                    profilePic={this.state.profilePic}
                    toggleModal={this.toggleModal}
                />
                <p onClick={this.toggleModal}>click me to toggle the modal!</p>
                { this.state.uploaderIsVisible && <Uploader setImage={this.setImage}/> } 
            </div>
        );
    }
}

// if uploaderIsVisible is true &&- render Uploader