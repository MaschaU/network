// the first time the component mounts, make an ajax req to get three most recent users
// then, make an ajax req every time the user types
// render clickable profile pics, firstname and lastname
// query for users via pattern matching (we're not quering for the exact match)
// pattern matching to be accomplished via ILIKE (WHERE name ILIKE "$1%", [val +"%"])
import React, {useState, useEffect} from "react";
import axios from "./axios";
import {Link} from "react-router-dom";
import { render } from "react-dom";

export default function Findpeople(props){
    const [newestUser, setNewestUser] = useState([]);

    

    useEffect(()=>{
        console.log("The list of newest users rendering!");
        axios.get("/getNewestUser").then((result)=>{
            console.log("This is the last users who joined:", result.data);
            setNewestUser(result.data);
        });
    }, []);



    
    return(
        <div>
            <h1>{newestUser}</h1>
        </div>
    );

    



}