
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type AuthFormProps = {
  onSuccess?: () => void;
};

export function AuthForm({ onSuccess }: AuthFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    // This would be replaced with actual authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Authentication Required",
      description: "Please connect Supabase to enable authentication features.",
    });
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    // This would be replaced with actual authentication
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Authentication Required",
      description: "Please connect Supabase to enable authentication features.",
    });
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <Tabs defaultValue="login">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent>
          <TabsContent value="login">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full" disabled={isLoading}>
                Login
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleGithubLogin} disabled={isLoading}>
                  GitHub
                </Button>
                <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading}>
                  Google
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="register">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button className="w-full" disabled={isLoading}>
                Register
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleGithubLogin} disabled={isLoading}>
                  GitHub
                </Button>
                <Button variant="outline" onClick={handleGoogleLogin} disabled={isLoading}>
                  Google
                </Button>
              </div>
            </div>
          </TabsContent>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </CardFooter>
      </Tabs>
    </Card>
  );
}
