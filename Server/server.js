import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import { handleChatMessage } from "./socketHandlers/chatMessages.js";
import { handleCreateRoom, handleJoinRoom } from "./socketHandlers/rooms.js";

const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store active rooms
let activeRooms = {};

io.on("connection", (socket) => {
  console.log(`New client connected, ID: ${socket.id}`);

  // Emit the list of available rooms to the client
  socket.emit("available rooms", activeRooms);

  // handlle chat messages
  handleChatMessage(socket, io, activeRooms);

  handleCreateRoom(socket, io, activeRooms);
  handleJoinRoom(socket, io, activeRooms);

  // handle game logic by implementing the turns for each player using socket.io
  socket.on("turn", (turn) => {
    // Broadcast the turn to the other player
    socket.to(turn.roomId).emit("turn", turn);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    // Remove the room if the creator leaves
    if (activeRooms[socket.id]) {
      delete activeRooms[socket.id];
      io.emit("available rooms", activeRooms);
    }
    console.log(`Client disconnected, ID: ${socket.id}`);
  });
});

instrument(io, { auth: false });
