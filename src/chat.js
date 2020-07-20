
import React from "react";
import {socket} from "./socket";
import Messages from "./messages";
import cryptoRandomString from "crypto-random-string";
import axios from "./axios";
//import {useSelector} from "react-router";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChatDisplay: []
        };
        this.keyCheck = this.keyCheck.bind(this);
        this.addMessageToDisplay = this.addMessageToDisplay.bind(this);
        this.chatWindowRef = React.createRef();
        // Getting initial chat state from server
        axios.get("/getRecentChatMessages").then (result => {
            console.log(result.data.recentMessages);
            for (let index=0; index < result.data.recentMessages.length; index++) {
                this.addMessageToDisplay (result.data.recentMessages[index]);
            }
        });
        // Binding socket to chat update function
        socket.on('serverChatMessage',
            message => {
                console.log("Chat message received from server: ", message);
                this.addMessageToDisplay (message);
            }
        );

        // console.log (" -- userId is ", this.state.userId);
    }

    addMessageToDisplay(serverSideMessage){
        const chatWindowMaxLength = 10;
        // Adding new message to display
        let newDisplay = this.state.currentChatDisplay;
        newDisplay.push ({firstName: serverSideMessage.firstName,
            lastName: serverSideMessage.lastName,
            profilePic: serverSideMessage.profilePic,
            chatRowId: serverSideMessage.chatRowId,
            timeStamp: serverSideMessage.timeStamp,
            messageBody: serverSideMessage.messageBody});
        // Cropping display at a maximum message count
        if (newDisplay.length > chatWindowMaxLength) {
            newDisplay = newDisplay.slice(-chatWindowMaxLength);
        }
        // Setting state forcing re-render of modified display
        this.setState(
            { currentChatDisplay: newDisplay }
        );

    }

    componentDidMount() {
        console.log("Line 21");
        let clientHeight = this.chatWindowRef.current.clientHeight;
        let scrollHeight = this.chatWindowRef.current.scrollHeight;
        this.chatWindowRef.current.scrollTop = scrollHeight - clientHeight;
    }



    keyCheck (e) {
        if(e.key === "Enter") {
            e.preventDefault(); // preventing jumping to new line on enter
            socket.emit("clientChatMessage", e.target.value);
            e.target.value = "";
        }
    }

    render() {
        return(
            <div>
                <div className="chatMessagesContainer" ref={this.chatWindowRef}>
                    {this.state.currentChatDisplay.map(row=>{
                        return (<Messages firstName={row.firstName} lastName={row.lastName} profilePic={row.profilePic}
                            messageBody={row.messageBody}
                            key={row.chatRowId != null && row.chatRowId != 0? row.chatRowId : cryptoRandomString({length: 6})}/>);
                    })}
                    <p>Type something for your wonderful audience:</p>
                    <textarea placeholder="add your message" onKeyDown={this.keyCheck}></textarea>
                    <div className="chatDiv">
                        <div className="divSingleChat"></div>
                    </div>
                </div>
            </div>
        );
    }
}




/*CSS PART:

Make a chat container scrollable!
.chatMessagesCOntainer {
    height: 300px;
    width: 80%;
    overflow-y: scroll;
}
*/