const User = require('../models/user.js');
const { createToken } = require('../helper/jwtfunc.js');

module.exports.createUser = async (username, password) => {
    try {
       const user = await User.create({
            username,
            password,
            'role': 'basic'
        })

        console.log(' we in userServuce.kjs Test here _____>', user, user._id);

        const [token, maxAge] = createToken(user._id);

        //return maxAge for if they want to send the cookie. return the jwt too.
        return { user, token, maxAge };
    }

    catch (e){
        throw e;
    }
}


