
import React, { useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PharmacySearchProps {
  onSearch: (location: string) => void;
  onUseCurrentLocation: () => void;
}

const PharmacySearch: React.FC<PharmacySearchProps> = ({ onSearch, onUseCurrentLocation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };
  
  const clearSearch = () => {
    setSearchTerm("");
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute top-3 left-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Enter city, address or ZIP code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 h-12"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <Button
            type="submit"
            className="bg-medical-blue hover:bg-medical-lightBlue h-12"
          >
            Search Pharmacies
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onUseCurrentLocation}
            className="flex items-center justify-center h-12"
          >
            <MapPin size={18} className="mr-2" />
            Use my location
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PharmacySearch;
