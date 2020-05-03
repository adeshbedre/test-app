var express = require('express');
var app = express();
var path = require('path');
var proxy = require('express-http-proxy');
app.use(express.static(__dirname + '/dist'), ('/api/*', proxy('https://seat-allocation-service.herokuapp.com/')));
app.listen(process.env.PORT || 4000);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/index.html"));
});
console.log("Express server listening on port %d", process.env.PORT);
