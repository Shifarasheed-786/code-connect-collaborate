
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
      // Generate a mock UUID for this demo
      // In a real app with Supabase, this would be created by Supabase
      const mockRoomId = crypto.randomUUID();
      
      toast({
        title: "Supabase Connection Required",
        description: "Please connect Supabase to create persistent rooms.",
      });
      
      // Navigate to the new room
      setTimeout(() => {
        navigate(`/room/${mockRoomId}`, { state: { roomName } });
        setOpen(false);
        setRoomName("");
        setIsCreating(false);
      }, 1000);
    } catch (error) {
      console.error("Error creating room:", error);
      toast({
        title: "Error creating room",
        description: "There was an error creating your room. Please try again.",
        variant: "destructive",
      });
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
