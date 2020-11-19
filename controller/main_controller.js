const Landlord = require('../models/landlord'); 
const Property = require('../models/property');
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

module.exports.listProperty = function(req, res){
    Landlord.findById(req.params.id, function(err, user){
        if (!user){
            return res.json(402, {
                message: 'Landlord not found'
            })
        }
        Property.create({
            landlord: user,
            room: req.body.room,
            location: req.body.location,
            rent: req.body.rent
        }, function(err, property) {
            if (err){
                console.log(req.body)
                console.log(err);
                return res.json(402, {
                    message: 'Error in creating the property'
                })
            }else{
                user.properties.push(property);
                user.save();
                return res.json(200, {
                    message: 'Property Listed',
                    info: {
                        landlord: property.landlord.name,
                        room: property.room,
                        location: property.location,
                        rent: property.rent
                    }
                })
            }
        })
        console.log()
    })
}

module.exports.allProperties = function(req, res){
    Property.find({}, function(err, properties){
        if (err){
            return res.json(402, {
                message: 'Properies not found'
            })
        }
        return res.json(200, {
            properties: properties
        })
    })
}