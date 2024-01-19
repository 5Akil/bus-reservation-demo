const models = require('../models')
const seatModel = models.seat
const reservationModel = models.reservation


class socketController {
    static joinchannel = (socket, busId) => {
        console.log(busId);
        socket.join(busId);
        socket.emit('join-channel', `You have joined channel for bus ${busId}`);
    }
    static seatReserve = async (socket, data) => {
        try {
            const transaction = await models.sequelize.transaction()
            try {
                const seat = await seatModel.findByPk(data.seat_id, { where: { bus_Id: data.busId, seatStatus: 'available' } }, { transaction: transaction, lock: true });
                if (!seat || seat.isReserved) {
                    throw new Error('Seat not available');
                }
                try {
                    const reserv = await reservationModel.create({
                        bus_id: data.busId,
                        seatNumber: data.seat_number,
                        passengerName: "sakil",
                        passengerEmail: "123@admin.com",
                    }, { transaction: transaction })

                } catch (error) {
                    console.log(error, '<<<<<<<<<<<<<<<,,,');
                }

                const res = await seatModel.update({ seatStatus: 'blocked' }, { where: { id: data.seat_id } }, { transaction: transaction })
                await transaction.commit();

                const message = `seat ${data.seat_number} is selected`
                socket.broadcast.to(data.busId).emit('reserveSeatSuccess', { seat_id: data.seat_id, seat_number: data.seat_number, message })

                setTimeout(async () => {
                    const reservedSeat = await seatModel.findByPk(data.seat_id, { where: { bus_id: data.bus_id, seatStatus: 'booked' } });
                    const reservation = await reservationModel.findOne({
                        where: { bus_id: data.busId, seatNumber: data.seat_number, isConfirmed: false },
                    });

                    if (reservedSeat && reservation) {
                        // Release the seat
                        await reservedSeat.update({ seatStatus: "available" });
                        await reservation.destroy();

                        // Broadcast the seat release to all clients
                        socket.broadcast.to(data.busId).emit('seat-released', 'seat released')
                    }
                }, 5 * 60 * 1000);

                if (!res) {
                    throw new Error('error in socketcontroller line 14')
                }
            } catch (error) {
                await transaction.rollback();
            }
        } catch (error) {
            console.error('Error starting transaction:', error.message);
        }
    }
    static seatDiselected = async (socket, data) => {
        console.log(data, '<<<<<<<<<<<<<');
        try {
            const message = `seat ${data.seat_number} is diselected`
            const res = await seatModel.update({ seatStatus: 'available' }, { where: { id: data.seat_id } })
            const destroy = await reservationModel.destroy({ where: { bus_id: data.busId, seatNumber: data.seat_number } })
            if (!res) {
                throw new Error('error in socketcontroller line 14')
            }
            socket.broadcast.to(data.busId).emit('seat-diselected', { seat_id: data.seat_id, seat_number: data.seat_number, message, releseSeats: true })
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = socketController

