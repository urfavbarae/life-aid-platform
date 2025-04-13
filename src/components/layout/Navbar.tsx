
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, MapPin, Pill, Heart, User, AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleEmergency = () => {
    toast({
      title: "Emergency",
      description: "Calling emergency services...",
      variant: "destructive",
      duration: 5000,
    });
  };

  const menuItems = [
    { name: "Find Pharmacies", icon: <MapPin size={18} />, path: "/pharmacies" },
    { name: "Medicine Search", icon: <Pill size={18} />, path: "/medicines" },
    { name: "Blood Donation", icon: <Heart size={18} />, path: "/blood-donation" },
    { name: "Account", icon: <User size={18} />, path: "/account" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-medical-blue">
              Life<span className="text-medical-red">Aid</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-600 hover:text-medical-blue transition-colors"
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-medical-red hover:bg-red-600 text-white font-bold">
                  <AlertOctagon className="mr-2" size={18} />
                  Emergency
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">Emergency Services</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <div className="grid gap-6">
                    <div className="bg-medical-red/10 p-4 rounded-lg">
                      <h3 className="font-bold text-lg mb-2">Call Emergency Number</h3>
                      <p className="mb-4">If this is a life-threatening emergency, please call:</p>
                      <a 
                        href="tel:911" 
                        className="bg-medical-red text-white py-3 px-4 rounded-lg font-bold text-center block hover:bg-red-600 transition-colors"
                        onClick={handleEmergency}
                      >
                        Call 911
                      </a>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-lg mb-2">Other Emergency Services</h3>
                      <div className="grid gap-3">
                        <Button variant="outline" className="justify-start">
                          Find Nearest Hospital
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Poison Control: (800) 222-1222
                        </Button>
                        <Button variant="outline" className="justify-start">
                          Mental Health Crisis: (988)
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 hover:text-medical-blue">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden bg-white absolute w-full shadow-md transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-2 text-gray-600 hover:text-medical-blue p-2 rounded-md hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-medical-red hover:bg-red-600 text-white w-full font-bold">
                <AlertOctagon className="mr-2" size={18} />
                Emergency
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">Emergency Services</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="grid gap-6">
                  <div className="bg-medical-red/10 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Call Emergency Number</h3>
                    <p className="mb-4">If this is a life-threatening emergency, please call:</p>
                    <a 
                      href="tel:911" 
                      className="bg-medical-red text-white py-3 px-4 rounded-lg font-bold text-center block hover:bg-red-600 transition-colors"
                      onClick={handleEmergency}
                    >
                      Call 911
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-2">Other Emergency Services</h3>
                    <div className="grid gap-3">
                      <Button variant="outline" className="justify-start">
                        Find Nearest Hospital
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Poison Control: (800) 222-1222
                      </Button>
                      <Button variant="outline" className="justify-start">
                        Mental Health Crisis: (988)
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
