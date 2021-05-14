const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../models'); //database

const STRATEGY = new LocalStrategy ({

    usernameField: 'email',
    passwordField: 'password'

}, async (email,password,cb)=> {
    
       try {
        const user = await db.user.findOne({
        where:{ email }
    }); 
    
    if (!user || !user.validPassword(password)) {
        cb(null,false);

    }else {
        cb(null,user);
    }

} catch (error) {
           console.log('---- yo error ---- ')
           console.log(error);
    }
       
    
});

passport.serializeUser((user, cb)=> {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await db.user.findByPk(id);

        if (user) {
            cb(null,user);

        }
    } catch (error) {
        console.log('--- yon there is an error below -----' );
    }
});

passport.use(STRATEGY);

module.exports = passport; 

