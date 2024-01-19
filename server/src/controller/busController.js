

const { Socket } = require('socket.io')
const models = require('../models')
const sockets = require('../web-socket/sockets')
const busModel = models.bus
const seatModel = models.seat
const routeModel = models.route
const reservationModel = models.reservation

class busController {
    static getBus = async (req, res) => {
        try {
            const buses = await busModel.findAll({
                include: {
                    model: routeModel,
                    attributes: ['departureCity', 'arrivalCity', 'Distance_between_cities', 'Estimated_travel_time']
                }
            })
            for (const bus of buses) {
                bus.routes.forEach(item => {
                    bus.dataValues.route = item
                    delete bus.dataValues.routes
                });

            }
            res.send(buses)
        } catch (error) {
            console.log(error);
        }
    }
    static getSeats = async (req, res) => {
        const { id } = req.params
        const result = await seatModel.findAll({ where: { bus_id: id } })
        res.send(result)
    }
    static reserveSeats = async (req, res) => {
        const { id: busId } = req.params
        console.log(
            busId
        );
        const data = req.body
        if (data.length == 0) {
            res.status(400).send({ "messege": "Please select seat first" })
        }
        let bookedSeats = []
        for (const number of data) {
            const seat = await seatModel.findOne({
                where: { bus_id: busId, seatNumber: number, seatStatus: "booked" }
            });
            if (seat) {
                bookedSeats.push(seat.seatNumber);
            }
        }
        if (bookedSeats.length > 1) {
            res.status(400).send({ "messege": `This ${bookedSeats.join()} seats are already booked ` })
        } else if (bookedSeats.length == 1) {
            res.status(400).send({ "messege": `This ${bookedSeats} seat is already booked ` })
        } else {
            for (const seat of data) {
                // const body = {
                //     bus_id: 1,
                //     seatNumber: seat,
                //     passengerName: "sakil",
                //     passengerEmail: "123@admin.com",
                //     isConfir
                // }
                // await reservationModel.create(body)
                const update = await seatModel.update({ seatStatus: "booked" }, { where: { bus_id: busId, seatNumber: seat } })
                const reservationConfirmed = await reservationModel.update({ isConfirmed: true }, { where: { bus_id: busId, seatNumber: seat } })
                console.log(reservationConfirmed);
            }

            res.status(201).send({ "messege": "reservation is done" })
        }
    }
}

module.exports = busController


