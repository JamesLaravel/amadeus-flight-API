const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: { type: String, required: true},
    lastname : { type: String, required: true},
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        validate:[emailValidator, 'Incorrect email format']
    },
    password: { type: String, required: true}
})

function emailValidator(value){
    return /^.+@.+\..+$/.test(value);
}

module.exports = mongoose.model('User', userSchema);