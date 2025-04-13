
import React, { useState } from "react";
import { Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BloodRequestFormProps {
  onSubmit: (formData: BloodRequestData) => void;
}

export interface BloodRequestData {
  patientName: string;
  bloodType: string;
  unitsNeeded: number;
  hospital: string;
  address: string;
  contactPhone: string;
  urgency: string;
  requiredBy: string;
  additionalInfo: string;
}

const BloodRequestForm: React.FC<BloodRequestFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<BloodRequestData>({
    patientName: "",
    bloodType: "",
    unitsNeeded: 1,
    hospital: "",
    address: "",
    contactPhone: "",
    urgency: "normal",
    requiredBy: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Blood Donation Request</CardTitle>
        <CardDescription>
          Fill out this form to request blood donation. All requests will be reviewed and published after verification.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="patientName" className="text-sm font-medium text-gray-700">
                Patient Name
              </label>
              <Input
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="bloodType" className="text-sm font-medium text-gray-700">
                Blood Type
              </label>
              <Select
                value={formData.bloodType}
                onValueChange={(value) => handleSelectChange("bloodType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="unitsNeeded" className="text-sm font-medium text-gray-700">
                Units Needed
              </label>
              <Input
                id="unitsNeeded"
                name="unitsNeeded"
                type="number"
                min="1"
                value={formData.unitsNeeded}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="urgency" className="text-sm font-medium text-gray-700">
                Urgency
              </label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => handleSelectChange("urgency", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="critical">Critical - Within 24 hours</SelectItem>
                  <SelectItem value="urgent">Urgent - Within 3 days</SelectItem>
                  <SelectItem value="normal">Normal - Within a week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="hospital" className="text-sm font-medium text-gray-700">
                Hospital Name
              </label>
              <Input
                id="hospital"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium text-gray-700">
                Hospital Address
              </label>
              <div className="relative">
                <MapPin size={18} className="absolute top-3 left-3 text-gray-400" />
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="contactPhone" className="text-sm font-medium text-gray-700">
                Contact Phone
              </label>
              <Input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="requiredBy" className="text-sm font-medium text-gray-700">
                Required By Date
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute top-3 left-3 text-gray-400" />
                <Input
                  id="requiredBy"
                  name="requiredBy"
                  type="date"
                  value={formData.requiredBy}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">
              Additional Information
            </label>
            <Textarea
              id="additionalInfo"
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any additional details about the request..."
              className="h-32"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="bg-medical-red hover:bg-red-600">
            Submit Blood Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default BloodRequestForm;
