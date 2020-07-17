import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Friendships(props) {
    // to tell us if there is friend requests between two users
    const [friendshipState, setFriendshipState] = useState(null); 
    // to tell us the id of the user whose profile the logged in user is visiting
    const [displayedUserId, setDisplayedUserId] = useState(props.displayedUserId);
    // to tell us which button to display to the user
    const [buttonForm, setButtonForm] = useState(props.buttonForm);

    function handleClick(e){
        e.preventDefault();
        if(friendshipState==null) {
            axios.post(`/makeconnectionrequest:${displayedUserId}`).then((result)=>{
                setFriendshipState("Pending");
                setButtonForm("Cancel");
            }).catch((error)=>{
                console.log("Error in click handle:", error);
            });
        }
    }

    function getFrienshipstate(e) {
        axios.post(`/getfriendshipdata: ${displayedUserId}`).then((result)=>{
            if(result.data.friendshipState==null) {
                setButtonForm("Request Connection");
            }
        });
    }








    return(
        <button onClick={(e) => handleClick(e)}>{buttonForm}</button>
    );
}