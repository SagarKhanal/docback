const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;


io.on('connection',function(socket){
    console.log("User Connected");
    socket.on("Chat Message",msg=>{
        console.log(msg);
        io.emit("Chat Message",msg);
    })
});

app.get('/',function(req,res){
    res.send('<h1>Hello Native</h1>');
});

server.listen(port,()=>console.log("Server running on port "+port));