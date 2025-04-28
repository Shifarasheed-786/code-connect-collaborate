
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
};

type ChatInterfaceProps = {
  roomId: string;
};

// Mock data for demonstration
const mockMessages: Message[] = [
  {
    id: "1",
    sender: "System",
    content: "Welcome to the room! You can collaborate on code and chat here.",
    timestamp: new Date(),
  },
];

export function ChatInterface({ roomId }: ChatInterfaceProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In a real app, this would be sent to Supabase
    const message: Message = {
      id: crypto.randomUUID(),
      sender: "You",
      content: newMessage.trim(),
      timestamp: new Date(),
    };
    
    setMessages([...messages, message]);
    setNewMessage("");
    
    toast({
      title: "Supabase Connection Required",
      description: "Please connect Supabase to enable real-time messaging.",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="py-3 border-b">
        <CardTitle className="text-sm font-medium">Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex flex-col max-w-[80%] ${message.sender === "You" ? "ml-auto" : ""}`}
            >
              <div className={`rounded-lg p-3 ${
                message.sender === "You" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}>
                {message.content}
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <span>{message.sender}</span>
                <span>•</span>
                <span>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t flex gap-2 items-end">
          <Textarea
            className="flex-1 resize-none"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
