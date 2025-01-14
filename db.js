const mongoose = require('mongoose');
const url = "mongodb+srv://admin:signet=100@signet-tracking.mwwqo1w.mongodb.net/?retryWrites=true&w=majority"
const Scan = require("./models/scan.js");

mongoose.connect(url, () => {
  console.log("connected to mongodb");
}, (error) => console.error("whoops,", error));

async function dbScan(data) {
  // Scans a upc to the database
  // Data for a scan includes the following:
  // - upc
  // - timestamp
  // - location
  // - comments (should this be its own Schema?)
  //      - also timestamps for those comments
  if (data.upc && data.location) {
  const scan = Scan(data)
  await scan.save();
  }
  else {
    console.log("Received an invalid input, please try again.")
  }
}

function history(upc) {
  // returns the scan history of a upc
  const result = Scan.find({upc: upc}).sort({date: -1})
  return result
}

async function test() {
  try {
    console.log(await history("test1"))
  } catch (error) {
    console.log(error.message);
  }
}

// if __name__ == "__main__": (sort of)
if (require.main === module) {
  test()
}

module.exports = {test:test,
                  dbScan:dbScan,
                  history:history};