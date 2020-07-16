import React from "react";
import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";
import axios from "./axios";


export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastNmae: "",
            profilePic: null,
            bio: "",
            userId: this.props.userId
        };
    }
    componentDidMount() {
        axios.get("/user").then((response)=>{
            console.log("This is the response:", response.data);
            if (!response.data.profilePic) {
                response.data.profilePic = "/logo.png";
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
            <div className="otherProfile">
                <h1>
                    {this.state.firstName} {this.state.lastName}
                </h1>
                   
                <Profilepic className="usersProfilePic"
                    toggleModal={this.state.toggleModal}
                    setImage={this.state.setImage}
                    profilePic={this.state.profilePic}
                />
                 
                    
                <Bioeditor bio={this.state.bio} draftBio={this.state.draftBio} />
            </div>
        );
    }
}




