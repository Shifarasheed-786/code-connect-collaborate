
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type AuthGuardProps = {
  children: ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        
        if (!data.user) {
          toast({
            title: "Authentication required",
            description: "Please log in to access this page.",
            variant: "destructive",
          });
          navigate("/login");
          setIsAuthenticated(false);
          return;
        }

        console.log("Authenticated user:", data.user);

        // Check if the user has a profile, create one if they don't
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        console.log("Profile data:", profileData, "Error:", profileError);
        
        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create one
          console.log("Creating new profile for user:", data.user.id);
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({ id: data.user.id });
            
          if (insertError) {
            console.error("Error creating profile:", insertError);
          }
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error:", error);
        toast({
          title: "Authentication error",
          description: "There was a problem checking your authentication status.",
          variant: "destructive",
        });
        navigate("/login");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session);
      if (event === 'SIGNED_OUT') {
        navigate("/login");
        setIsAuthenticated(false);
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        
        // We need to use setTimeout to avoid calling Supabase functions
        // directly inside the onAuthStateChange callback
        setTimeout(async () => {
          try {
            // Check if profile exists when user signs in
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            console.log("Profile check on sign in:", profile, profileError);
            
            if (profileError && profileError.code === 'PGRST116') {
              // Create profile if it doesn't exist
              console.log("Creating profile on sign in for user:", session.user.id);
              const { error: insertError } = await supabase
                .from('profiles')
                .insert({ id: session.user.id });
              
              if (insertError) {
                console.error("Error creating profile on sign in:", insertError);
              }
            }
          } catch (error) {
            console.error("Error checking/creating profile:", error);
          }
        }, 0);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, toast]);
  
  if (isAuthenticated === null || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null;
  }
  
  return <>{children}</>;
};

export default AuthGuard;
