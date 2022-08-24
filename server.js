const {test} = require("./db.js");

test();

const io = require('socket.io')({
  cors: {
    origin: '*'
  }
});

io.on('connection', socket => {
  console.log(`user connected to server: ${socket.id}`);

  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });

  socket.on('scan', (upc) => {
    console.log("scan received:", upc);
  });
});

io.listen(3001);

let randomMessages = [
  "Hey!",
  "Buddy!",
  "*whistle*",
  "Yoo-hoo!"
]

setInterval(() => {
  let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  io.emit('bulletinBoard', randomMessage);
}, 5000);
