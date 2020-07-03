const express = require('express');
const app = express();
const compression = require('compression');

// Returns the compression middleware using the given options. 
// The middleware will attempt to compress response bodies for all request that traverse through the middleware, 
// based on the given options.
app.use(compression());

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        // whenever there is request for bundle.js, get it from 8081
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// all the other routes need to be above *
// no matter what the url, the * will be served
app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
