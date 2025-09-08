import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard
    navigate("/dashboard", { replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg icog-gradient-bg">
            <span className="text-lg font-bold text-white">iC</span>
          </div>
          <span className="text-3xl font-bold icog-text-gradient">
            iCog Sync
          </span>
        </div>
        <p className="text-xl text-muted-foreground">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
