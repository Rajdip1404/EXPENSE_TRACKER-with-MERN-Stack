const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.project = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized User: Invalid Token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
        return res.status(403).json({ message: "Authorization Failed" });
    }
};