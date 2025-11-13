import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    // Check if user exists in localStorage
    const storedUser = localStorage.getItem("nexmail_user");
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email.toLowerCase() === email.trim().toLowerCase()) {
        localStorage.setItem("nexmail_auth", "true");
        toast.success("Successfully logged in!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
        return;
      }
    }

    // If user doesn't exist, create account automatically
    const newUser = {
      id: `user-${Date.now()}`,
      email: email.trim(),
      created_at: new Date().toISOString(),
    };

    localStorage.setItem("nexmail_user", JSON.stringify(newUser));
    localStorage.setItem("nexmail_auth", "true");
    
    toast.success("Account created and logged in!");
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-primary mr-2" />
            <CardTitle className="text-2xl text-white">Nexmail</CardTitle>
          </div>
          <CardTitle className="text-2xl text-white text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center text-white/70">
            Enter your email to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={loading}
            >
              {loading ? "Signing in..." : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-white/70">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
