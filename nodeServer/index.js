//this will handle socket io connections
const {Server}=require("socket.io")
const io=new Server(8000);

const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("New Usr",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
    });
})