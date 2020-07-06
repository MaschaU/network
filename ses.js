// BASIC SETUP //
const aws = require('aws-sdk');

let secrets;
// this block of code is going to run if the application is on heroku
if (process.env.NODE_ENV == 'production') {
    secrets = process.env; // in prod the secrets are environment variables
// this block is going to run if we're running our application locally
} else {
    secrets = require('./secrets'); // in dev they are in secrets.json which is listed in .gitignore
}

// creating a new instance of SES
// SES is enabling us communication with AWS and sending emails on our behalf
// the properties are required by AWS dev kit
const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: 'eu-west-1'
});

// SENDING AN EMAIL //

exports.sendEmail = function(to, subject, message) {
    // we are calling ses send email method
    return ses.sendEmail({
        Source: "Who's up? <fuschia.plutonium@spicedling.email>",  // the source of the email being sent, randomly assigned by SPICED
        Destination: { // who are we sending the email to
            ToAddresses: ["fuschia.plutonium@spicedling.email"] // the argument we originally passed to a function
        }, 
        // the composition of the email that will be sent to the user
        Message: {
            Body: {
                Text: {
                    Data: message // sending a secret code to the user
                }
            },
            Subject: {
                Data: subject // the second argument we passed to our function
            }
        }
    }).promise().then(
        () => console.log('it worked!')
    ).catch(
        error => console.log("It didn't work!:", error)
    );
};

// sendEmail('dill@spicedling.email', "Heres your password reset code", '918273ysdhbvj')
//     .then(() => {

//     })
//     .catch(err => {
//         console.log(err)
//     })



