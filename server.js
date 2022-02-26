const path= require('path');
const http= require('http');
const express = require('express');
const socketio= require('socket.io');
const formatMessage =require('./message');
const {userJoin, userLeave, getRoomUsers, getCurrentUser} =require('./users');

const app= express();
const server= http.createServer(app);

const io= socketio(server)

//static for front end
app.use(express.static(path.join(__dirname,'ChatPage')));

const chatBot= 'Lil\'Education';

//when client joins room
io.on('connection',socket=>{

  //user joins room
  socket.on('joinRoom', ({username,room})=>{
    //get user info
    const user= userJoin(socket.id, username, room);
    socket.join(user.room)

    //welcome to room
    socket.emit('message', formatMessage(chatBot,'Welcome to chat'));

    //User connects (only to user's room)
    socket.broadcast.to(user.room).emit('message', formatMessage(chatBot,`${user.username} has joined the chat`));

    //Users and Room Info
    io.to(user.room).emit('roomUsers',{
      room:user.room,
      users: getRoomUsers(user.room)
    });
  });

  //User leaves
  socket.on('disconnect',()=>{
    const user = userLeave(socket.id)
    if(user){
      //leaves chat
      io.to(user.room).emit('message', formatMessage(chatBot,`${user.username} has left the chat`))
      //Users and Room Info
      io.to(user.room).emit('roomUsers',{
        room:user.room,
        users: getRoomUsers(user.room)
      });
    }
  });

  //User sends a message
  socket.on('chatMessage',msg=>{
    const user = getCurrentUser(socket.id)
    console.log(user)
    io.to(user.room).emit('message', formatMessage(`${user.username}`,msg));
  });

});

const PORT = 3000|| process.env.PORT;
server.listen(PORT,()=>
  console.log(`Server running on port ${PORT}`)
);

//handle socket.io