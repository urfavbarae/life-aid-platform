import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MedicineSearch from "@/components/medicine/MedicineSearch";
import MedicineCard, { MedicineProps } from "@/components/medicine/MedicineCard";
import { Loader2 } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { useToast } from "@/components/ui/use-toast";

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
  const [filteredMedicines, setFilteredMedicines] = useState<MedicineProps[]>(mockMedicines);
  const { toast } = useToast();
  
  const handleSearch = (query: string, filters: {
    category: string;
    priceRange: string;
    availability: string;
  }) => {
    setLoading(true);
    
    setTimeout(() => {
      console.log("Searching for medicines with:", query, filters);
      
      let results = [...medicines];
      
      // Filter by search query
      if (query) {
        results = results.filter(medicine => 
          medicine.name.toLowerCase().includes(query.toLowerCase()) || 
          medicine.description.toLowerCase().includes(query.toLowerCase()) ||
          medicine.manufacturer.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Filter by category
      if (filters.category) {
        results = results.filter(medicine => 
          medicine.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      // Filter by price range
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        results = results.filter(medicine => {
          if (max) {
            return medicine.price >= min && medicine.price <= max;
          } else {
            // Handle "100+" case
            return medicine.price >= min;
          }
        });
      }
      
      // Filter by availability
      if (filters.availability) {
        if (filters.availability === 'in-stock') {
          results = results.filter(medicine => medicine.inStock);
        }
        // Other availability filters can be implemented here
      }
      
      setFilteredMedicines(results);
      setLoading(false);
      
      // Show toast notification with results count
      toast({
        title: `${results.length} medicines found`,
        description: results.length > 0 
          ? "Showing filtered results based on your search criteria." 
          : "No medicines match your search criteria. Try adjusting your filters.",
      });
    }, 1000);
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
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map((medicine) => (
                  <MedicineCard key={medicine.id} {...medicine} />
                ))
              ) : (
                <div className="py-16 text-center">
                  <p className="text-lg text-gray-600">No medicines found matching your criteria.</p>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </div>
              )}
              
              {filteredMedicines.length > 0 && (
                <div className="py-6 flex justify-center">
                  <Pagination />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Medicines;
