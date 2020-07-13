import React, {useState} from "react";
import axios from "./axios";

export function useAuthSubmit(url, values) {
    const [error, setError] = useState(false);
    const handleCLick = () =>{
        axios.post("/registration", values).then(({data})=>{
            if(data.success) {
                location.replace("/");
            } else {
                setError(true);
            }
        }).catch(error=>{
            console.log("Landed in an error catch:", error);
            setError(true);
        });
    };

    return [error, handleCLick];
}