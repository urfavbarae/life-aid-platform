
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, MapPin, Pill, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
            <Button className="bg-medical-blue hover:bg-medical-lightBlue text-white">
              Emergency
            </Button>
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
          <Button className="bg-medical-blue hover:bg-medical-lightBlue text-white w-full">
            Emergency
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
