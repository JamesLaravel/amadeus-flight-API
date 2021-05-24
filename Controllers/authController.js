const User = require("../models/user");
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');

const bodyValidate = (req, res)=> {

    const result = validationResult(req);

    const hasErrors = !result.isEmpty();

    if(hasErrors){

        return res.status(422).json({
            statusCode: 0,
            message: 'Invalid body requres',
            errors: result.array({onlyFirstError: true})
        })
    }
}

exports.register = async (req, res, next) => {

    bodyValidate(req, res);

    try {

        const  {firstname, lastname, email, password } = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error: {
                message:'Email already in use!',
                status_code:0
            }});
        }
        const newUser = new User({firstname, lastname, email, password});
        await newUser.save();
        const token = getSignedToken(newUser);
        res.status(200).json({status_code: 1, message: 'user creation successfull', token:token});
        
    } catch (error) {

        error.status = 400;

        next(error);
       
    }

  
    
    
};


exports.login = async (req, res, next)=> {

    bodyValidate(req, res);

    try {

        const {email, password } = req.body;
        const user = await User.findOne({email});
        if(user == null){
            return res.status(400).json({status_code: 0, message: 'invalid email/password'});
        }

        const isValid = await user.isPasswordValid(password);

        if(!isValid){
            return res.status(400).json({status_code:0, message: "Invalid credentials"});
        }
        const token = getSignedToken(user);

        res.status(200).json({
            status_code: 1,
            message: "User login successfull",
            token: token
        });   

    } catch (error) {
        error.status = 400;

        next(error);
        
    }

};

getSignedToken = user => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname
    }, process.env.JWTSECRET_KEY, {
        expiresIn:process.env.JWT_EXP
    })
}