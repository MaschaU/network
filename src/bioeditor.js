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
        this.handleChange = this.handleChange.bind(this);
        this.renderBio = this.renderBio.bind(this);
        this.clickToSave = this.clickToSave.bind(this);
        this.setBio = this.setBio.bind(this);
    
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
        console.log("Receiving new props: bio is", newProperties.bio);
        if (this.state.bio == undefined || this.state.bio == null || this.state.bio.length < 1){
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

    clickToEdit() {
        // console.log("clickToEdit is here!");
        this.setState({
            draftBio : this.state.bio,
            textAreaVisible: true
        });
        // console.log("This CLICKTOEDIT is my this.state.bio:", this.props.bio);
    }

    clickToSave() {
        this.setState({
            bio: this.state.draftBio,
            textAreaVisible: false
        });
        this.setBio();
    }

    setBio() {
        // console.log("newBio in da house");
        axios.post("/setBio", {bio: this.state.draftBio}).then((result)=>{
            this.setState({
                bio: this.state.draftBio
            });
        }).catch((error)=>{
            console.log("Error in setting the bio:", error);
        });
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
        // console.log("This is my draftBio:", draftBio);
        // console.log("Bio state is ", this.state.bio);
        const bio = this.state.bio;
        console.log ("Rendering: bio is", bio);
        if (this.state.textAreaVisible) {
            return(
                <div>
                    <textarea value={this.state.draftBio} onChange={this.handleChange}/>
                    <button onClick={this.clickToSave}>Save</button>
                    <button>Cancel</button>
                </div>
            );
        } else {
            if(bio != null && bio.length>0){
                return(
                    <div>
                        <p className='anzColor'>{bio}</p>
                        <button className="glow-on-hover" onClick={this.clickToEdit}>Edit bio</button>
                    </div>
                        
                );
            }
            else {
                return(
                    <button className="glow-on-hover"  onClick={this.clickToEdit}>Add bio</button>
                );
            }
        }

    }

    render() {
        if (this.props.bio && !this.state.displayTextInputArea) {
            // console.log("Bio is onboard!!");
        }
        return(
            <div>
                {this.renderBio()}
            </div>
        );
    }
}