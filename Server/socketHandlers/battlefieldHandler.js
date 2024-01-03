// gameHandlers.js
export const handleBattlefieldUpdates = (socket) => {
  socket.on("place card on battlefield", ({ roomId, card, position }) => {
    console.log("Received card placement for roomId:", roomId);
    console.log("Card:", card, "Position:", position);

    // Notify the opponent about the update
    socket.in(roomId).emit("opponent placed card", { card, position });
  });
};
