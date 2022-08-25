const {dbScan, test} = require("./db.js");

const io = require('socket.io')({
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log(`user connected to server: ${socket.id}`);
  
  socket.on('scan', (data) => {
    let {upc, location, date, comments} = data
    console.log("We've got a scan:", data)
    dbScan(data)
  });

  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
  });

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

setInterval(() => {
  let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  io.emit('bulletinBoard', randomMessage);
}, 5000);
