const jwt = require('jsonwebtoken');


module.exports.createToken = (id, maxAge) => {
   maxAge = maxAge || 1 * 24 * 60 * 60;

    return [ jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
        //jwt uses seconds, not like a cookie (ms)
        expiresIn: maxAge
    }), maxAge ]
}