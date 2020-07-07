import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // when the user selects an image, store that image in state
    // reference the code from the imageboard project
    // react- get the file from the user and save it in state
    // we need to use the FormData
    // once the file is in FormData, we need to create a POST request to send it to server
    // the last step is to make the profile picture show on the screeen without the user refreshing the page
    // the complication- the profile picture is stored in the state of App but it's the Uploader who receives a new image
    
    demoMethodFOrClassDontUseThisForReal() {
        this.props.setImage("put the new profile pic url here!");
        // when Uploader calls this function, the function will run in App
    }

    render() {
        return <div>uploader</div>;
    }
}

// the server side of the uploader is the same as in the imageboard, incl. multer and s3