const mongosse = require('mongoose');
const Schema = mongosse.Schema;


//create geolocation Schema
const GeoSchema = new Schema ({
    type: {
        type: String,
        default: "Point"
    },
    coordinates:{
        type: [Number],
        index:"2dsphere"
    }
});

//create ninja Schema & modal
const NinjaSchema = new Schema({

    name:{
        type: String,
        required: [true, 'Name field is required']
    },
    rank:{
        type:String
    },
    available: {
        type: Boolean,
        default:false
    },
    geometry: GeoSchema
    
});

module.exports =  mongosse.model('ninja', NinjaSchema)