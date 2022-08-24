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
                return someEmail.includes('@');
            },
            message: (props) =>  `That email address is no good: ${props.value}`
        }
    },
    age: {
        type: Number,
        min: 1,
        max: 150
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
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

userSchema.methods.sayHi = function() {
    console.log(`Hi, my name is ${this.name}`);
}

module.exports = model("User", userSchema);