var express = require('express');
var path = require('path');
var app = express();
app.set('view engine', 'html')

app.use('/static', express.static('static'));
app.get('/*', function(req, res) {
    console.log('index', req.query);
    // res.sendFile(path.join(__dirname+'/index.html'));
    res.send(req.query.echostr)
})


app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});