
import express from "express";
import { WebSocketServer, WebSocket } from "ws";
import { parse } from "url";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("HTTP server listening on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

const rooms: { [roomId: string]: Set<WebSocket> } = {};

function joinRoom(ws: WebSocket, roomId: string) {
  console.log("Inside Join Room");
  if (!rooms[roomId]) {
    rooms[roomId] = new Set();
  }
  rooms[roomId].add(ws);
}

function broadcastToRoom(roomId: string, message: string, senderWs: WebSocket) {
  console.log("Inside broadcast to room");
  if (rooms[roomId]) {
    rooms[roomId].forEach((client) => {
      if (client !== senderWs && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}

wss.on("connection", function connection(ws, req) {
  console.log("WebSocket connection established");
  const { query } = parse(req.url || "", true);
  const roomId = query.roomId as string;

  console.log(req.url, roomId);

  if (!roomId) {
    ws.send(JSON.stringify({ error: "No room ID provided." }));
    ws.close();
    return;
  }

  joinRoom(ws, roomId);

  ws.on("message", function message(data) {
    try {
      const parsedData = JSON.parse(data.toString());
      if (parsedData.type === "message") {
        const message = JSON.stringify({
          type: "message",
          name: parsedData.name,  // Including the name
          message: parsedData.message,
        });

        broadcastToRoom(roomId, message, ws);
      }
    } catch (error) {
      console.error("Error parsing message", error);
    }
  });

  ws.on("close", () => {
    if (rooms[roomId]) {
      rooms[roomId].delete(ws);
      if (rooms[roomId].size === 0) {
        delete rooms[roomId];
      }
    }
  });

  ws.send(
    JSON.stringify({ type: "info", message: `Connected to room: ${roomId}` })
  );
});

console.log("WebSocket server is running on ws://localhost:8080");
