const Landlord = require('../models/landlord');
const jwt = require('jsonwebtoken');

module.exports.home = function(req, res){
    return res.json(200, {
        message: 'Server Start'
    })
}

module.exports.create = function(req, res){
    Landlord.findOne({email: req.body.email}, function(err, user){
        if (!user){
            Landlord.create(req.body, function(err, user){
                if (err){
                    console.log("Error in creating the landlord",err); 
                    return res.json(409, {
                        message: 'Error in creating landlord'
                    });
                }else{
                    return res.json(200, {
                        message: "Landlord Signed Up",
                        info: {
                            name: user.name,
                            email: user.email
                        }
                    })
                }

            })
        }else{
            return res.json(409, {
                message: 'Landlord already exists'
            })
        }
    })
}

module.exports.createSession = async function(req, res){
    try{
        let user = await Landlord.findOne({email: req.body.email});
        if (!user || user.password!=req.body.password){
            return res.json(422, {
                message: "Invalid Username/Password"
            })
        }
        return res.json(200, {
            message: "Sign In successful",
            data: {
                token: jwt.sign(user.toJSON(), 'property', {expiresIn: '100000'})
            }
        })
    }catch(err){
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
    
}