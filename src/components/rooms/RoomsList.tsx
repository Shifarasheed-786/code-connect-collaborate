
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Room = {
  id: string;
  name: string;
  created_at: string;
};

export function RoomsList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setRooms(data || []);
      } catch (error: any) {
        console.error("Error fetching rooms:", error);
        toast({
          title: "Error fetching rooms",
          description: "There was a problem loading your rooms.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchRooms();
    
    // Set up real-time subscription
    const roomsSubscription = supabase
      .channel('public:rooms')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rooms' }, (payload) => {
        console.log('Room change received!', payload);
        fetchRooms(); // Refresh rooms when there are changes
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(roomsSubscription);
    };
  }, [toast]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleJoinRoom = (roomId: string, roomName: string) => {
    navigate(`/room/${roomId}`, { state: { roomName } });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Rooms</h2>
      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center">
              <div className="animate-pulse h-4 bg-secondary w-3/4 rounded"></div>
            </div>
          </CardContent>
        </Card>
      ) : rooms.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No rooms created yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{room.name}</CardTitle>
                <CardDescription>{formatDate(room.created_at)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground line-clamp-1">ID: {room.id}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full" 
                  onClick={() => handleJoinRoom(room.id, room.name)}>
                  Join Room
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
