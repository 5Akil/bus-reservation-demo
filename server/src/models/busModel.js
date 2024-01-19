'use strict';
module.exports = (sequelize, DataTypes) => {
    const Bus = sequelize.define('bus', {
        bus_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        route_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bus_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bus_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        departureTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        arrivalTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
    Bus.associate = function (models) {
        Bus.hasMany(models.route, { foreignKey: "route_id" })
    }
    return Bus;

};