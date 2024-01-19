
module.exports = (sequelize, DataTypes) => {

    const Routes = sequelize.define('route', {
        route_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        departureCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        arrivalCity: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Distance_between_cities: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Estimated_travel_time: {
            type: DataTypes.TIME,
            allowNull: false,
        }

    });
    return Routes;

};
