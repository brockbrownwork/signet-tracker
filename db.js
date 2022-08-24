const mongoose = require('mongoose');
const url = "mongodb+srv://admin:signet=100@signet-tracking.mwwqo1w.mongodb.net/?retryWrites=true&w=majority"
const Scan = require("./models/scan.js");

mongoose.connect(url, () => {
  console.log("connected to mongodb");
}, (error) => console.error("whoops,", error));

async function test() {
  try {
    console.log("Starts here");
    const scan = Scan({
      upc: 'Disco',
      location: 'Stamps 1'
      });
    await scan.save();
    await scan.sayHi();
    console.log(scan);
    console.log("Ends here");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {test:test};