
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function CreateRoomDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomName.trim()) {
      toast({
        title: "Room name required",
        description: "Please provide a name for your room.",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("You must be logged in to create a room");
      }
      
      // Create the room in Supabase
      const { data: room, error } = await supabase
        .from('rooms')
        .insert({
          name: roomName,
          user_id: user.id
        })
        .select()
        .single();
      
      if (error) throw error;
      
      toast({
        title: "Room created",
        description: `${roomName} has been created successfully.`,
      });
      
      // Navigate to the new room
      navigate(`/room/${room.id}`, { state: { roomName } });
      setOpen(false);
      setRoomName("");
    } catch (error: any) {
      console.error("Error creating room:", error);
      toast({
        title: "Error creating room",
        description: error.message || "There was an error creating your room. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg">Create Room</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Room</DialogTitle>
          <DialogDescription>
            Create a collaborative coding room to share with others.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateRoom}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="room-name">Room Name</Label>
              <Input
                id="room-name"
                placeholder="My Coding Room"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
