
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data for rooms - in a real app, this would come from Supabase
const mockRooms = [
  { id: "1", name: "JavaScript Basics", createdAt: "2025-04-27T18:00:00Z" },
  { id: "2", name: "React Hooks Workshop", createdAt: "2025-04-28T09:30:00Z" },
  { id: "3", name: "Algorithm Challenge", createdAt: "2025-04-28T14:15:00Z" },
];

export function RoomsList() {
  const navigate = useNavigate();
  
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

  const handleJoinRoom = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Rooms</h2>
      {mockRooms.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            No rooms created yet.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{room.name}</CardTitle>
                <CardDescription>{formatDate(room.createdAt)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm">
                  <span className="text-muted-foreground">ID: {room.id}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="default" className="w-full" 
                  onClick={() => handleJoinRoom(room.id)}>
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
