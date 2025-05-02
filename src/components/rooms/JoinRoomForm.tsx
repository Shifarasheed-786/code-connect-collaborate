
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

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
      // First check if the user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to join a room");
      }
      
      // Verify if the room exists
      const { data: room, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('id', roomId)
        .single();
      
      if (error) {
        throw new Error("Room not found or you don't have permission to join.");
      }
      
      // Navigate to the room
      navigate(`/room/${roomId}`, { state: { roomName: room.name } });
      setRoomId("");
    } catch (error: any) {
      toast({
        title: "Error joining room",
        description: error.message || "Room not found or you don't have permission to join.",
        variant: "destructive",
      });
    } finally {
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
