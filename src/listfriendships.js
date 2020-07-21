import React from "react";
import axios from "./axios";
import Displayonerelationship from "./displayonerelationship";

export default class Listfriendships extends React.Component {
    constructor(props) {
        super(props);
        // console.log("OtherProfile ctor");
        this.state = {
            firstName: "",
            lastName: "",
            profilePic: null,
            bio: "",
            userId: 0,
            list: []
        };

    }

    componentDidMount(){
        axios.get("/user").then((result)=>{
            console.log("User data: ", result.data);
            this.setState({userId: result.data.userId});
        });
        axios.get("/getListOfFriendships").then((result)=>{
            console.log("The result in listfriendships:", result.data);
            this.setState({list: result.data});
        });
    }

    render() {
        if (this.state.userId == 0){
            // we didn't initialize yet
            return "";
        }

        return(
            this.state.list.map((row) => {
                var otherUserId = row.receiverid;
                if (row.receiverid == this.state.userId){
                    otherUserId = row.senderid;
                }

                console.log("We are " + this.state.userId + " and they are " + otherUserId);
                
                return(
                    <Displayonerelationship key={otherUserId} userId={otherUserId } accepted={row.accepted} />
            
                );
            })
        );
    }
}