const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/admin-model');

const isAuth = asyncHandler(async (req,res,next) => {
    let token;

    //get token from cookies
    if(req.cookies && req.cookies.token) {
        token = req.cookies.token;
        console.log("Token: ", token);
    }else {
        console.log("Token not found");
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //get user from the decoded token
        req.user = await Admin.findById(decoded.id).select('-password');
        if(!req.user) {
            console.log("User not found");
            return res.status(401).json({message: 'Unauthorized, user not found'});
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({message: 'Unauthorized'});
    }
});

module.exports = isAuth