import React from "react";
import axios from "./axios";



export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            profilePic: ""
        };
        this.onFileChange = this.onFileChange.bind(this);
        this.uploadProfilePic = this.uploadProfilePic.bind(this);
    }

    onFileChange(e) {
        this.setState({file: e.target.files[0]});
        // console.log("File selected");
    }

    uploadProfilePic(e){
        // e.preventDefault(); 
        // console.log("Profile picture uploader works. Woop! Woop!");
        var formData = new FormData();
        formData.append("file", this.state.file, this.state.file.name);
        // console.log("This is the form data:", formData);
        axios.post("upload", formData).then((result)=>{
            // console.log("I'm in the uploadProfilePic axios and the result is:", result);
            let profilePic = result.data.url;
            // console.log("Profile pic data is:", profilePic);
            this.props.setProfilePic(profilePic);
            this.props.toggleModal();
        }).catch((error)=>{
            console.log("Failed monumentally!", error);
        });
    }

    render() {
        return(
            <div>
                <p className="closeModal" onClick={() => this.props.toggleModal()}></p>
                <form>
                    <input type="file" name="file" accept="image/*"  onChange={this.onFileChange} ></input>
                </form>
                <button onClick={()=> this.uploadProfilePic()}>Submit</button>
            </div>
        );
    }
    
}
