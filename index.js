const express = require('express');
var server = express();

server.get('/',(request,response)=>{
    response.send('Servidor no Ar!!');
});


const listUser = [
    {nome:'Thiago Henrique de Godoy', profissao:'Mecânico'},
    {nome:'Pedro', profissao:'Pintor'},
];

server.get('/api/getUsers',(request,response)=>{
    response.send(listUser);

});

server.listen(9000);
