const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();

//API file the need we need for intracting with mangoDB
const api = require('./server/routes/api');

//parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//anugular dist folder created during a build operation

app.use(express.static(path.join(__dirname, 'dist')));

//api location
app.use('/api', api);

//send all other applications to the angular index file

app.get('/index', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/index.html'));
})

//set the port 
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, ()=>
    console.log('server started at: ${port}')
)






















