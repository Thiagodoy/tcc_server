const express = require('express');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

var server = express();


const listUser = [
    {nome:'Thiago Henrique de Godoy', profissao:'Mecânico'},
    {nome:'Pedro', profissao:'Pintor'},
];

server.get('/',(request,response)=>{
    response.send('Servidor no Ar!!');
});

server.get('/api/getUsers',(request,response)=>{
    response.send(listUser);

});

server.post('/uploads',(req,response)=>{
     // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);
});

server.listen(9000,()=>{
    console.log('Servidor no ar');

});
 