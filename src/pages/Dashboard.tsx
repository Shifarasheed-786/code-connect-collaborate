
import { Navbar } from "@/components/layout/Navbar";
import { CreateRoomDialog } from "@/components/rooms/CreateRoomDialog";
import { JoinRoomForm } from "@/components/rooms/JoinRoomForm";
import { RoomsList } from "@/components/rooms/RoomsList";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Create or join a room to start coding collaboratively.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-lg text-center">
                    <h3 className="font-medium mb-2">Create New Room</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Start a new collaborative coding session
                    </p>
                    <CreateRoomDialog />
                  </div>
                  <div className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-lg">
                    <h3 className="font-medium mb-2">Join Existing Room</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter a room ID to join
                    </p>
                    <JoinRoomForm />
                  </div>
                </div>
              </div>
              
              <div>
                <RoomsList />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
