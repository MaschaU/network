const express = require("express");
const app = express();
const compression = require("compression");
const  {Redirect} = require("react-router");
const cookieSession = require("cookie-session");
const db = require("./sql/db.js");
const {hash, compare} = require("./bc.js");
const csurf = require("csurf");
const {getHashedPassword, getUsersEmail, insertIntoPasswordResetCodes, checkIfTheCodeIsValid, updateUsersPassword, getUserInfo, insertNewUser, storeProfilePicture, updateUsersBio, getNewestUser} = require("./sql/db.js");
const cryptoRandomString = require('crypto-random-string');
const { sendEmail } = require("./ses.js");

// Returns the compression middleware using the given options. 
// The middleware will attempt to compress response bodies for all request that traverse through the middleware, 
// based on the given options.
app.use(compression());


if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        // whenever there is request for bundle.js, we will get it from 8081
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile("${__dirname}/bundle.js"));
}

// boilerplate code for file upload
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');

// multer is storing the files in our upload folder
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

// uploader runs our discStorage that can't be larger than 2MB
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

// S3
const s3 = require("./s3.js");
const {s3Url} = require("./config.json");


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
// there is a matching server request for every axios request

// GET //
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get("/user", (req, res)=>{
    console.log("This is not an empty object:", req.session.userId);
    if (req.session.userId === undefined || req.session.userId == null || req.session.userId == 0){
        res.json({}); // probable hack attempt - fail without giving away anything useful
    }
    getUserInfo(req.session.userId).then((result)=>{
        console.log("This is not an empty object2:", result);
        // console.log("It's a success!");
        if (result.rows.length == 1) {
            const rowReturned = result.rows[0];
            // console.log("This is the first name:", rowReturned.firstname);
            res.json({ 
                firstName: rowReturned.firstname,
                lastName: rowReturned.lastname,
                profilePic: rowReturned.imageurl,
                bio: rowReturned.bio});
        } else {
            res.sendStatus(500); // zero or too many rows returned
        }
    }).catch((error)=>{
        console.log("Error in user GET:", error);
        
    });
});

app.get("/newestUser", (req, res)=>{
    let userId = req.session;
    getNewestUser(userId).then((result)=>{
        if(result) {
            res.json(result);
        } else {
            res.json("Failure");
        }
    }).catch((error)=>{
        console.log("Error in getNewestUser:", error);
    });
});

// all the other routes need to be above *
// if the user inputs gibberish url, the * will be served
app.get("*", function(req, res) {
    if (!req.session.userId) {
        // console.log("Redirecting to Welcome");
        res.redirect("/welcome");
    }
    else {
        // console.log(req.session.userId);
        res.sendFile(__dirname + "/index.html");
    }
});

// POST ROUTES

app.post("/registeredUser", (req, res) => {
    // console.log(hash);
    hash(req.body.password)
        .then((hashedPw) => {
            // console.log("Hashed password:", hashedPw);
            const { firstName, lastName, email, password } = req.body;
            return insertNewUser(firstName, lastName, email, hashedPw);
        })
        .then((results) => {
            // console.log("I'm executing!:", results.rows);
            const userId = results.rows[0].id;
            req.session.userId = userId;
            // console.log("I'm about to come to last two lines");
            // console.log("I'm after the 1st line");
            res.json({result:"Success"});
            // console.log("I made it");
            
        })
        .catch((error) => {
            // console.log("Error in POST:", error);
            res.send(error);
        });
});

app.post("/userLogin", (req, res)=>{
    let password = req.body.password;
    let email = req.body.email;
    // console.log("The email is:", req.body.email);
    getHashedPassword(email).then((result)=>{
        if((result.rows != undefined) && (result.rows.length>0)) {
            // console.log("Results in userLogin:", result.rows);
            const password_hash= result.rows[0].password;
            // console.log("hashed password.", password_hash);
            compare(password, password_hash).then((match)=>{
                if(match) {
                    let userId= result.rows[0].id;
                    req.session.userId = userId;
                    res.json("Success");
                } else {
                    res.json("Failure");
                }
            }).catch((error)=>{
                // console.log("The inner error:", error);
                res.json("Failure");
            }).catch(error=>{
                console.log("Last error in login post:", error);
            });
        }
    });

});

app.post("/resetpassword/email", (req, res)=>{
    // verify the users email address and then
    let email = req.body.email;
    getUsersEmail(email).then(result=>{
        // console.log("Rows before the if statement:", result.rows);
        if(result.rows.length>0){
            // console.log("The result rows is:", result.rows);
            // generate the secret code
            const secretCode = cryptoRandomString({
                length: 6
            });
            // console.log("The secret code is:", secretCode);
            // record the secret code for later verification and store it in a new database
            // send an email to the user
            insertIntoPasswordResetCodes(email, secretCode).then(sendEmail(email, "Heres your password reset code", secretCode)
                .then(() => {
                    // console.log("Empty JSON is:");
                    res.json("Success");
       
                })
                .catch(error => {
                    console.log("Error in response:", error);
                }));
        }
    });
});

// it will run once the user enters the code received
app.post("/resetpassword/verify", (req, res)=>{
    let code = req.body.code;
    let email = req.body.email;
    let password = req.body.password;
    // verify if the entered code is the correct one
    // if the codes match, handle the password
    checkIfTheCodeIsValid(email, code).then(result=>{
        if(result.rows.length > 0) {
            // hash the password and update the table
            hash(password).then((hashedPw)=>{
                return updateUsersPassword(email, hashedPw);
            }).then((result)=>{
                res.json("Success");
            }).catch((error)=>{
                res.json("Failure");
            });
        } else {
            res.json("Failure");
        }
    }).catch((error)=>{
        res.json("Failure");
    });
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res)=>{
    const {filename} = req.file;
    const url = `${s3Url}${filename}`;
    // console.log("This is the url", url);
    const userId = req.session.userId;
    storeProfilePicture(userId, url).then(({rows})=>{
        return res.json({url: url});
    }).catch(error=>{
        console.log(error);
    });
});

app.post("/uploadProfilePic", (req, res)=>{
    let userId=req.session.userId;
    let image= req.body.imageUrl;
    // console.log("Upload POST:", req.body.imageUrl);
    // console.log("This is the image:", image);
    storeProfilePicture(userId, image).then((result)=>{
        // console.log("The result in uploadProfilePic is:", image);
        res.json(result.rows[0]);
    }).catch((error)=>{
        console.log("Bloody error:", error);
    });
});

app.post("/setBio", (req, res)=>{
    let bio=req.body.bio;
    let userId=req.session.userId;
    updateUsersBio(userId, bio).then((result)=>{
        res.json(result.rows[0]);
    }).catch((error)=>{
        console.log("There is an error in setBio post:", error);
    });
});

app.post("/api-userinfo", (req, res)=>{
    let requestedUserId = req.body.requestedUserId;
    getUserInfo(requestedUserId).then((result)=>{
        console.log("Request user id is:", requestedUserId);
        if (result.rows.length == 1) {
            let rowReturned = result.rows[0];
            console.log("Row:", rowReturned);
            res.json({ 
                firstName: rowReturned.firstname,
                lastName: rowReturned.lastname,
                profilePic: rowReturned.imageurl,
                bio: rowReturned.bio});
        }
    }).catch((error)=>{
        console.log("Error in getting other users:", error);
    });
});




app.listen(8080, function() {
    console.log("I'm listening.");
});


/*

FOR FRIENDSHIPS FEATURE we need a four server routes:
- GET /getinitialstatus/:id
- POST /makefriendrequest/:id
- POST /acceptfriendrequest/:id
- POST /endfrienship/:id
*/