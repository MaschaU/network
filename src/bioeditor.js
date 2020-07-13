import React from "react";
import axios from "./axios";


export default class Bioeditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bio : null,
            draftBio: null,
            textAreaVisible: false
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

    displayTextInputArea(e) {
        if (this.displayTextInputArea) {
            this.setState({
                displayTextInputArea: false
            });
        } else {
            this.setState({
                displayTextInputArea: true,
                draftBio: this.props.bio
            });
        }
    }

    handleChange(e) {
        this.setState({
            draftBio: e.target.value
        });
    }

    render() {
        if (this.props.bio && !this.state.displayTextInputArea) {
            console.log("Bio is onboard!!");
        }
        return(
            <h1>Something, something</h1>
        );



    
    }




}