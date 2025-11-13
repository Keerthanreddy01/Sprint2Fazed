import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C] flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Mail className="h-12 w-12 text-primary mr-2" />
        </div>
        <h1 className="text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-white/70 mb-8">Oops! Page not found</p>
        <Button 
          onClick={() => navigate("/")} 
          className="bg-primary hover:bg-primary/90 text-white"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
