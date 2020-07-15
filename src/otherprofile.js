import React from "react";
import axios from "./axios";
import Profile from "./profile";
import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";


export default class Otherprofile extends React.Component {
    constructor(props) {
        super(props);
        console.log("OtherProfile ctor");
        this.state = {
            firstName: "",
            lastName: "",
            profilePic: null,
            bio: "",
            userId: this.props.match.params.id
        };

        console.log (" -- userId is ", this.state.userId);
    }
    componentDidMount() {
        axios.post("/api-userinfo", {requestedUserId: this.state.userId}).then((response)=>{
            console.log("This is the OtherProfile componentDidMount response:", response.data);
            if (!response.data.profilePic) {
                response.data.profilePic = "/logo.jpg";
            }
            // Careful with this: every single property returned in response.data
            // will overwrite the corresponding property in the component state.
            // It will work now, but future addition of fields may overwrite
            // critical data and introduce hard-to-find bugs
            // COMMENTED OUT -- this.setState(response.data);

            this.setState({firstName: response.data.firstName});
            this.setState({lastName: response.data.lastName});
            this.setState({profilePic: response.data.profilePic});
            this.setState({bio: response.data.bio});
            // console.log(this.state);
        });
        console.log("This.state in get user:", this.state);
    }

    UNSAFE_componentWillReceiveProps(newProperties){
        // We can't receive this in the constructor, because the parent component
        // has not retrieved the data from the database yet. It will be passed to
        // componentWillReceiveProps in a later render, at which point we copy
        // it to our state on the first receive of valid data.
        console.log("Receiving new props");
        if (newProperties.overrideProfilePic != undefined && newProperties.overrideProfilePic != null && newProperties.overrideProfilePic.length > 0){
            // console.log(" -- setting new props, too");
            this.setState({profilePic: newProperties.overrideProfilePic});
        }
    }

    render() {
        return(
            <div>
                <h1>
                    {this.state.firstName} {this.state.lastName}
                </h1>
                <Profilepic
                    toggleModal={this.state.toggleModal}
                    setImage={this.state.setImage}
                    profilePic={this.state.profilePic}
                />
                <Bioeditor bio={this.state.bio} draftBio={this.state.draftBio} />
            </div>
        );
    }
}




