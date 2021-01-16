const jwt = require('jsonwebtoken');
const e = require('express');
const { secret } = require('../secretconfig.json');
const User = require('../models/user');

//inside express router middleware we get access to req res :) - check jwt
const requireAuth = (req, res, next, err) => {
    console.log('hit start');
    const token = req.cookies.jwt;

    //check token is valid
    if(!token){
        res.locals.user = null;
        console.log('hit');
        res.status(403).end();
        
    } 
    else {
        jwt.verify(token, secret, (err, decodedToken) => {
            err ? (
                console.log(err),
                res.status(403).end()
                 ) : (
                   console.log(decodedToken), next() 
                );
        })
    }
    
}

//check user or anon
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        res.locals.user = null;
        res.status(403).end();
    } else {
        jwt.verify(token, secret, async (err, decodedToken) => {
            err ? ( 
                 console.log(err),
                 res.locals.user = null,
                 res.status(403).end()
            ) : ( 
                User.findById(decodedToken.id).then(user => {
                    res.locals.user = user;
                    next();
                })

            );
        })
    }
}

module.exports = { requireAuth, checkUser };