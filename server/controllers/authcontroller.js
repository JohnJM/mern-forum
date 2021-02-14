const userService = require('../services/userService');
const { handleError } = require('../helper/authHandleError');
const User = require('../models/user');
const winston = require('winston');




module.exports.publicUserInfo_get = (req, res) => {
    console.log('hit get public user controller');

    const { uid } = req.params;
    
    
    userService.getPublicUserInfoById(uid).then(data => {
        res.status(200).json(data);
    }).catch(err => {
        console.log('error on controller,', err);
        res.status(400).json({err})
    })
}

module.exports.signup_post = async (req, res) => {

    // console.log(req.body);
    const {
        username,
        password
    } = req.body;

    userService.createUser(username, password).then(({user, token, maxAge}) => {
            res.cookie('Authorization', token, {httpOnly: true, maxAge: maxAge})

            //override the full user object with just the id
            //send user id back to compare against jwt.
            res.status(203).json({user: user._id});
        })
        .catch(err => {
           const errors = handleError(err);
            res.status(400).json({ errors });
        });
}


module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;
    try {
        const {user, token} = await User.login(username, password);

        res.cookie('Authorization', token, {maxAge: 1000 * 60 * 60 * 2}) ; 
        

        res.status(200).json({id: user._id, username: user.username, token})
    }
    catch(err) {

    
        const errors = handleError(err);

        // console.log('2nd err = ' +  Object.values(errors))
        console.log('errors found -> ', err);

        res.status(400).json({
            errors
        });
    }
}


module.exports.changePwd_post = async (req, res) => {

    const {oldPwd, id, newPwd} = req.body;

    userService.changePwd(newPwd, oldPwd, id).then(doc => {
        
    res.status(200).json({msg: 'success?????'});

    }).catch(err => {
        console.log(err);
        res.status(400).json({err});
    })
}

module.exports.vippage_get = (req, res) => {
    // console.log('res . locals', res.locals.user);

    //if you can get here you are past the auth :)
    

    // res.json(res.locals.user).status(200);
    res.status(200).json({content: 'THIS IS THE VIP CONTENT YOU REQUESTED'})
} 

