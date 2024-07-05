const express = require("express")
const app = express()
const path = require("path")

const http = require("http")
const server =  http.createServer(app)
const socketIo = require("socket.io")
const io =  socketIo(server)

io.on("connection",function(socket){
    socket.on("message",function(data){
        io.emit("message-reseved",data)
    })
    socket.on("typing",function(){
        socket.broadcast.emit("some-one-is-typing")
    })
})


app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

app.get("/",function(req,res){
    res.render("index")
})

server.listen(3000)