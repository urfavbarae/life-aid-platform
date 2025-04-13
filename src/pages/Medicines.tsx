
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicineSearch from "@/components/medicine/MedicineSearch";
import MedicineCard, { MedicineProps } from "@/components/medicine/MedicineCard";
import { Loader2 } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

// Mock data for demo purposes
const mockMedicines: MedicineProps[] = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    description: "Pain reliever and fever reducer. Used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
    price: 5.99,
    manufacturer: "MediCorp",
    category: "Pain Relief",
    inStock: true,
    prescription: false,
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    description: "Antibiotic used to treat a number of bacterial infections. It is a first line treatment for middle ear infections and strep throat.",
    price: 12.50,
    manufacturer: "PharmaCare",
    category: "Antibiotics",
    inStock: true,
    prescription: true,
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Lisinopril 10mg",
    description: "Used to treat high blood pressure (hypertension) or heart failure. It is also used to improve survival after a heart attack.",
    price: 8.75,
    manufacturer: "CardioHealth",
    category: "Blood Pressure",
    inStock: false,
    prescription: true,
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Vitamin D3 1000IU",
    description: "Dietary supplement used to maintain healthy levels of vitamin D in the body. Important for bone health and immune function.",
    price: 14.95,
    manufacturer: "NaturalLife",
    category: "Vitamins & Supplements",
    inStock: true,
    prescription: false,
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Cetirizine 10mg",
    description: "Antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, itching eyes/nose, sneezing, hives, and itching.",
    price: 7.25,
    manufacturer: "AllerCare",
    category: "Allergy",
    inStock: true,
    prescription: false,
    image: "/placeholder.svg",
  },
];

const Medicines = () => {
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<MedicineProps[]>(mockMedicines);
  
  const handleSearch = (query: string, filters: any) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // For now, just using mock data
      // In a real app, this would filter based on the query and filters
      console.log("Searching for medicines with:", query, filters);
      
      setLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Medicines</h1>
            <p className="text-gray-600">
              Find medicines, check prices, and see availability across pharmacies.
            </p>
          </div>
          
          <MedicineSearch onSearch={handleSearch} />
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-medical-blue" />
              <span className="ml-2 text-lg text-gray-600">Searching for medicines...</span>
            </div>
          ) : (
            <div className="space-y-6">
              {medicines.map((medicine) => (
                <MedicineCard key={medicine.id} {...medicine} />
              ))}
              
              <div className="py-6 flex justify-center">
                <Pagination />
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Medicines;
