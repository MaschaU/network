
import React, {useEffect, useRef} from "react";
import {socket} from "./socket";
//import {useSelector} from "react-router";

export default function Chat(){
    console.log("Line 7");
    const elemRef = useRef();
    // fetching messages from the global state, go redux!
    /*
    const chatMessages = useSelector((state)=>{
        console.log("Line 11");
        return state.chatMessages;
    });*/
    const chatMessages=[];
    // this will be undefined on first render (unless we hard code some messages)
    console.log("Line 14");

    // useEffect- equivalent to componentDidMount
    useEffect(()=>{
        console.log("Line 21");
        let clientHeight = elemRef.current.clientHeight;
        let scrollHeight = elemRef.current.scrollHeight;

        elemRef.current.scrollTop = scrollHeight - clientHeight;
        // run this function every time you get a new chat message
    }, [chatMessages]);

    const keyCheck = e =>{
        console.log("This is the value:", e.target.value);
        console.log("Key pressed is:", e.key);
        
        if(e.key === "Enter") {
            e.preventDefault(); // preventing jumping to new line on enter
            console.log("Our message:", e.target.value);
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    
    console.log("Line 42");
    return(
        <div>
            <p className="something">Chat away!</p>
            <div className="chatMessagesContainer" ref={elemRef}>
                <p>Chat messages will go here:</p>
                <textarea placeholder="add your message" onKeyDown={keyCheck}></textarea>
            </div>
        </div>
    );
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