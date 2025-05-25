import express from "express";
import { createServer } from "http"
import path from "path"
import { Server } from "socket.io";
import { fileURLToPath } from "url";



const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../front")));


io.on("connection", (socket) => {
    console.log("User was connected: ", socket.id);
    socket.on("message", (msg)=>{
        console.log("message received");
        io.emit("message", msg)
        
    })
    socket.on("disconnect", () =>{
        console.log("user kill", socket.id);
        
    })
    
})  
httpServer.listen(3001,()=>{
    console.log("server is listening on port:http://localhost:3001 ");
    
})