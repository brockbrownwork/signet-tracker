const mongoose = require('mongoose');
const url = "mongodb+srv://admin:signet=100@signet-tracking.mwwqo1w.mongodb.net/?retryWrites=true&w=majority"
const User = require("./models/user.js");

mongoose.connect(url, () => {
  console.log("connected to mongodb");
}, (error) => console.error("whoops,", error));

run();
async function run() {
  const brock = await User.create({ name: 'Brock',
                                    age: '27',
                                    hobbies: ["wearing sunglasses",
                                              "not wearing sunglasses"],
                                    address: {
                                      street: '123 Main Street',
                                      city: "Cityville"
                                    }
                                  });
  brock.name = 'Sue';
  await brock.save();

  console.log(brock);
}

const test = () => {
  console.log("import successful");
};

module.exports = {test:test};