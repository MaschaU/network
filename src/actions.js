// will contain all of our action creater functions
// action creater- just a function that returns an object with a property called TYPE
// an object it returns is called an action

export function fn() {
    return{
        type: "CHANGE_STATE"
        // also pass data that you want to change
    };
}