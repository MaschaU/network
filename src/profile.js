import React from "react";
import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";

export default function Profile(props) {
    console.log("props in Profile: ", props);
    return (
        <div>
            <h1>
                {props.firstName} {props.lastName}
            </h1>
            <Profilepic
                toggleModal={props.toggleModal}
                setImage={props.setImage}
                profilepic={props.profilepic}
            />
            <Bioeditor bio={props.bio} sampleBio={props.sampleBio} />
        </div>
    );
}