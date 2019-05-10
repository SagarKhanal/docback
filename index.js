// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require("socket.io").listen(server);
// const port = 3000;


// io.on('connection',function(socket){
//     console.log("User Connected");
//     socket.on("Chat Message",msg=>{
//         console.log(msg);
//         io.emit("Chat Message",msg);
//     })
// });

// server.listen(port,()=>console.log("Server running on port "+port));


const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on("Chat Message",msg=>{
    console.log(msg);
    ws.emit("Chat Message",msg)
  })
  ws.on('close', () => console.log('Client disconnected'));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 1000);