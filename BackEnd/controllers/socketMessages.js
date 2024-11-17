const messageHandler=(socket,io)=>{
    //messages handling
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`${socket.id} joined room: ${roomId}`);
    })
    
    socket.on("message",(data)=>{
        console.log(data)
        data.success= true
        socket.to(`room-${data.to}`).emit("message", data)
        socket.emit("message",data)
      })
    
    }
    module.exports =messageHandler 