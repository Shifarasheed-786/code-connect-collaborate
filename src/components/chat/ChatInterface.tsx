
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  user_id?: string;
};

type ChatInterfaceProps = {
  roomId: string;
};

export function ChatInterface({ roomId }: ChatInterfaceProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch existing messages when component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Get the current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch messages for this room
        const { data, error } = await supabase
          .from("messages")
          .select("*, profiles(username)")
          .eq("room_id", roomId)
          .order("created_at", { ascending: true });
        
        if (error) {
          console.error("Error fetching messages:", error);
          toast({
            title: "Error loading messages",
            description: "There was a problem loading the chat history.",
            variant: "destructive",
          });
        } else {
          // Transform the data to match our Message type
          const formattedMessages = data.map((message: any) => ({
            id: message.id,
            sender: message.profiles?.username || "User",
            content: message.content,
            timestamp: new Date(message.created_at),
            user_id: message.user_id,
          }));
          
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("Error in fetchMessages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up realtime subscription for new messages
    const channel = supabase
      .channel('public:messages')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `room_id=eq.${roomId}`
        }, 
        async (payload) => {
          // Get user information for the sender
          const { data } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', payload.new.user_id)
            .single();
          
          const newMessage: Message = {
            id: payload.new.id,
            content: payload.new.content,
            sender: data?.username || 'User',
            timestamp: new Date(payload.new.created_at),
            user_id: payload.new.user_id
          };
          
          setMessages((current) => [...current, newMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId, toast]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to send messages.",
          variant: "destructive",
        });
        return;
      }
      
      // Insert message to Supabase
      const { error } = await supabase
        .from('messages')
        .insert({
          room_id: roomId,
          user_id: user.id,
          content: newMessage.trim()
        });
      
      if (error) {
        throw error;
      }
      
      // Clear the input field
      setNewMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: error.message || "There was a problem sending your message.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Check if user owns this message
  const isOwnMessage = async (userId?: string) => {
    if (!userId) return false;
    const { data } = await supabase.auth.getUser();
    return data.user?.id === userId;
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="py-3 border-b">
        <CardTitle className="text-sm font-medium">Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center text-muted-foreground p-4">
              No messages yet. Start the conversation!
            </div>
          ) : (
            messages.map((message) => (
              <div 
                key={message.id}
                className={`flex flex-col max-w-[80%] ${message.user_id === supabase.auth.getSession().then(({data}) => data.session?.user.id) ? "ml-auto" : ""}`}
              >
                <div className={`rounded-lg p-3 ${
                  message.user_id === supabase.auth.getSession().then(({data}) => data.session?.user.id)
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
            ))
          )}
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
