import React from "react";
import axios from "./axios";


export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio : "",
            draftBio: "",
            textAreaVisible: false
        };
    }

    componentDidMount(){
        if(this.props.bio==null){
            this.setState({
                bio: null
            });
        } else {
            this.setState({
                bio: this.props.bio,
                draftBio: this.props.bio
            });
        }
    }



    
}




/*this.state ={
    bioEditorIsVisible: true,
    // draftBio keeps track of whatever the user types 
    // on "save" we're making an axios POST request and sending draftBio (storing new bio to db and letting the app know what the final bio is)
    // the final bio will live in the App state
    // refer to imageboard project (image upload)
    // inside App create a method setBio that accepts an arg- newBio
    // pass the function to Profile and then Profile passes the info to the bioeditor
    draftBio: ""
};

if (this.state.bioEditorIsVisible) {
    return(
        <div>
            <h1>I'm a bio editor</h1>
            <textarea />
        </div>
    )
} else {
    // if bioEditorIsVisible is false- text area should be hidden
    // this check in here should determine what the text should say
    // if there is a bio, allow them to edit
    // if there is no bio, allow them toadd
    // whenever they click on either, show the text area
}

// this.prompt.setBio(newBio) (it will be called in profileeditor but it runs in App, needs to be binded)
// draftBio- captures anything that user types
// newBio- saved version of the bio*/