/*
import React, {useEffect, useRef} from "react";
import {socket} from "./socket";
import {useSelector} from "react-router";

export default function Chat(){
    const elemRef = useRef();
    // fetching messages from the global state, go redux!
    const chatMessages = useSelector(state => state && state.chatMessages);
    console.log("My last 10 chat messages:", state.chatMessages)
    // this will be undefined on first render (unless we hard code some messages)

    // useEffect- equivalent to componentDidMount
    useEffect(()=>{
        console.log("elementRef:", elemRef);
        console.log("scrollTop:", elemRef.current.scrollTop);
        console.log("clientHeight:", elemRef.current.clientHeight);
        console.log("scrollHeight:", elemRef.current.scrollHeight);

        elemRef.current.scrollTop = elemRef.current.scrollHeight - elemRef.current.clientHeight
        // run this function every time you get a new chat message
    }, []);

    const keyCheck = e =>{
        console.log("This is the value:", e.target.value);
        console.log("Key pressed is:", e.key);
        
        if(e.key === "Enter") {
            e.preventDefault(); // preventing jumping to new line on enter
            console.log("Our message:", e.targetr.value);
            socket.emit("My amazing chat message", e.target.value);
            e.target.value = "";
        }
    }
    return(
        <div>
            <p className="something">Welcome to chat</p>
            <div className="chatMessagesContainer" ref={elemRef}>
                <p>Chat messages will go here:</p>
                <textarea placeholder="add your message" onKeyDown={keyCheck}></textarea>
            </div>
        </div>
    )
}

onKeyDown- event listener
keyCheck- a function that will run on event listener


CSS PART:

Make a chat container scrollable!
.chatMessagesCOntainer {
    height: 300px;
    width: 80%;
    overflow-y: scroll;
}
*/