"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const RoomOpsCard = () => {
  const router = useRouter();
  const [roomCode, setRoomCode] = useState<string>(""); 
  const [showJoinInput, setShowJoinInput] = useState<boolean>(false);

  const handleCreateRoom = () => {
    const newRoomId = uuidv4();
    router.push(`/chat/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      router.push(`/chat/${roomCode.trim()}`);
    }
  };

  const handleRoomCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(e.target.value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-[2vh] justify-center">
          <Button onClick={handleCreateRoom}>Create Room</Button>
          <Button onClick={() => setShowJoinInput(true)}>Join Room</Button>
          {showJoinInput && (
            <div className="flex flex-col gap-y-[1vh] mt-4">
              <input
                type="text"
                value={roomCode}
                onChange={handleRoomCodeChange}
                placeholder="Enter room code"
                className="border p-2"
              />
              <Button onClick={handleJoinRoom}>Join</Button>
              <Button onClick={() => setShowJoinInput(false)}>Cancel</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomOpsCard;
