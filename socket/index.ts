import {Server} from "socket.io"
import dotenv from "dotenv"
import user from "./interfaces/user";
dotenv.config()
const io = new Server(Number(process.env.PORT),{
    cors:{
        origin:true
    },
  
    

})

let users = Array<user>();
const addUser = (userId:string, socketId:string) => {
  !users.some((user:user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId:string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId:string) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection",(socket)=>{
    //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId!).emit("getMessage", {
      senderId,
      text,
    });
  });
  socket.on("sendToAll",(msg)=> {
    io.emit("sendMsg",(msg))
  })
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
  })
