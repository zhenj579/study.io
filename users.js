const users =[];

//User join to chat
function userJoin(id, username, room,  score=0){
  const user= {id,username,room,score};
  
  users.push(user);
  return user;
}

//user leaves chat
function userLeave(id, username, room){
  const idx= users.findIndex(user=> user.id==id);
  if(idx!==-1)
    return users.splice(idx,1)[0];
}

//get room users
function getRoomUsers(room){
  return users.filter(user=>user.room===room)
}

//get curr user
function getCurrentUser(id){
  return users.find(user=>user.id===id)
}

module.exports ={
  userJoin,
  userLeave,
  getRoomUsers,
  getCurrentUser
}