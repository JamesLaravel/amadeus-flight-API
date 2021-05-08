const User = require("../models/user");

exports.register = async (req, res, next) => {
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
    res.status(200).json({message: 'user creation successfull'});
};


exports.login = async (req, res, next)=> {

    const {email, firstname } = req.body;
    const user = await User.findOne({email});

    if(user == null){
        return res.status(400).json({erro: { message: 'invalid email/password'}});
    }

    if(password !== user.password){

    }
    res.send('Handle login');   
};