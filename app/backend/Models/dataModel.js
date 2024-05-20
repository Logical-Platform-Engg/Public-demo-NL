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
        type: String,
        required: true,
    },
    zone:{
        type: String,
        required: true,
    },
    config:{
        type: String,
        required: true,
    },
    createdAt: {
        type:Date,
        default:Date.now,
    }
});
const dataModel = mongoose.model("machine", dataSchema);
module.exports = dataModel;