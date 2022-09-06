const {dbScan, history} = require("./db.js"); // dbScan sends a scan to the database, history requests the scan history of a upc

const io = require('socket.io')({
  cors: {
    origin: '*' // TODO: fix CORS so that it only takes IPs from local
  }
});

io.on('connection', socket => {
  // when a user connects, log it on the server
  console.log(`user connected to server: ${socket.id}`);
  
  // when the server receives a scan, send the scan to the database then return the scan history of that upc
  socket.on('scan', (data) => {
    let {upc, location, date, comments} = data
    console.log("We've got a scan:", data)
    dbScan(data)
    history(upc).then(result => io.to(socket.id).emit("scanHistory", result))
  });

  // this is just a test of the sockets, the user clicks a button that says 'hello' and the server responds
  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
    io.to(socket.id).emit("bulletinBoard", "Hello out there!")
  });

  // when a user disconnects, log it on the server
  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });

});

io.listen(3001);

let randomMessages = [
  "Some announcement",
  "Some other announcement",
  "Another announcement",
  "Test test test test test"
]


// send random messages, this is a test of the bulletin board
let testingBulletinBoard = true
if (testingBulletinBoard) {
setInterval(() => {
  let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  io.emit('bulletinBoard', randomMessage);
}, 5000)
}
