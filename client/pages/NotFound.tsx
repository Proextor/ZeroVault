import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-8 rounded-lg max-w-md text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto" />
        <h1 className="text-3xl font-bold text-foreground">Page Not Found</h1>
        <p className="text-muted-foreground">
          This page hasn't been implemented yet. Continue prompting to add more features!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 rounded-lg bg-cyan-glow text-background font-medium hover:shadow-glow-cyan transition-all"
        >
          Return to Command Center
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
