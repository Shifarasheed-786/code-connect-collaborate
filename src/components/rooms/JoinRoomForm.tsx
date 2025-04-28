
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function JoinRoomForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomId.trim()) {
      toast({
        title: "Room ID required",
        description: "Please provide a room ID to join.",
        variant: "destructive",
      });
      return;
    }

    setIsJoining(true);
    
    try {
      // In a real app with Supabase, we would verify if the room exists
      toast({
        title: "Supabase Connection Required",
        description: "Please connect Supabase to join existing rooms.",
      });
      
      // Navigate to the room
      setTimeout(() => {
        navigate(`/room/${roomId}`);
        setRoomId("");
        setIsJoining(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error joining room",
        description: "Room not found or you don't have permission to join.",
        variant: "destructive",
      });
      setIsJoining(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Join Existing Room</CardTitle>
        <CardDescription>Enter a room ID to join an existing coding session.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleJoinRoom} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="room-id">Room ID</Label>
            <Input
              id="room-id"
              placeholder="Enter room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" disabled={isJoining}>
            {isJoining ? "Joining..." : "Join Room"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
