const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const addressSchema = new Schema({
    street: String,
    city: String
});

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        minLength: 5,
        validate: {
            validator: (someEmail) => {
                return someEmail.contains('@');
            }
        }
    },
    age: {
        type: Number,
        min: 1,
        max: 150
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = model("User", userSchema);