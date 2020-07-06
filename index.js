const express = require("express");
const app = express();
const compression = require("compression");
// const  {Redirect} = require("react-router");
const cookieSession = require("cookie-session");
const db = require("./sql/db.js");
const {hash, compare} = require("./bc.js");
const csurf = require("csurf");
const {getHashedPassword} = require("./sql/db.js");

// Returns the compression middleware using the given options. 
// The middleware will attempt to compress response bodies for all request that traverse through the middleware, 
// based on the given options.
app.use(compression());


if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        // whenever there is request for bundle.js, get it from 8081
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile("${__dirname}/bundle.js"));
}


// middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(cookieSession({
    secret: `I'm always angry`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
}));
app.use(csurf());
app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// ROUTES //
// GET ROUTES
app.get('/welcome', (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

// all the other routes need to be above *
// no matter what the url, the * will be served
app.get("*", function(req, res) {
    if (!req.session.userId) {
        console.log("Redirecting to Welcome");
        res.redirect("/welcome");
    }
    else {
        console.log(req.session.userId);
        res.sendFile(__dirname + "/index.html");
    }
});

// POST ROUTES

app.post("/registeredUser", (req, res) => {
    console.log(hash);
    hash(req.body.password)
        .then((hashedPw) => {
            console.log("Hashed password:", hashedPw);
            const { firstName, lastName, email, password } = req.body;
            return db.insertNewUser(firstName, lastName, email, hashedPw);
        })
        .then((results) => {
            console.log(results.rows);
            const userId = results.rows[0].id;
            req.session.userId = userId;
            res.json("Successful!");
        })
        .catch((error) => {
            console.log("Error in POST:", error);
            res.send(error);
        });
});

app.post("/login", (req, res)=>{
    let password = req.body.password;
    let email = req.body.email;
    getHashedPassword(email).then((result)=>{
        if((result.rows != undefined) && (result.rows.length>0)) {
            compare(password, result.rows[0].password_hash).then((match)=>{
                if(match) {
                    let userId= result.rows[0].id;
                    req.session.userId = userId;
                    res.json("Success");
                } else {
                    res.json("Failure");
                }
            }).catch((error)=>{
                console.log("The inner error:", error);
                res.json("Failure");
            }).catch(error=>{
                console.log("Last error in login post:", error);
            });
        }
    });

});

// EXPRESS ROUTES FOR RESETTING THE PASSWORDS

// POST /password/reset/start- happens when user first enters their email in the 1st display //
// 1.) verify the users email address 
// - if the user is register, generate the secret code via cryptoRandomString
//   const cryptoRandomString = require('crypto-random-string');
//   const secretCode = cryptoRandomString({
//       length: 6
//   });
// - once we generate the secret code, we need to record it for later verification
// - we do that by creating a new table and storing the secret code in it
// - then we send an email to the user
// - then sending a response to the user (everything worked) and rendering the next display


// POST /password/reset/verify- happens when user enters the code and new password
// - it runs once user enteres the code received in email
// - verify that the code is a correct one
// - comapare received code with the one from our data base
// - if the codes match, the user has entered the correct code in which case we need to handle the password
// - to do that we need to hash password and update the table with the new hash and send the response to user saying it was successful

// how to have one component render different displays?
// class ResetPassword extends React.Component {
//    constructor(){
//      super();
//     this.state = {};
// }
// getCurrentDisplay(){
//     if(something){
//          return display1/display2/display3
// }    
// - we want to put something in state that indicates which display we want to show
// - we'll have to update this property of state when we want to show the next display
// - where in our code do we want to put the logic of updating the property of state?
// - axios.then will run after we receive the response from the server! hint!
// 
//










app.listen(8080, function() {
    console.log("I'm listening.");
    console.log(hash);
});