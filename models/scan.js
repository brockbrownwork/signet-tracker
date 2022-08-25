const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const scanSchema = new Schema({
    upc : {
        type: String,
        required: true,
        minLength: 4
    },
    location : {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now()
    },
    comments: {
        type: String
    }
});

scanSchema.methods.sayHi = function() {
    console.log(`Hi, my upc is ${this.upc}. I was scanned at ${this.created} at ${this.location}. ${this.comments? this.comments: ''}`);
}

module.exports = model("Scan", scanSchema);