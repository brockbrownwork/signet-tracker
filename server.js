const {dbScan, history} = require("./db.js");

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
    history(upc).then(result => io.to(socket.id).emit("scanHistory", result)) // Seems like this one should work??
  });

  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
    io.to(socket.id).emit("bulletinBoard", "Hello out there!")
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
