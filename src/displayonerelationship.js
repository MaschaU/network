import React from "react";
import axios from "./axios";

export default class Displayonerelationship extends React.Component {
    constructor(props) {
        console.log("In DOR ctor");
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            profilePic: null,
            userId: this.props.userId,
            accepted: this.props.accepted,
            visible: true
        };
        console.log("In DOR ctor");
        this.handleClickTerminate = this.handleClickTerminate.bind(this);
        this.handleClickAccept = this.handleClickAccept.bind(this);
    }

    componentDidMount(){
        console.log("DOR's userId: ", this.state.userId);
        axios.post("/api-userinfo", {requestedUserId: this.state.userId}).then((response)=>{
            console.log("This is the DOR componentDidMount response:", response.data);
            if (!response.data.profilePic) {
                response.data.profilePic = "/logo.jpg";
            }
            this.setState({firstName: response.data.firstName});
            this.setState({lastName: response.data.lastName});
            this.setState({profilePic: response.data.profilePic});
            this.setState({bio: response.data.bio});
            // console.log(this.state);
        });
    }

    handleClickTerminate(e) {
        axios.post("/cancelFriendship", {secondUserId: this.state.userId}).then((result)=>{
            this.setState({visible: false});
        }).catch((error)=>{
            console.log("Error in clients cancleRequest:", error);
        });
    }

    handleClickAccept(e) {
        console.log("HandleClickAccept begin");
        axios.post("/loggedInUserAccepts", {secondUserId: this.state.userId}).then((result)=>{
            console.log("HandleClickAccept setting state");
            this.setState({accepted: true});
        }).catch((error)=>{
            console.log("Error in clients loggedInUserAccepts:", error);
        });
    }

    


    render(){
        // If the connection was terminated, simply remove ourselves from list
        if (!this.state.visible) {
            return(""); // return empty
        }

        return(
            <div>
                <p>{this.state.firstName}</p>
                <p>{this.state.lastName}</p>
                <img src={this.state.profilePic}/>
                {console.log("This is this.state.accepted:", this.state.accepted)};
                <div className="connections-div">
                    {this.state.accepted? 
                        <button className="glow-on-hover" onClick={(e) => this.handleClickTerminate(e)}>Disconnect</button> :
                        <button className="glow-on-hover" onClick={(e) => this.handleClickAccept(e)}>Accept</button>
                    }
                </div>
                <p></p>
 
            </div>
        );

    }

}