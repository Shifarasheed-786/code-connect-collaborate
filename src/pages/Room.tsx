
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/code-editor/CodeEditor";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Separator } from "@/components/ui/separator";
import { Code, Copy, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Room = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [roomName, setRoomName] = useState<string>(
    location.state?.roomName || `Room ${roomId?.substring(0, 8)}`
  );
  
  useEffect(() => {
    if (!roomId) {
      navigate("/dashboard");
      toast({
        title: "Room not found",
        description: "The room you are trying to access does not exist.",
        variant: "destructive",
      });
    }
    
    // In a real app, we'd check with Supabase if the room exists
    // and fetch its details
  }, [roomId, navigate, toast]);

  const copyRoomId = () => {
    if (roomId) {
      navigator.clipboard.writeText(roomId);
      toast({
        title: "Room ID copied",
        description: "Room ID has been copied to clipboard.",
      });
    }
  };

  if (!roomId) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <h1 className="font-semibold">{roomName}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">
              Room ID: <span className="font-mono">{roomId.substring(0, 8)}...</span>
            </div>
            <Button variant="ghost" size="icon" onClick={copyRoomId} className="h-8 w-8">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
          <div className="flex-1 min-w-0 overflow-auto">
            <CodeEditor roomId={roomId} />
          </div>
          
          <div className="w-full md:w-80 lg:w-96 h-80 md:h-auto flex-shrink-0">
            <ChatInterface roomId={roomId} />
          </div>
        </div>
      </div>
      
      <footer className="border-t py-2">
        <div className="container flex items-center justify-between text-xs text-muted-foreground">
          <div>Connected to room</div>
          <div>ChatCode © {new Date().getFullYear()}</div>
        </div>
      </footer>
    </div>
  );
};

export default Room;
