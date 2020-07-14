import React from "react";
import Profilepic from "./profilepic";
import Bioeditor from "./bioeditor";
import axios from "./axios";


export default class App extends React.Component {
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




