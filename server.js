const io = require('socket.io')({
  cors: {
    origin: ['http://localhost:3000']
  }
});

io.on('connection', socket => {
  console.log(`connect: ${socket.id}`);

  socket.on('hello!', () => {
    console.log(`hello from ${socket.id}`);
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.listen(3001);

let randomMessages = [
  "Hey!",
  "Buddy!",
  "*whistle*"
]

setInterval(() => {
  let randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
  io.emit('message', randomMessage);
}, 1000);
