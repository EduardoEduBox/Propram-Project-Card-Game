// roomHandlers.js
import { startGameAndDistributeCards } from "../allCards/shuffledCards.js";
import { initializeTurnLogic } from "./turns.js";
import { initializePlayerLives } from "./lifeHandler.js";

export const handleCreateRoom = (socket, io, activeRooms) => {
  socket.on("create room", () => {
    const roomId = socket.id + "-Rithual-Card-Game";
    activeRooms[roomId] = { id: roomId, occupants: 1, players: [socket.id] };
    socket.join(roomId);
    console.log(`Room created: ${roomId}`);
    socket.emit("room created", roomId); // Inform the creator that the room has been created
    io.emit("available rooms", Object.values(activeRooms)); // Emit the list of room objects
  });
};

export const handleJoinRoom = (socket, io, activeRooms) => {
  socket.on("join room", (roomId) => {
    // After both players have joined:
    console.log(`Both players are in room: ${roomId}`);

    if (activeRooms[roomId] && activeRooms[roomId].occupants < 2) {
      activeRooms[roomId].occupants++;
      activeRooms[roomId].players.push(socket.id);
      socket.join(roomId);

      if (activeRooms[roomId].occupants === 2) {
        // Assuming activeRooms[roomId].players[0] is player1's ID and activeRooms[roomId].players[1] is player2's ID
        const player1Id = activeRooms[roomId].players[0];
        const player2Id = activeRooms[roomId].players[1];

        startGameAndDistributeCards(io, roomId, activeRooms);
        initializeTurnLogic(roomId, activeRooms, io);

        // Initialize player lives with specific player IDs
        initializePlayerLives(io, roomId, player1Id, player2Id);

        socket.on("send user photo", ({ roomId, photoURL }) => {
          // Forward the photo URL to the other player in the room
          const enemyId = activeRooms[roomId].players.find(
            (id) => id !== socket.id
          );
          io.to(enemyId).emit("enemy profile", { photoURL, id: socket.id });
        });
      }

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
