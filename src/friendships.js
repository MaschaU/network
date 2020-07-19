import React, { useState, useEffect } from "react";
import axios from "./axios";


export default function Friendships(props) {
    // to tell us if there is friend requests between two users
    const [friendshipState, setFriendshipState] = useState("NullState"); 
    // to tell us the id of the user whose profile the logged in user is visiting
    const [displayedUserId, setDisplayedUserId] = useState(props.displayedUserId);
    // to tell us which button to display to the user
    const [buttonForm, setButtonForm] = useState("");

    function handleClick(e){
        e.preventDefault();
        if(friendshipState=="NullState") {
            axios.post("/makeconnectionrequest", {secondUserId: displayedUserId}).then((result)=>{
                console.log("Result of connection request:", result);
                setFriendshipState("Pending");
                setButtonForm("Connect");
            }).catch((error)=>{
                console.log("Error in click handle:", error);
            });
        } else if (friendshipState=="loggedInUserSendingRequest") {
            axios.post("/cancelFriendship", {secondUserId: displayedUserId}).then((result)=>{
                setFriendshipState("loggedInUserSendingRequest");
                setButtonForm("Cancel");
            });
        } else if (friendshipState=="otherUserSendingRequest") {
            axios.post("/loggedInUserAccepts", {secondUserId: displayedUserId}).then((result)=>{
                setFriendshipState("friends");
                setButtonForm("Disconnect");
            });
        } else if (friendshipState=="friends") {
            axios.post("/cancelFriendship", {secondUserId: displayedUserId}).then((result)=>{
                setFriendshipState("NullState");
                setButtonForm("Connect");
            });
            // make server call that cancels friendship
            // note that we don't know who was the sender and receiver, so delete both cases
        }
        //props.rerender();
    }

    function getFriendshipstate(e) {
        axios.post("/getfriendshipstate", {displayedUserId: displayedUserId}).then((result)=>{
            setFriendshipState(result.data.friendshipState);
            if(result.data.friendshipState=="NullState") {
                setButtonForm("Connect");
            }
            else if (result.data.friendshipState=="loggedInUserSendingRequest") {
                setButtonForm("Cancel");
            } else if (result.data.friendshipState=="otherUserSendingRequest") {
                setButtonForm("Accept");
            } else if (result.data.friendshipState=="friends") {
                setButtonForm("Disconnect");
            }
        });
    }

    useEffect(()=>{
        console.log("useEffect is running");
        getFriendshipstate();
        console.log("This is the result of getting friendship state:");
    }, [buttonForm]);








    return(
        <button onClick={(e) => handleClick(e)}>{buttonForm}</button>
    );
}