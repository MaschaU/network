// hooks/useStatefulFields //
import React, {useState} from "react";

export function useStatefulFields() {
    // the name of the hook needs to start with use
    const [values, setValues] = useState({});

    // we can declare it as a variable or as a function
    // function handleChange(e){
    //      setValues({
    //          [e.target.name]: e.target.value;
    //      })    
    // }

    const handleChange = e => {
        setValues({
            // we are preserving old values via spread operator
            ...values,
            [e.target.name]: e.target.value
        });
    };

    // we can return in object or in an array
    return [values, handleChange];
}

