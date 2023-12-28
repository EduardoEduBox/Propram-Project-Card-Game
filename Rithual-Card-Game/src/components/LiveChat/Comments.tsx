import React, { useRef, useEffect } from "react";

interface Message {
  text: string;
  senderSocketId: string;
  senderProfilePic: string; // Add this
}

interface CommentsProps {
  messages: Message[];
  currentSocketId: string; // Add this line
}

const Comments: React.FC<CommentsProps> = ({ messages, currentSocketId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom every time messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="overflow-y-auto max-h-[37.5rem]">
      {messages.map((message, index) => {
        console.log("Message:", message, "Current Socket ID:", currentSocketId); // Debugging statement

        return (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.senderSocketId === currentSocketId ? "justify-end" : ""
            }`}
          >
            {message.senderSocketId !== currentSocketId && (
              // Display other user's image on the left for received messages
              <img
                src={message.senderProfilePic}
                alt="user"
                className="flex-shrink-0 w-10 h-10 mr-2 rounded-full"
              />
            )}
            <div
              className={`p-2 rounded-md ${
                message.senderSocketId === currentSocketId
                  ? "bg-blue-500"
                  : "bg-stone-600"
              }`}
            >
              <p className="text-white">{message.text}</p>
            </div>
            {message.senderSocketId === currentSocketId && (
              // Display current user's image on the right for sent messages
              <img
                src={message.senderProfilePic}
                alt="user"
                className="flex-shrink-0 w-10 h-10 ml-2 rounded-full"
              />
            )}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Comments;
