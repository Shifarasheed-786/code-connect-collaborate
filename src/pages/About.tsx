
import { Navbar } from "@/components/layout/Navbar";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">About ChatCode</h1>
              <p className="mt-4 text-xl text-gray-400">
                A collaborative coding platform built for teams and educators.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-gray-400">
                ChatCode was created to make collaborative coding accessible to everyone. We believe that
                learning and building together leads to better code and stronger teams. Our platform
                enables real-time collaboration, code execution, and communication in a single, unified interface.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Features</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-400">
                <li>
                  <strong>Real-time Collaboration:</strong> Work on code simultaneously with team members from anywhere in the world.
                </li>
                <li>
                  <strong>Multi-language Support:</strong> Write and run code in JavaScript, Python, C++, Java, and more.
                </li>
                <li>
                  <strong>Live Chat:</strong> Communicate with your team without leaving the coding environment.
                </li>
                <li>
                  <strong>Code Execution:</strong> Run your code with custom inputs and see the output immediately.
                </li>
                <li>
                  <strong>Room Management:</strong> Create and join rooms with unique IDs for different projects or sessions.
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Who Can Benefit</h2>
              <div className="space-y-2 text-gray-400">
                <p>
                  <strong>Development Teams:</strong> Collaborate on code reviews, pair programming, and debugging sessions in real-time.
                </p>
                <p>
                  <strong>Educators and Students:</strong> Perfect for teaching programming concepts, conducting live coding demonstrations, and helping students with their code.
                </p>
                <p>
                  <strong>Interview Processes:</strong> Conduct technical interviews with a shared coding environment.
                </p>
                <p>
                  <strong>Hackathons:</strong> Ideal for distributed teams working together during hackathons or coding competitions.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Technology Stack</h2>
              <p className="text-gray-400">
                ChatCode is built using modern web technologies including React, TypeScript, and Tailwind CSS
                for the frontend, with Supabase powering our backend infrastructure for real-time data synchronization,
                authentication, and database management.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Get Started</h2>
              <p className="text-gray-400">
                Ready to start coding collaboratively? Create an account, make a room, and invite your team.
                It's that simple to begin collaborating!
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ChatCode. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default About;
