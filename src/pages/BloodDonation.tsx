
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, Clock, Navigation, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for blood donation centers
const mockBloodCenters = [
  {
    id: "1",
    name: "Red Cross Blood Donation Center",
    address: "123 Health Blvd, Los Angeles, CA",
    phone: "(555) 123-4567",
    hours: "Mon-Fri: 8:00 AM - 8:00 PM, Sat-Sun: 10:00 AM - 6:00 PM",
    distance: "0.5 miles",
    appointmentRequired: true,
    acceptsWalkIn: true,
  },
  {
    id: "2",
    name: "LifeStream Blood Bank",
    address: "456 Medical Center Dr, Pasadena, CA",
    phone: "(555) 987-6543",
    hours: "Mon-Fri: 9:00 AM - 7:00 PM, Sat: 9:00 AM - 3:00 PM, Sun: Closed",
    distance: "3.2 miles",
    appointmentRequired: true,
    acceptsWalkIn: false,
  },
  {
    id: "3",
    name: "Community Blood Services",
    address: "789 Charity Lane, Santa Monica, CA",
    phone: "(555) 456-7890",
    hours: "Mon-Thu: 10:00 AM - 6:00 PM, Fri-Sun: 9:00 AM - 5:00 PM",
    distance: "5.7 miles",
    appointmentRequired: false,
    acceptsWalkIn: true,
  },
  {
    id: "4",
    name: "Memorial Hospital Blood Center",
    address: "101 Hospital Way, Glendale, CA",
    phone: "(555) 789-0123",
    hours: "Mon-Fri: 7:00 AM - 7:00 PM, Sat-Sun: 8:00 AM - 4:00 PM",
    distance: "7.1 miles",
    appointmentRequired: true,
    acceptsWalkIn: true,
  },
  {
    id: "5",
    name: "City Blood Drive Center",
    address: "222 Downtown Plaza, Long Beach, CA",
    phone: "(555) 321-6547",
    hours: "Mon-Sun: 8:00 AM - 8:00 PM",
    distance: "10.3 miles",
    appointmentRequired: false,
    acceptsWalkIn: true,
  },
];

const BloodDonationCard = ({ center }) => {
  const { toast } = useToast();
  
  const handleSchedule = () => {
    toast({
      title: "Appointment Request Sent",
      description: `Your appointment request for ${center.name} has been submitted.`,
      duration: 3000,
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900">{center.name}</h3>
        <div className="flex gap-2">
          {center.acceptsWalkIn && (
            <Badge className="bg-medical-green text-white">
              Walk-ins Welcome
            </Badge>
          )}
          {center.appointmentRequired && (
            <Badge variant="outline" className="border-medical-blue text-medical-blue">
              Appointment Available
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-gray-600">
        <div className="flex items-start">
          <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
          <div>
            <p>{center.address}</p>
            <p className="text-sm text-gray-500">{center.distance} away</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Phone size={18} className="mr-2 text-gray-500" />
          <p>{center.phone}</p>
        </div>
        
        <div className="flex items-center">
          <Clock size={18} className="mr-2 text-gray-500" />
          <p className="text-sm">{center.hours}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" className="flex-1 mr-2">
          <Phone size={16} className="mr-2" /> Call
        </Button>
        {center.appointmentRequired ? (
          <Button 
            className="flex-1 bg-medical-red hover:bg-red-600"
            onClick={handleSchedule}
          >
            <Calendar size={16} className="mr-2" /> Schedule
          </Button>
        ) : (
          <Button className="flex-1 bg-medical-blue hover:bg-medical-lightBlue">
            <Navigation size={16} className="mr-2" /> Directions
          </Button>
        )}
      </div>
    </div>
  );
};

const BloodDonation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodCenters, setBloodCenters] = useState(mockBloodCenters);
  const [filter, setFilter] = useState({
    walkIn: false,
  });
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleFilter = () => {
    setFilter(prev => ({ walkIn: !prev.walkIn }));
  };
  
  // Filter centers based on search term and filters
  const filteredCenters = bloodCenters.filter(center => {
    const matchesSearch = center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          center.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWalkIn = filter.walkIn ? center.acceptsWalkIn : true;
    
    return matchesSearch && matchesWalkIn;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Donation Centers</h1>
            <p className="text-gray-600">
              Find blood donation centers near you and schedule an appointment to donate.
            </p>
          </div>
          
          {/* Search and filter */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-full md:w-2/3 relative">
                <Search size={18} className="absolute top-3 left-3 text-gray-400" />
                <Input
                  placeholder="Search by name or location"
                  className="pl-10"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <Button
                variant="outline"
                className={`w-full md:w-auto ${filter.walkIn ? "bg-medical-red text-white border-medical-red" : ""}`}
                onClick={toggleFilter}
              >
                Walk-ins Only
              </Button>
              
              <Button className="w-full md:w-auto bg-medical-blue hover:bg-medical-lightBlue">
                <MapPin size={16} className="mr-2" /> Use My Location
              </Button>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Blood Donation Guidelines</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                <li>You must be at least 18 years old to donate blood.</li>
                <li>You must weigh at least 110 pounds (50 kg).</li>
                <li>You should be in good general health and feeling well.</li>
                <li>You must wait at least 8 weeks between whole blood donations.</li>
              </ul>
            </div>
          </div>
          
          {/* Blood donation centers list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
                <BloodDonationCard key={center.id} center={center} />
              ))
            ) : (
              <div className="col-span-2 py-16 text-center">
                <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-gray-800 mb-2">No donation centers found</h3>
                <p className="text-gray-600">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BloodDonation;
