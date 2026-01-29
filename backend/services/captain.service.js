const captainModel = require('../models/captain.model.js');

module.exports.createCaptain = async ({
    firstName, lastName, email, password, color, plate, capacity, vehicleType
}) => {
    if(!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('Missing required fields');
    }
    const captain = captainModel.create({
        fullname: {
            firstname: firstName,
            lastname: lastName
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    },)
    return captain; 
}