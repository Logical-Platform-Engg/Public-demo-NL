const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    owner:{
        type: String,
        required: true,
    },
    instance_name:{
        type: String,
        required: true,
    },
    region:{
        type: String
    },
    zone:{
        type: String,
        required: true,
    },
    machine_type:{
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false, // Default value set to false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const dataModel = mongoose.model("machine", dataSchema);

module.exports = dataModel;
