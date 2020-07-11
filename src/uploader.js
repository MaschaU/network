import React from "react";
import axios from "./axios";



export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            imageUrl: ""
        };
        
    }

    uploadProfilePic(e){
        // e.preventDefault(); 
        var formData = new FormData();
        formData.append("file", this.state.file);
        console.log("This is the form data:", formData);
        axios.post("uploadProfilePic", formData).then((result)=>{
            console.log("I'm in the uploadProfilePic axios and the result is:", result);
            console.log("Profile pic data is:", imageUrl);
            self.props.setProfilePic(result.data.imageUrl);
            self.props.toggleModdal();
        }).catch((error)=>{
            console.log("Failed monumentally!", error);
        });
    }

    render() {
        return(
            <div>
                <p className="closeModal" onClick={() => this.props.toggleUploader()}></p>
                <form>
                    <input type="file" name="file" accept="image/*"></input>
                </form>
                <button onClick={()=> this.uploadProfilePic()}>Submit</button>
            </div>
        );
    }
    
}
