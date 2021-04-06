const User = require('../models/user.js');
const { createToken } = require('../helper/jwtfunc.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


module.exports.createUser = async (username, password) => {
    try {
       const user = await User.create({
            username,
            password,
            'role': 'basic'
        })

        console.log('creating user -> ', user);

        const [token, maxAge] = createToken(user._id);

        //return maxAge for if they want to send the cookie. return the jwt too.
        return { user, token, maxAge };
    }

    catch (e){
        throw e;
    }
}


module.exports.changePwd = async ( newPwd, oldPwd, id ) => {
    try {

        console.log('got here');

        const user = await User.findById(id);


        if (user){
            console.log('found user on checkAuth by id ->', user);

            const auth = await bcrypt.compare(oldPwd, user.password);


            if(auth) {
                // const [token] = createToken(user._id, '2hr');

                const salt = await bcrypt.genSalt();
                const password = await bcrypt.hash(newPwd, salt);


                User.findByIdAndUpdate(id, {password: password},{useFindAndModify: false}, (err, doc) => {

                    if(err){
                        throw Error('server error - please try again later.')
                    }

                    console.log('updated user ->  ', doc);
                })

            } else {
                throw Error('incorrect password')
            }
        } else {
            throw Error('Account does not exist - please logout / login and try again.')
        }


    } catch (e) {
        throw e
    }
}

module.exports.getPublicUserInfoById = async (id) => {
    try {
        const user = await User.findById(id, {
            _id: 0,
            password: 0,
            updatedAt: 0
        });

        if (user){
            return user
        } else {
            throw Error('Cant find that user');
        }
    } catch (e) {
        throw e
    }
}

