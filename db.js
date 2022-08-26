const mongoose = require('mongoose');
const url = "mongodb+srv://admin:signet=100@signet-tracking.mwwqo1w.mongodb.net/?retryWrites=true&w=majority"
const Scan = require("./models/scan.js");

mongoose.connect(url, () => {
  console.log("connected to mongodb");
}, (error) => console.error("whoops,", error));

async function dbScan(data) {
  const scan = Scan(data)
  await scan.save();
}

async function test() {
  try {
    
  } catch (error) {
    console.log(error.message);
  }
}

// if __name__ == "__main__": (sort of)
if (require.main === module) {
  myMain();
}

module.exports = {test:test, dbScan:dbScan};