import React from "react";
import axios from "./axios";


export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio : null,
            draftBio: null,
            textAreaVisible: false,
            savedBio: ""
        };
    }

    componentDidMount(){
        if(this.props.bio==null){
            this.setState({
                bio: null
            });
        } else {
            this.setState({
                bio: this.props.bio,
                draftBio: this.props.bio
            });
        }
    }

    toggleTextInputArea(e) {
        if (this.displayTextInputArea) {
            this.setState({
                displayTextInputArea: false
            });
        } else {
            this.setState({
                displayTextInputArea: true,
                draftBio: this.props.draftBio
            });
        }
    }

    setUsersBio() {
        const bio = this.state.draftBio;
        if (bio !="") {
            axios.post("bioediting", { bio:bio }).then((result)=>{
                if(result) {
                    this.setState({
                        bio: bio
                    });
                } else {
                    console.log("You f###ed up!");
                }
            }).catch((error)=>{
                console.log("Error in setUsersBio axios:", error);
            });
        }
    }

    clickToEdit() {
        this.setState({
            draftBio : this.props.bio
        });
    }



    handleChange(e) {
        this.setState({
            draftBio: e.target.value
        });
    }

    

    // making a separate function for rendering bio
    // that's going to be called on render
    // makes for more readable code

    renderBio() {
        const draftBio = this.state.draftBio;
        const bio = this.props.bio;

    }

    render() {
        if (this.props.bio && !this.state.displayTextInputArea) {
            console.log("Bio is onboard!!");
        }
        return(
            <div>
                {this.props.bio}
                <button onClick={()=> this.clickToEdit()}>Edit your bio</button>
            </div>
        );



    
    }




}