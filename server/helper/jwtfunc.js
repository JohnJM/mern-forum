const jwt = require('jsonwebtoken');
const { secret } = require('../secretconfig');

module.exports.createToken = (id, maxAge) => {
   maxAge = maxAge || 1 * 24 * 60 * 60;

    return [ jwt.sign({ id }, secret, {
        //jwt uses seconds, not like a cookie (ms)
        expiresIn: maxAge
    }), maxAge ]
}