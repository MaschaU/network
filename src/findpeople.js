// the first time the component mounts, make an ajax req to get three most recent users
// then, make an ajax req every time the user types
// render clickable profile pics, firstname and lastname
// query for users via pattern matching (we're not quering for the exact match)
// pattern matching to be accomplished via ILIKE (WHERE name ILIKE "$1%", [val +"%"])
import React, {useState, useEffect} from "react";
import axios from "./axios";

export default function Findpeople(props){
    const [newestUsers, setNewestUsers] = useState([]);
    const [namePattern, setNamePattern] = useState("");
    const [patternUsers, setPatternUsers] = useState([]);

    useEffect(()=>{
        // console.log("in UseEffect");
        let abort=false;
        axios.get("/newestUsers").then((result)=>{
            // console.log("Received db values");
            if(!abort){
                console.log("Newest Users is ", result.data);
                setNewestUsers(result.data);
                console.log("Set Newest Users");
            }
        }).catch((error)=>{
            console.log("Error in newestUsers:", error);
        });

        return (() => { abort = true; }); // Called on unload; prevents race conditions
    }, []);

    function onChangePatternInput(e) {
        let userInput = e.target.value;
        console.log("This is the user input:", userInput);
        if(userInput==""){
            setNamePattern("");
        } else {
            axios.post("/getMatchingUsers", {name: userInput}).then((result)=>{
                setNamePattern(userInput);
                setPatternUsers(result.data);
            }).catch((error)=>{
                console.log("Error in pattern", error);
            });
        }

    }

    if(namePattern.length <= 0){
        return(
            <div>
                {console.log("In Render: ", newestUsers)}
                {
                    newestUsers.map(user=>(
                        <div key={user.id}>
                            <p>{user.firstname} {user.lastname} <img src={user.profilePic}/></p>
                        </div>
                    ))
                }
                <input type="text" name="finder" placeholder="Find other users" onChange={onChangePatternInput} />
            </div>
            
        );
    } else {
        return(
            <div>
                {console.log("In Render2: ", patternUsers)}
                {
                    patternUsers.map(user=>(
                        <div key={user.id}>
                            <p>{user.firstname} {user.lastname} <img src={user.imageurl}/></p>
                        </div>
                    ))
                }
                <input type="text" name="finder" placeholder="Find other users" onChange={onChangePatternInput} />
            </div>
            
        );

    }
}