
require('dotenv').config();
const express = require('express')
const cors = require('cors');
const app = express();
const http = require('http')
const { Server } = require('socket.io')
const models = require('./src/models');
const busesRoutes = require('./src/routes/busesRoutes');
const port = process.env.PORT;
const sockets = require('./src/web-socket/sockets');
const cron = require('node-cron')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/buses', busesRoutes)



// cron.schedule("*/10 * * * * *", function() { 
//     console.log("running a task every 1 second"); 
// }); 

// app.use('/insert', async (req, res) => {
//     try {
//         console.log("called");
//             const arr = [];
//             for (let alpha = 65; alpha < 74; alpha++) {
//                 for (let index = 1; index < 6; index++) {
//                     arr.push("A" + index);
//                     const insert = await models.seat.create({ bus_id: 2, seatNumber: `${String.fromCharCode(alpha)}${index}`, seatStatus: 'available' });
//                     console.log(insert);
//                 }
//             }
//             return arr;

//     } catch (error) {
//         console.log(error);
//     }
// })


models.sequelize.sync({ alter: true }).then(function () {
    console.log('database sync..', '<<<<<<<<<<<<<<<<<<<<<<<<<<<,');
})

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173"],
    },
});
io.on("connection", sockets);

app.use('/', async (req, res) => {
    console.log("server is running");
    res.send('server is live')
})


httpServer.listen(3214, () => {
    console.log("Server is running at http://localhost:3214");

});






















