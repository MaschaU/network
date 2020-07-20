
import React from "react";
import {socket} from "./socket";
import Messages from "./messages";
import cryptoRandomString from "crypto-random-string";
//import {useSelector} from "react-router";

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChatDisplay: []
        };

        const chatWindowMaxLength = 10;

        this.keyCheck = this.keyCheck.bind(this);
        this.chatWindowRef = React.createRef();

        // Bind socket to chat update function

        socket.on('chatMessage',
            message => {

                // Add new message to display

                var newDisplay = this.state.currentChatDisplay;
                newDisplay.push ({messageBody: message});

                // Crop display at a maximum message count

                if (newDisplay.length > chatWindowMaxLength) {
                    newDisplay = newDisplay.slice(-chatWindowMaxLength);
                }

                // Set state forcing re-render of modified display

                this.setState(
                    { currentChatDisplay: newDisplay }
                );
            }
        );

        // console.log (" -- userId is ", this.state.userId);
    }

    componentDidMount() {
        console.log("Line 21");
        var clientHeight = this.chatWindowRef.current.clientHeight;
        var scrollHeight = this.chatWindowRef.current.scrollHeight;

        this.chatWindowRef.current.scrollTop = scrollHeight - clientHeight;
    }



    keyCheck (e) {
        if(e.key === "Enter") {
            e.preventDefault(); // preventing jumping to new line on enter
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    }

    render() {
        return(
            <div>
                <div className="chatMessagesContainer" ref={this.chatWindowRef}>
                    {this.state.currentChatDisplay.map(row=>{
                        return (<Messages messageBody={row.messageBody} key={cryptoRandomString({length: 6})}/>);
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

// onKeyDown- event listener
// keyCheck- a function that will run on event listener


/*CSS PART:

Make a chat container scrollable!
.chatMessagesCOntainer {
    height: 300px;
    width: 80%;
    overflow-y: scroll;
}
*/