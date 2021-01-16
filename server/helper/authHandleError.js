module.exports.handleError = (err) => {
    // console.log(err, ': error object');
    // console.log('here',e.message, e.code);
    let errors = { username: "", password: ""};

    //check for dups - mongo err code
    if(err.code === 11000){
        errors.username = 'Username already exists'
        return errors;
    }



    //validation errors
    if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach( ({properties} ) => {
            
            //properties.path provides either "username" or "password" here.
            errors[properties.path] = properties.message;
            // console.log(properties.message);
        });    
    }


    if(err.message === 'incorrect username'){
        errors.username = err.message;
    }

    if(err.message === 'incorrect password'){
        errors.password = err.message;
    }
  
    // console.log( 'errors -->> ', err.typeOf())
    console.log( 'errors 2 -->> ', err.message)



    return errors;
}