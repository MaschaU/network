/*import React from "react";

// since it's only rendering an image, we are making it a function component

export default function ProfilePic(props) {
    // an object containing all the info being passed from the app
    // only after receiving this info can we move to rendering the info
    // first time registered users will have their profilePic undefined
    // if the user does not have an profile pic, render the defult one and give them an option of upload
    console.log("Props in profilePic received from App:", props);
    console.log("The toggleModal function is here:", props);
    return(
        // once we have an image, we should do the onClick on it instead
        <div>
            <p onClick={props.toggleModal}>First name, Last name</p>
            <img />
        </div>
    );
}
// left side- name of the variable we're passing to profilePic
// right side- a variable that evaluates to something (a variable that we can put into console.log)
// because axios is async, we are going to see two console.logs. The first one is going to be undefined*/