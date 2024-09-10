
"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";

const ChatRoom: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<{ name: string; message: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { roomId } = useParams();

  useEffect(() => {
    if (!roomId) return;

    const ws = new WebSocket(`ws://localhost:8080?roomId=${roomId}`);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      ws.send(JSON.stringify({ type: "join", roomId }));
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "message") {
          setMessages((prevMessages) => [...prevMessages, { name: data.name, message: data.message }]);
        } else if (data.type === "info") {
          console.log(data.message);
        }
      } catch (error) {
        setError("Failed to parse message");
        console.error("Error parsing message", error);
      }
    };

    ws.onerror = (event: Event) => {
      setError("WebSocket error occurred");
      console.error("WebSocket error", event);
    };

    ws.onclose = (event: CloseEvent) => {
      setError("WebSocket connection closed");
      console.log("WebSocket connection closed", event);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (socket && input.trim() !== "" && name.trim() !== "") {
      socket.send(JSON.stringify({ type: "message", roomId, message: input, name }));
      setInput("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "300px",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter your name"
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type a message"
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
