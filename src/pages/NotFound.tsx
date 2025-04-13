
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 flex items-center justify-center">
        <div className="max-w-lg px-4 py-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle size={48} className="text-medical-red" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-medium text-gray-800 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            We're sorry, the page you requested could not be found. 
            It may have been moved, deleted, or never existed.
          </p>
          <Button asChild size="lg" className="bg-medical-blue hover:bg-medical-lightBlue">
            <Link to="/">
              <Home size={18} className="mr-2" /> Return to Home
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
