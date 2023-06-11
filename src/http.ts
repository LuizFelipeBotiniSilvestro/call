import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

// Servidor para rotas usando expreess.
const serverHttp = http.createServer(app);

// Cria o servidor com Socket.
const io = new Server(serverHttp);

export { serverHttp, io};

