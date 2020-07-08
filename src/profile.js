import React from "react";
import Profilepic from "profilepic";

export default function Profile(props) {
    console.log("Props in Profile:", props);
    return (
        <div>
            <h1>This is the Profile component</h1>
            <h2>My name is {props.first}</h2>

            <Profilepic 
                dill={this.props.dill} // because we're passing the info that lives only in props in profie
            />
        </div>
    );
}