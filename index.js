const express = require("express");
const app = express();
const compression = require("compression");
// const  {Redirect} = require("react-router");
const cookieSession = require("cookie-session");
const db = require("./sql/db.js");
const {hash, compare} = require("./bc.js");

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













app.listen(8080, function() {
    console.log("I'm listening.");
    console.log(hash);
});