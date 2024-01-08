const socketIO = require("socket.io");

let io;

function setupSocketIO(server) {
  io = socketIO(server);

  io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("myEvent", (data) => {
      console.log(socket.id);
      console.log("Received data from client:", data);
      // You can perform any desired actions here
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  return io;
}

module.exports = { setupSocketIO };
