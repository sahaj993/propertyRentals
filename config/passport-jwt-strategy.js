const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Landlord = require('../models/landlord');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'hospital',
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    Landlord.findById(jwtPayLoad._id, function(err, landlord){
        if (err){console.log('Error in finding the landlord'); return;}
        if (landlord){
            return done(null, landlord);
        }else{
            return done(null, false);
        }
    })
}));

module.exports = passport;