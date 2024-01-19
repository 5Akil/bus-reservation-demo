const socketController = require("./socketController");



const sockets = (socket) => {

    socket.on("join-channel",(busId)=> socketController.joinchannel(socket , busId));
    socket.on("reserve" , (data)=>socketController.seatReserve(socket , data))
    socket.on("seat-diselected" , (data)=>socketController.seatDiselected(socket , data))
socket.on("confirmed_seats",(data)=>{
    console.log(data,'<<<<<<<<<<,');
})
    socket.on("disconnect", (socket) => {
        console.log("User left.");
    });
};


module.exports = sockets
