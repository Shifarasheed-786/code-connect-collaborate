
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex items-center space-x-2">
                <Code className="h-12 w-12 text-primary" />
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  ChatCode
                </h1>
              </div>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
                Collaborative coding platform where you can code, run, and share with friends in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 18h8" />
                    <path d="M3 22h18" />
                    <path d="M18 16.01V18" />
                    <path d="M18 6V8" />
                    <path d="m18 12-9-4v8Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Real-time Collaboration</h3>
                <p className="text-gray-400">
                  Code together with your team in real-time, just like working side by side.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Multiple Languages</h3>
                <p className="text-gray-400">
                  Support for JavaScript, Python, C++, and more programming languages.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="rounded-full bg-primary/20 p-3">
                  <svg
                    className="h-6 w-6 text-primary"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect height="11" rx="2" ry="2" width="18" x="3" y="11" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure Rooms</h3>
                <p className="text-gray-400">
                  Create private rooms and share with only those you want to collaborate with.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to start coding together?</h2>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed">
                  Join thousands of developers who are already collaborating on ChatCode.
                </p>
              </div>
              <Link to="/login">
                <Button size="lg">Sign Up Free</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ChatCode. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
