import React, { useState, useEffect } from "react";
import TextArea from "./TextArea";
import Comments from "./Comments";
import { UserAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";

// Define a new message structure
interface Message {
  text: string;
  senderSocketId: string;
  senderProfilePic: string;
}

interface LiveChatProps {
  roomId?: string; // roomId is optional for the same reason
}

const LiveChat: React.FC<LiveChatProps> = ({ roomId }) => {
  // console.log("Room ID in LiveChat:", roomId);

  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();
  const { user } = UserAuth();

  // useEffect(() => {
  //   console.log("Here is the messages array:", messages);
  // }, [messages]);

  useEffect(() => {
    if (socket && roomId) {
      socket.on("chat message", ({ message }) => {
        // Destructure to get the actual message object
        // console.log("New message received:", message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      // Cleanup
      return () => {
        if (socket) {
          socket.off("chat message");
        }
      };
    }
  }, [socket, roomId]);

  const addMessage = (text: string) => {
    if (socket) {
      const newMessage = {
        text,
        senderSocketId: socket.id,
        senderProfilePic:
          user?.photoURL ||
          "https://cdn.discordapp.com/attachments/421344962303623189/1187062902788739082/9712f93f38758e5bf4318d338a8b64c7.png",
      };
      // console.log("Sending message:", newMessage);
      socket.emit("chat message", { message: newMessage, roomId });
    }
  };

  return (
    <section className="flex flex-col w-3/12 h-full p-6 rounded-md bg-stone-900">
      <div className="flex justify-center w-full mb-6 border-b-2 border-stone-600">
        <h1 className="text-3xl">Live Chat</h1>
      </div>
      <div className="flex flex-col h-full mt-4">
        <div className="flex-1 overflow-y-auto">
          <Comments
            messages={messages}
            currentSocketId={socket ? socket.id : ""} // Provide a default value if socket.id is undefined
          />
        </div>
        <TextArea addMessage={addMessage} />
      </div>
    </section>
  );
};

export default LiveChat;
