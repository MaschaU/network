// bundle- server compiles our js code and serves it
// it's only neccessarry to start the bundle-server once
const express = require('express');
const app = express();

app.use(require('./build.js'));

app.listen(8081, () => console.log(`Ready to compile and serve bundle.js`));
