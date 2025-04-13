
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PharmacySearch from "@/components/pharmacy/PharmacySearch";
import PharmacyCard, { PharmacyProps } from "@/components/pharmacy/PharmacyCard";
import { Loader2, MapPin, List, MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

// Mock data for demo purposes
const mockPharmacies: PharmacyProps[] = [
  {
    id: "1",
    name: "MediCare Pharmacy",
    address: "123 Health Street, Medville, CA 90210",
    distance: "0.8 miles",
    phone: "(555) 123-4567",
    hours: "8:00 AM - 9:00 PM",
    isOpen: true,
    hasDelivery: true,
  },
  {
    id: "2",
    name: "QuickRx Pharmacy",
    address: "456 Wellness Avenue, Careville, CA 90211",
    distance: "1.2 miles",
    phone: "(555) 987-6543",
    hours: "9:00 AM - 7:00 PM",
    isOpen: true,
    hasDelivery: false,
  },
  {
    id: "3",
    name: "HealthPoint Drugs",
    address: "789 Recovery Road, Welltown, CA 90212",
    distance: "2.5 miles",
    phone: "(555) 456-7890",
    hours: "8:00 AM - 10:00 PM",
    isOpen: true,
    hasDelivery: true,
  },
  {
    id: "4",
    name: "Community Pharmacy",
    address: "321 Main Street, Downtown, CA 90213",
    distance: "3.1 miles",
    phone: "(555) 789-0123",
    hours: "8:00 AM - 6:00 PM",
    isOpen: false,
    hasDelivery: false,
  },
  {
    id: "5",
    name: "24/7 MediHelp",
    address: "555 Emergency Lane, Helpville, CA 90214",
    distance: "4.3 miles",
    phone: "(555) 321-6547",
    hours: "Open 24 hours",
    isOpen: true,
    hasDelivery: true,
  },
];

const Pharmacies = () => {
  const [loading, setLoading] = useState(false);
  const [pharmacies, setPharmacies] = useState<PharmacyProps[]>(mockPharmacies);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filter, setFilter] = useState({
    openNow: false,
    hasDelivery: false,
  });
  
  const handleSearch = (location: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For now, just using mock data
      // In a real app, this would filter based on the location
      console.log("Searching for pharmacies in:", location);
      
      setLoading(false);
    }, 1500);
  };
  
  const handleUseCurrentLocation = () => {
    setLoading(true);
    
    // Simulate getting current location and API call
    setTimeout(() => {
      console.log("Using current location to find pharmacies");
      setLoading(false);
    }, 1500);
  };

  const toggleFilter = (key: keyof typeof filter) => {
    setFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  
  // Apply filters to pharmacies
  const filteredPharmacies = pharmacies.filter((pharmacy) => {
    if (filter.openNow && !pharmacy.isOpen) return false;
    if (filter.hasDelivery && !pharmacy.hasDelivery) return false;
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Pharmacies Near You</h1>
            <p className="text-gray-600">
              Search for pharmacies by location, check operating hours, and get directions.
            </p>
          </div>
          
          <PharmacySearch 
            onSearch={handleSearch}
            onUseCurrentLocation={handleUseCurrentLocation}
          />
          
          {/* Filter and view toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex space-x-4 mb-4 sm:mb-0">
              <Toggle
                pressed={filter.openNow}
                onPressedChange={() => toggleFilter("openNow")}
                className="data-[state=on]:bg-medical-blue data-[state=on]:text-white"
              >
                Open Now
              </Toggle>
              <Toggle
                pressed={filter.hasDelivery}
                onPressedChange={() => toggleFilter("hasDelivery")}
                className="data-[state=on]:bg-medical-blue data-[state=on]:text-white"
              >
                Has Delivery
              </Toggle>
            </div>
            
            <div className="flex items-center space-x-2 bg-white rounded-md border">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                className={viewMode === "list" ? "bg-medical-blue text-white" : ""}
                onClick={() => setViewMode("list")}
                size="sm"
              >
                <List size={18} className="mr-1" /> List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                className={viewMode === "map" ? "bg-medical-blue text-white" : ""}
                onClick={() => setViewMode("map")}
                size="sm"
              >
                <MapIcon size={18} className="mr-1" /> Map
              </Button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-medical-blue" />
              <span className="ml-2 text-lg text-gray-600">Searching for pharmacies...</span>
            </div>
          ) : viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPharmacies.length > 0 ? (
                filteredPharmacies.map((pharmacy) => (
                  <PharmacyCard key={pharmacy.id} {...pharmacy} />
                ))
              ) : (
                <div className="col-span-2 py-16 text-center">
                  <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">No pharmacies found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search criteria or filters.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-200 rounded-lg h-[60vh] flex items-center justify-center">
              <div className="text-center p-8">
                <MapIcon size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">Map View</h3>
                <p className="text-gray-600 mb-4">
                  Map integration will be available in the next update.
                </p>
                <Button
                  onClick={() => setViewMode("list")}
                  className="bg-medical-blue hover:bg-medical-lightBlue"
                >
                  Switch to List View
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pharmacies;
