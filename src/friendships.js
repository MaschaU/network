import React, { useState, useEffect } from "react";
import axios from "./axios";


export default function Friendships(props) {
    // to tell us if there is friend requests between two users
    const [friendshipState, setFriendshipState] = useState("NullState"); 
    // to tell us the id of the user whose profile the logged in user is visiting
    const [displayedUserId, setDisplayedUserId] = useState(props.displayedUserId);
    // to tell us which button to display to the user
    const [buttonForm, setButtonForm] = useState(props.buttonForm);

    function handleClick(e){
        e.preventDefault();
        if(friendshipState=="NullState") {
            axios.post("/makeconnectionrequest", {displayedUserId: displayedUserId}).then((result)=>{
                setFriendshipState("Pending");
                setButtonForm("Connect");
            }).catch((error)=>{
                console.log("Error in click handle:", error);
            });
        } else if (friendshipState=="loggedInUserSendingRequest") {
            axios.post("/loggedInUserSendingRequest", {displayedUserId: displayedUserId}).then((result)=>{
                setFriendshipState("Pending");
                setButtonForm("Cancel");
            });
        } else if (friendshipState="otherUserSendingRequest") {
            axios.post("/otherUserSendingRequest", {displayedUserId: displayedUserId}).then((result)=>{
                setFriendshipState("Pending");
                setButtonForm("Accept");
            });
        } else if (friendshipState=="otherUserAcceptsRequest") {
            axios.post("/otherUserAcceptsRequest", {displayedUserId: displayedUserId}).then((result)=>{
                setFriendshipState("Connected");
                setButtonForm("Connected");
            });
        } else if (friendshipState=="loggedInUserAccepts") {
            axios.post("/loggedInUserAccepts", {displayedUserId: displayedUserId}).then((result)=>{
                setFriendshipState("Connected");
                setButtonForm("Connected");
            });
        } else (friendshipState=="notFriendsAndNoRequestsPending") {
            axios.post("/notFriendsAndNoRequestsPending", {displayedUserId: displayedUserId}).then((result)=>{
                setFriendshipState("Connect");
                setButtonForm("Connect");
            });
        }
    }

    function getFriendshipstate(e) {
        axios.post("/getfriendshipstate", {displayedUserId: displayedUserId}).then((result)=>{
            if(result.data.friendshipState=="NullState") {
                setButtonForm("Connect");
            }
        });
    }

    useEffect(()=>{
        getFriendshipstate();
        console.log("This is the result of getting friendship state:");
    }, []);








    return(
        <button onClick={(e) => handleClick(e)}>{buttonForm}</button>
    );
}