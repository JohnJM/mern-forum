const mongoose = require('mongoose');
// const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const { createToken } = require('../helper/jwtfunc.js');
const winston = require('winston');

const Schema = mongoose.Schema;
const colorValidator = (v) => (/^#([0-9a-f]{3}){1,2}$/i).test(v);

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [2, 'Username must be at least 2 characters'],
        maxlength: [10, 'Username must be at most 10 characters']
        // validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password' ],
        minlength: [5, 'Password must be 5 characters long (smile)']
    },
    role: {
        type: String,
        required: true
    },
    colour: {
        type: String,
        validator: [colorValidator, 'Invalid color hex'],
        required: false
    }

}, {timestamps: true});


//post method goes after hook (1st param, could be delete etc).
//first param is document that was saved to db.
userSchema.post('save', (doc, next) => {
    console.log('new user created. and saved', doc);
    next();
})

//pre is before hook - hash before send
// function used over arrow as we need this instance of user obj
userSchema.pre('save', async function(next) {
    console.log(this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async function (username, password) {
    const user = await this.findOne({username: username}) //can be shorted to {username}
    // winston.info('hit here');
    if (user) {
      const auth = await bcrypt.compare( password, user.password );

      if(auth){
        const [token] = createToken(user._id, '2hr');

        return {user , token};
      } else {
        throw Error('incorrect password');
      }
    }
    throw Error('incorrect username');
}


const User = mongoose.model('User', userSchema);
module.exports = User;