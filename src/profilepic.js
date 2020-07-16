import React from "react";

// since it's only rendering an image, we are making it a function component

export default function Profilepic(props) {
    // console.log("Props in profile pic received from App:", props);
    if (!props.firstName){
        return(
            <div>
                <img className="imageOverflowed"></img>
                <img src={props.profilePic}/>
            </div>
        );
    } else {
        return(
            <div className="zoom">
                <img className="imageOverflowed"></img>
                <img className="usersProfilePic" src={props.profilePic}/>
                <button onClick={props.toggleModal}>Edit your profile picture</button>
            </div>
        );
    }
}








