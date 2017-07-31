const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

var sqlite3 = require('sqlite3').verbose();


var db = new sqlite3.cached.Database('./database/tcc_log.db3');

var server = express();
server.use(bodyParser.json());

server.post('/log/save', (request, response) => {    

    let log = request.body;
    db.run(`INSERT INTO log ( interface, module, start_date, end_date, start_battery, end_battery) VALUES ('${log.interface}', '${log.module}', '${log.start_date}', '${log.end_date}', '${log.start_battery}', '${log.end_battery}')`);
    response.sendStatus(200);
});

server.post('/uploads', (req, response) => {
    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);
});

server.get('/download/:file',(request,response)=>{

    let file = request.params.file;
    let path = __dirname + '/download/' + file;
    response.download(path);
});

server.listen(9001, () => {
    console.log('Servidor no ar');
});
