
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// This is a simplified auth guard for demo purposes
// In a real application with Supabase, we would check the user's authentication status
// For now, we'll simulate being logged in
const DEMO_LOGGED_IN = true;

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app with Supabase, check if user is authenticated
    if (!DEMO_LOGGED_IN) {
      toast({
        title: "Authentication required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);
  
  if (!DEMO_LOGGED_IN) {
    return null;
  }
  
  return <>{children}</>;
};

export default AuthGuard;
