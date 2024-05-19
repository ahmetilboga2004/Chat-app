import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Yeni bir bağlantı gerçekleşti. \nBağlantı ID : " + socket.id);
  socket.on("message", (msg) => {
    io.emit("message", msg);
    console.log("Yeni mesaj: ", msg);
  });
});

server.listen(3000, () => {
  console.log("Sunucu 3000 portunda çalıştırıldı. | http://localhost:3000/");
});
