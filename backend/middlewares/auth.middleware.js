const userModel = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blacklistToken.model.js');
const captainModel = require('../models/captain.model.js');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if(isBlacklisted){
        return res.status(401).json({ message: 'Token has been blacklisted. Please log in again.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;

        return next();

    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if(isBlacklisted){
        return res.status(401).json({ message: 'Token has been blacklisted. Please log in again.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next();
    } catch (err) {
        return res.status(400).json({ message: 'Invalid token.' });
    }
}