const chatForm = document.getElementById('chat-input');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');
//username and room
const {username,room}= Qs.parse(location.search,{
  ignoreQueryPrefix: true
})
console.log(username,room)

const socket= io();

// join room
socket.emit('joinRoom', {username,room});

//get room and users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users);
});

// await message from server
socket.on('message', message =>{
  console.log(message);
  outputMessage(message);

  //auto position at bottom
  chatMessages.scrollTop= chatMessages.scrollHeight;

});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;
  console.log(msg);
  // post to server
  socket.emit('chatMessage',msg)

  //clear input after submit
  e.target.elements.msg.value= '';
  e.target.elements.msg.focus();

});

//msg to chat box
function outputMessage(message){
  const div= document.createElement('div');
  div.classList.add('message');
  div.innerHTML= 
  `${message.username} <span>${message.time}\t${message.text}`
  // <p class="text">
  // </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}

//add room name
function outputRoomName(room){
  roomName.innerText=room;
}

//add users to list
function outputUsers(users){
  userList.innerHTML=
  `
    ${users.map(user=>`<li>${user.username} : ${user.score}</li>`).join('')}
  `;
}