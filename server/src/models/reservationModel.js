
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('reservation', {
        bus_id: {
            type: DataTypes.INTEGER,
        },
        seatNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passengerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passengerEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isConfirmed:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        reservationTime: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

    return Reservation;

};