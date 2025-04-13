
import React from "react";
import { MapPin, Phone, Calendar, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface BloodRequestProps {
  id: string;
  patientName: string;
  bloodType: string;
  unitsNeeded: number;
  hospital: string;
  address: string;
  contactPhone: string;
  urgency: string;
  requiredBy: string;
  createdAt: string;
  status: string;
}

const BloodRequestCard: React.FC<BloodRequestProps> = ({
  id,
  patientName,
  bloodType,
  unitsNeeded,
  hospital,
  address,
  contactPhone,
  urgency,
  requiredBy,
  createdAt,
  status,
}) => {
  // Helper function to get badge styling based on urgency
  const getUrgencyBadge = () => {
    switch (urgency) {
      case "critical":
        return "bg-medical-red animate-pulse-gentle";
      case "urgent":
        return "bg-orange-500";
      default:
        return "bg-yellow-500";
    }
  };

  // Helper function to get status badge styling
  const getStatusBadge = () => {
    switch (status) {
      case "fulfilled":
        return "bg-medical-green";
      case "pending":
        return "bg-yellow-500";
      case "verified":
        return "bg-medical-blue";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-medical-red">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-gray-900">{patientName}</h3>
        <div className="flex space-x-2">
          <Badge className={getUrgencyBadge()}>
            {urgency === "critical" && <AlertCircle size={14} className="mr-1" />}
            {urgency.charAt(0).toUpperCase() + urgency.slice(1)}
          </Badge>
          <Badge className={getStatusBadge()}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="flex items-center justify-center bg-red-50 rounded-lg p-3">
          <div className="text-center">
            <span className="block text-2xl font-bold text-medical-red">{bloodType}</span>
            <span className="text-xs text-gray-500">Blood Type</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center bg-blue-50 rounded-lg p-3">
          <div className="text-center">
            <span className="block text-2xl font-bold text-medical-blue">{unitsNeeded}</span>
            <span className="text-xs text-gray-500">Units Needed</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2 text-gray-600 text-sm">
        <div className="flex items-start">
          <MapPin size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-500" />
          <div>
            <p className="font-medium">{hospital}</p>
            <p className="text-gray-500">{address}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Phone size={16} className="mr-2 text-gray-500" />
          <p>{contactPhone}</p>
        </div>
        
        <div className="flex items-center">
          <Calendar size={16} className="mr-2 text-gray-500" />
          <p>Required by {new Date(requiredBy).toLocaleDateString()}</p>
        </div>
        
        <div className="flex items-center">
          <Clock size={16} className="mr-2 text-gray-500" />
          <p>Posted {new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" className="flex-1 mr-2">
          <Phone size={16} className="mr-2" /> Contact
        </Button>
        <Button className="flex-1 bg-medical-red hover:bg-red-600">
          I Want to Donate
        </Button>
      </div>
    </div>
  );
};

export default BloodRequestCard;
