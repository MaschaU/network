import React from "react";
import axios from "./axios";

export default class Messages extends React.Component {
    constructor(props) {
        super(props);
        // console.log("OtherProfile ctor");
        this.state = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            profilePic: this.props.profilePic,
            message: this.props.messageBody
        };
    }

    render() {
        return(
            <div>
                <p className="chat-message"><span className="chat-message-sender">{this.state.firstName} {this.state.lastName}</span>: {this.state.message}</p>
            </div>
        );
    }
}