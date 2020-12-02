const mongoose = require("mongoose");
const Schema = require("mongoose");

const userSchema = mongoose.Schema({
    _id: {type: Schema.ObjectId, auto: true},
    name: {
        type: String,
        unique : true,
        required: [true, "The name cannot be blank."],
        maxlength: [50, "User Name Is To Long !"]
    },
    banner: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String,
        maxlength: [500, "User Name Is To Long !"]
    },
    rol: {
        type: String,
        enum : ['user','admin','artist'],
        default: 'user'
    },
    graffitis: [{
        graffiti_id: mongoose.Schema.ObjectId,
        title: String,
        date: Date,
        location: {lon: Number, lat: Number},
        image: String,
        state: String,
        tags: [String]
    }],
    experience:{
        type: Number,
        default: 0,
        required: [true, "The experience cannot be blank."],
        min: 0,
    }


});

module.exports = mongoose.model("User",userSchema);
