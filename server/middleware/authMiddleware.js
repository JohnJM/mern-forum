const jwt = require('jsonwebtoken');
const e = require('express');
const {secret} = require('../secretconfig.json');
const User = require('../models/user');

//inside express router middleware we get access to req res :) - check jwt
const requireAuth = (req, res, next) => {
    console.log('hit require auth, token below: ');

    console.log(req.cookies);
    const token = req.cookies.Authorization;

    // const token = req.cookies.authorization.split(" ")[1]; check token is valid
    if (!token) {
        // res.locals.user = null;
        console.log('hit');
        res
            .status(403)
            .json({error: 'unauthorized'})
            .end();

    } else {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                console.log(err);
                res
                    .status(403)
                    .json({error: 'unauthorized'})
                    .end();
            } else {
                console.log('jwt correct - decoded jwt below: ');
                console.log(decodedToken);
                next();
            };
        })
    }

}

module.exports = {
    requireAuth
};