const {
  formatMessage,
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("../controller/chat");

module.exports = function (io) {
  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ username, room }) => {
      const user = userJoin(socket.id, username, room);

      socket.join(user.room);

      socket.emit(
        "message",
        formatMessage("System", "Selamat Datang di Ruang Diskusi")
      );

      socket.broadcast
        .to(user.room)
        .emit(
          "message",
          formatMessage("System", `${user.username} baru gabung nih`)
        );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    });

    socket.on("chatMessage", (msg) => {
      const user = getCurrentUser(socket.id);
      io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    socket.on("disconnect", () => {
      const user = userLeave(socket.id);
      if (user) {
        io.to(user.room).emit(
          "message",
          formatMessage("System", `yahh... ${user.username} pergi :(`)
        );

        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
      }
    });
  });
};
