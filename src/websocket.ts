// This is server

import { io } from "./http";

interface RoomUser {
  socket_id : string,
  username  : string,
  room      : string,
  category  : string,
};

interface Message {
  room          : string,
  registration  : string,
  summary       : string,
  category      : string,
  createdAt     : Date,
  username      : string
};

const users: RoomUser[] = [];

const messages: Message[] = [];

// Permitir que cliente conecte com aplicação.
// Allows the client to connect to the application.
io.on("connection", socket => { // Gera conexão entre cliente/servidor
  
  // Vai ficar escutando o evento que está sendo gerado (emit) no chat.js
  // It will listen to the event being generated (emit) in chat.js.
  socket.on("select_room", (data, callback) => {
    
    // User logged in room.
    socket.join(data.room);

    // Verify user into sala
    
    const userInRoom = users.find(user => user.username === data.username && user.room === data.room);

    // Mantém o usuário e muda o socket id.
    // Keep the user and change the socket id.
    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room      : data.room,
        username  : data.username,
        socket_id : socket.id,
        category  : data.category,
      });
    };

    const messagesRoom = getMessagesRoom(data.room);
    callback(messagesRoom);


    // Ouvindo
    // Listening
    socket.on("message", (data) => {
      // Save all messages 
      const message: Message = {
        room          : data.room,
        registration  : data.registration,
        summary       : data.summary,
        category      : data.category,
        createdAt     : new Date(),
        username      : data.username
      }

      messages.push(message);

      // Send messages to room users.
      io.to(data.room).emit("message", message);

    });

    //console.log(users);
  });
});

function getMessagesRoom(room: string) {
  const messagesRoom = messages.filter(message => message.room === room);
  return messagesRoom;
};