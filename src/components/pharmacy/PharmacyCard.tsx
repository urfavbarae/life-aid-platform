
import React from "react";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface PharmacyProps {
  id: string;
  name: string;
  address: string;
  distance?: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  hasDelivery?: boolean;
}

const PharmacyCard: React.FC<PharmacyProps> = ({
  id,
  name,
  address,
  distance,
  phone,
  hours,
  isOpen,
  hasDelivery,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <div>
          <Badge variant={isOpen ? "default" : "outline"} className={isOpen ? "bg-medical-green text-white" : "text-gray-500"}>
            {isOpen ? "Open Now" : "Closed"}
          </Badge>
          {hasDelivery && (
            <Badge variant="outline" className="ml-2 border-medical-blue text-medical-blue">
              Delivery
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-gray-600">
        <div className="flex items-start">
          <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
          <div>
            <p>{address}</p>
            {distance && <p className="text-sm text-gray-500">{distance} away</p>}
          </div>
        </div>
        
        <div className="flex items-center">
          <Phone size={18} className="mr-2 text-gray-500" />
          <p>{phone}</p>
        </div>
        
        <div className="flex items-center">
          <Clock size={18} className="mr-2 text-gray-500" />
          <p>{hours}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" className="flex-1 mr-2">
          <Phone size={16} className="mr-2" /> Call
        </Button>
        <Button className="flex-1 bg-medical-blue hover:bg-medical-lightBlue">
          <Navigation size={16} className="mr-2" /> Directions
        </Button>
      </div>
    </div>
  );
};

export default PharmacyCard;
