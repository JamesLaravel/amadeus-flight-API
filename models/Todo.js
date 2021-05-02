const mongoose = require("mongoose")

const Schema = mongoose.Schema;


const TodoSchema = new Schema({

    todo: {
        type: String,
        required: [true, 'Name field is required'],
    }
})

module.exports = new mongoose.model("Todo", TodoSchema);