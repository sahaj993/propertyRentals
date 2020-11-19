const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const Landlord = require('../models/landlord');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey: 'property',
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

passport.serializeUser(function(user, done){
    done(null, user.id);
})


passport.deserializeUser(function(id, done){
    Landlord.findById(id, function(err, user){
        if (err){
            console.log('Error in finding user --> Passport');
            return done(err);            
        }
        return done(null, user);
    })
});

passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
}

passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;