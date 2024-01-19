
'use strict';
module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('seat', {
        bus_id: {
            type: DataTypes.INTEGER,
        },
        seatNumber: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        seatStatus: {
            type: DataTypes.ENUM('available', 'booked','damaged' , 'blocked'),
            defaultValue: 'available',
        },
    });

    Seat.associate = function (models) {
        Seat.belongsTo(models.bus, { foreignKey: "bus_id" } )
    }

    return Seat;

};