import React from "react";
import axios from "./axios";


export default class Bioeditor extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            bio : this.props.bio,
            draftBio: null,
            textAreaVisible: false
        };
        console.log(this.props.bio);
        console.log(props);
        this.clickToEdit = this.clickToEdit.bind(this);
        this.setUsersBio = this.setUsersBio.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderBio = this.renderBio.bind(this);
    
    }

    componentDidMount(){
        console.log("componentmount props: ", this.props);
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

    UNSAFE_componentWillReceiveProps(newProperties){
        // We can't receive this in the constructor, because the parent component
        // has not retrieved the data from the database yet. It will be passed to
        // componentWillReceiveProps in a later render, at which point we copy
        // it to our state on the first receive of valid data.
        console.log("Receiving new props");
        if (this.state.bio == undefined || this.state.bio == null){
            if (newProperties.bio != undefined && newProperties.bio != null){
                console.log(" -- setting new props, too");
                this.setState({bio: newProperties.bio});
            }
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
        // console.log("clickToEdit is here!");
        this.setState({
            draftBio : this.state.bio
            
        });
        
        console.log("This is my this.state.bio:", this.props.bio);
    }

    handleChange(e) {
        this.setState({
            draftBio: e.target.value
        });
    }
    

    // making a separate function for rendering bio that's going to be called on render
    // makes for a more readable code

    renderBio() {
        // console.log("Render bio!!!");
        const draftBio = this.state.draftBio;
        console.log("This is my draftBio:", draftBio);
        console.log("Bio state is ", this.state.bio);
        const bio = this.state.bio;
        if (draftBio) {
            return(
                <div>
                    <textarea value={this.state.draftBio} onChange={this.handleChange}/>
                    <button onClick={this.clickToEdit}>Save</button>
                </div>
            );
        }

    }

    render() {
        if (this.props.bio && !this.state.displayTextInputArea) {
            console.log("Bio is onboard!!");
        }
        return(
            <div>
                {this.state.bio}
                <button onClick={()=> this.clickToEdit()}>Edit your bio</button>
                {this.renderBio()}
            </div>
        );



    
    }




}