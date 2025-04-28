
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/auth/AuthForm";
import { Code } from "lucide-react";

const Register = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Link to="/" className="mx-auto flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold">ChatCode</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign up to start coding collaboratively
          </p>
        </div>
        <AuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
