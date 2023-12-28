// roomHandlers.js

export const handleCreateRoom = (socket, io, activeRooms) => {
  socket.on("create room", () => {
    const roomId = socket.id;
    activeRooms[roomId] = { id: roomId, occupants: 1, players: [socket.id] };
    socket.join(roomId);
    console.log(`Room created: ${roomId}`);
    socket.emit("room created", roomId); // Inform the creator that the room has been created
    io.emit("available rooms", Object.values(activeRooms)); // Emit the list of room objects
  });
};

export const handleJoinRoom = (socket, io, activeRooms) => {
  socket.on("join room", (roomId) => {
    if (activeRooms[roomId] && activeRooms[roomId].occupants < 2) {
      activeRooms[roomId].occupants++;
      activeRooms[roomId].players.push(socket.id);
      socket.join(roomId);

      // Broadcast to the room that a new player has joined
      socket.to(roomId).emit("player joined", socket.id);

      // Find the enemy's socket ID (the one that's not the current socket)
      const enemyId = activeRooms[roomId].players.find(
        (id) => id !== socket.id
      );
      const enemySocket = io.sockets.sockets.get(enemyId);

      // If enemy is found, emit their info to the current socket
      if (enemySocket) {
        const enemyInfo = {
          id: enemyId,
          photoURL: enemySocket.photoURL, // Replace with actual way to retrieve photoURL
          // ...any other info you want to send
        };
        socket.emit("enemy info", enemyInfo);

        console.log(enemyInfo);
      }

      // Tell both players in the room to start the game
      io.in(roomId).emit("start game", roomId);

      // Update all clients with the new list of rooms
      io.emit(
        "available rooms",
        Object.values(activeRooms).filter((room) => room.occupants < 2)
      );
    } else {
      socket.emit("room full", roomId);
    }
  });
};
