
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BloodRequestForm, { BloodRequestData } from "@/components/blood/BloodRequestForm";
import BloodRequestCard, { BloodRequestProps } from "@/components/blood/BloodRequestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demo purposes
const mockBloodRequests: BloodRequestProps[] = [
  {
    id: "1",
    patientName: "John Smith",
    bloodType: "O+",
    unitsNeeded: 2,
    hospital: "General Hospital",
    address: "123 Medical Center Blvd, Cityville, CA",
    contactPhone: "(555) 123-4567",
    urgency: "critical",
    requiredBy: "2025-04-15",
    createdAt: "2025-04-12",
    status: "verified",
  },
  {
    id: "2",
    patientName: "Mary Johnson",
    bloodType: "A-",
    unitsNeeded: 3,
    hospital: "Community Medical Center",
    address: "456 Healthcare Ave, Townsville, CA",
    contactPhone: "(555) 987-6543",
    urgency: "urgent",
    requiredBy: "2025-04-18",
    createdAt: "2025-04-11",
    status: "verified",
  },
  {
    id: "3",
    patientName: "Robert Davis",
    bloodType: "B+",
    unitsNeeded: 1,
    hospital: "Saint Joseph's Hospital",
    address: "789 Wellness Parkway, Villagetown, CA",
    contactPhone: "(555) 456-7890",
    urgency: "normal",
    requiredBy: "2025-04-20",
    createdAt: "2025-04-10",
    status: "pending",
  },
  {
    id: "4",
    patientName: "Sarah Wilson",
    bloodType: "AB+",
    unitsNeeded: 2,
    hospital: "University Medical Center",
    address: "321 Research Blvd, Collegetown, CA",
    contactPhone: "(555) 789-0123",
    urgency: "urgent",
    requiredBy: "2025-04-17",
    createdAt: "2025-04-09",
    status: "fulfilled",
  },
];

const BloodDonation = () => {
  const [activeTab, setActiveTab] = useState<string>("donate");
  const [bloodRequests, setBloodRequests] = useState<BloodRequestProps[]>(mockBloodRequests);
  const [selectedBloodTypes, setSelectedBloodTypes] = useState<string[]>([]);
  const { toast } = useToast();
  
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  
  const handleSubmitRequest = (formData: BloodRequestData) => {
    // In a real app, this would call an API to create the request
    console.log("Blood request submitted:", formData);
    
    toast({
      title: "Request Submitted",
      description: "Your blood donation request has been submitted for verification.",
      duration: 5000,
    });
    
    setActiveTab("requests");
  };
  
  const toggleBloodTypeFilter = (bloodType: string) => {
    if (selectedBloodTypes.includes(bloodType)) {
      setSelectedBloodTypes(selectedBloodTypes.filter((type) => type !== bloodType));
    } else {
      setSelectedBloodTypes([...selectedBloodTypes, bloodType]);
    }
  };
  
  const filteredRequests = selectedBloodTypes.length > 0
    ? bloodRequests.filter((request) => selectedBloodTypes.includes(request.bloodType))
    : bloodRequests;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Blood Donation</h1>
            <p className="text-gray-600">
              Request blood donations or find donation opportunities near you.
            </p>
          </div>
          
          <Tabs defaultValue="donate" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="donate">Request Blood Donation</TabsTrigger>
              <TabsTrigger value="requests">View Blood Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="donate">
              <div className="max-w-3xl mx-auto">
                <BloodRequestForm onSubmit={handleSubmitRequest} />
                
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Blood Donation Guidelines</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>You must be at least 18 years old to donate blood.</li>
                    <li>You must weigh at least 110 pounds (50 kg).</li>
                    <li>You should be in good general health and feeling well.</li>
                    <li>You must wait at least 8 weeks between whole blood donations.</li>
                    <li>Some medications and medical conditions may affect eligibility.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="requests">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                  <div className="w-full md:w-1/2 relative">
                    <Search size={18} className="absolute top-3 left-3 text-gray-400" />
                    <Input
                      placeholder="Search blood requests..."
                      className="pl-10"
                    />
                  </div>
                  
                  <div className="flex items-center">
                    <Filter size={18} className="text-gray-500 mr-2" />
                    <span className="text-sm font-medium mr-3">Filter by Blood Type:</span>
                    <div className="flex flex-wrap gap-2">
                      {bloodTypes.map((type) => (
                        <Badge
                          key={type}
                          variant={selectedBloodTypes.includes(type) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedBloodTypes.includes(type) 
                              ? "bg-medical-red hover:bg-red-600" 
                              : "border-medical-red text-medical-red hover:bg-red-50"
                          }`}
                          onClick={() => toggleBloodTypeFilter(type)}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <Badge className="bg-medical-red animate-pulse-gentle">
                    <AlertCircle size={14} className="mr-1" />
                    Critical
                  </Badge>
                  <span className="text-sm text-gray-500 mx-2">Needed within 24 hours</span>
                  
                  <Badge className="bg-orange-500">Urgent</Badge>
                  <span className="text-sm text-gray-500 mx-2">Needed within 3 days</span>
                  
                  <Badge className="bg-yellow-500">Normal</Badge>
                  <span className="text-sm text-gray-500 mx-2">Needed within a week</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <BloodRequestCard key={request.id} {...request} />
                  ))
                ) : (
                  <div className="col-span-2 py-16 text-center">
                    <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-medium text-gray-800 mb-2">No blood requests found</h3>
                    <p className="text-gray-600">
                      There are currently no blood donation requests matching your criteria.
                    </p>
                    <Button
                      onClick={() => setSelectedBloodTypes([])}
                      className="mt-4 bg-medical-red hover:bg-red-600"
                      disabled={selectedBloodTypes.length === 0}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BloodDonation;
