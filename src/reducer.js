/*// a function that holds if consitionals
// if action=x, change the state to this
// reducer has acces to the actions
// in reducer, we always need to make a clone

export default function reducer(state={}, action) {


    return state;
}

// 3 useful methods we can use for making copies of objects and arrays
var obj = {
    name: "Andrea"
};

// #1 SPREAD OPERATOR //
// create a clone/ copy
var newObje = {
    ...obj
};
// add properties to the clone
var newObj = {
    ...obj,
    last: "Arias"
};
var arr = [1,2,3];
var newArray = [...arr];
var newArray = [...arr,4];

// #2- MAP
// works only on arrays
// it's a loop useful for cloning, looping and changing each element in the array

// #3- FILTER
// also an array method
// great for removing things from the array*/