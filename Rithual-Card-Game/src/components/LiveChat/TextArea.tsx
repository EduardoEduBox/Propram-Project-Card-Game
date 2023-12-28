import React, { useState } from "react"; // Ensure React is imported in this file
import { BsFillSendFill } from "react-icons/bs";

interface TextAreaProps {
  addMessage: (message: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ addMessage }) => {
  const [message, setMessage] = useState("");

  const onSendMessage = () => {
    if (message) {
      addMessage(message); // This will also emit the message to the server
      setMessage(""); // Clear the text area after message is sent
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Check if Enter is pressed without the Shift key
      event.preventDefault(); // Prevents the default action (new line)
      onSendMessage(); // Invoke onSendMessage as a function
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSendMessage();
        }}
        className="flex"
      >
        <textarea
          onKeyDown={handleKeyPress} // Use onKeyDown instead of onKeyPress
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          cols={30}
          rows={4}
          className="w-full p-2 rounded-md resize-none bg-stone-700"
          placeholder="Type something to demotivate your opponent!"
        ></textarea>
        <button type="submit">
          <BsFillSendFill className="w-auto h-8 ml-5 text-stone-300" />
        </button>
      </form>
    </>
  );
};

export default TextArea;

/*
IMPORTANT NOTE: since we are rendering the messages that you sent in the frontend, we want to
omit the same message in the server, otherwise we would have duplicated messages sent by you
*/
