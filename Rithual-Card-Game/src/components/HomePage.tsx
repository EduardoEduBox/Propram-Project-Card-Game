import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

interface Room {
  id: string;
  occupants: number;
}

const HomePage: React.FC = () => {
  const { user, handleSignIn, handleSignOut } = UserAuth();
  const navigate = useNavigate();
  const socket = useSocket();
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);

  // Inside your HomePage component

  useEffect(() => {
    if (socket) {
      socket.on("available rooms", (availableRooms: Room[]) => {
        // Make sure that availableRooms is indeed an array
        if (Array.isArray(availableRooms)) {
          setRooms(availableRooms);
        } else {
          // If not, log an error or handle it appropriately
          console.error("availableRooms is not an array:", availableRooms);
        }
      });

      socket.on("start game", (roomId: string) => {
        navigate(`/match/${roomId}`);
      });

      socket.emit("request rooms");

      return () => {
        socket.off("available rooms");
        socket.off("start game");
      };
    }
  }, [socket, navigate]);

  const handleFindMatch = () => {
    // This function no longer needs to be async
    setShowRooms(true);
  };

  const handleCreateRoom = () => {
    socket?.emit("create room");
  };

  const handleJoinRoom = (roomId: string) => {
    socket?.emit("join room", roomId);
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen text-white"
      style={{
        backgroundImage: `url(backgrounds/SingerBackground.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute z-10 w-screen h-screen bg-black bg-opacity-70"></div>
      {/* Title */}
      <div className="z-20 flex flex-col items-center justify-center">
        <h1 className="mb-8 text-4xl font-bold">Rithual Card Game</h1>

        {user ? (
          <>
            <button
              onClick={handleFindMatch}
              className="px-6 py-3 mb-4 transition-transform duration-200 transform bg-purple-700 rounded-lg shadow-md hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Find Match
            </button>

            <button
              onClick={handleSignOut}
              className="px-6 py-3 mb-4 transition-transform duration-200 transform bg-red-700 rounded-lg shadow-md hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={handleSignIn}
            className="px-6 py-3 mb-4 transition-transform duration-200 transform bg-purple-700 rounded-lg shadow-md hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        )}
        {/* Room Selection UI */}
        {showRooms && (
          <div className="absolute z-30 flex flex-col items-center justify-center w-1/2 p-5 bg-gray-900 rounded-lg shadow-xl">
            <h2 className="mb-5 text-2xl font-bold">Available Rooms</h2>
            {rooms.length === 0 ? (
              <p>No rooms available. Create a new one!</p>
            ) : (
              rooms.map((room, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full p-2 mb-2 border-b"
                >
                  <span>Room {index + 1}</span>
                  <span>{room.occupants} / 2</span>
                  <button
                    onClick={() => handleJoinRoom(room.id)}
                    className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Enter
                  </button>
                </div>
              ))
            )}
            <button
              onClick={handleCreateRoom}
              className="px-6 py-3 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Create Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
