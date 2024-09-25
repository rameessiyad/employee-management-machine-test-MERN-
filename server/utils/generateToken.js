const jwt = require('jsonwebtoken');

const generateToken = (id, res) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});

    //store in cookies
    res.cookie('token', token , {
        httpOnly: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    })
}

module.exports = generateToken;