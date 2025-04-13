
import React, { useState, useEffect } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterValues {
  category: string;
  priceRange: string;
  availability: string;
}

interface MedicineSearchProps {
  onSearch: (query: string, filters: FilterValues) => void;
}

const MedicineSearch: React.FC<MedicineSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({
    category: "",
    priceRange: "",
    availability: "",
  });
  
  // Effect to trigger search when filters change
  useEffect(() => {
    // Only trigger search if any filter has a value
    if (filters.category || filters.priceRange || filters.availability) {
      onSearch(searchTerm, filters);
    }
  }, [filters]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm.trim(), filters);
  };
  
  const clearSearch = () => {
    setSearchTerm("");
    // If we had active filters, trigger a new search with empty query
    if (filters.category || filters.priceRange || filters.availability) {
      onSearch("", filters);
    }
  };
  
  const updateFilter = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  const resetFilters = () => {
    const resetFilterValues = {
      category: "",
      priceRange: "",
      availability: "",
    };
    setFilters(resetFilterValues);
    onSearch(searchTerm, resetFilterValues);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute top-3 left-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for medicines, vitamins, health products..."
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
            Search Medicines
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={toggleFilters}
            className="flex items-center justify-center h-12"
          >
            <Filter size={18} className="mr-2" />
            Filters
            {(filters.category || filters.priceRange || filters.availability) && (
              <span className="ml-2 bg-medical-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </Button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Category</label>
              <Select
                value={filters.category}
                onValueChange={(value) => updateFilter("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="pain relief">Pain Relief</SelectItem>
                  <SelectItem value="vitamins & supplements">Vitamins & Supplements</SelectItem>
                  <SelectItem value="allergy">Allergy</SelectItem>
                  <SelectItem value="blood pressure">Blood Pressure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Price Range</label>
              <Select
                value={filters.priceRange}
                onValueChange={(value) => updateFilter("priceRange", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-10">$0 - $10</SelectItem>
                  <SelectItem value="10-25">$10 - $25</SelectItem>
                  <SelectItem value="25-50">$25 - $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100+">$100+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-500 mb-1 block">Availability</label>
              <Select
                value={filters.availability}
                onValueChange={(value) => updateFilter("availability", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="nearby">Available Nearby</SelectItem>
                  <SelectItem value="all">Show All</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="md:col-span-3 flex justify-end mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetFilters}
                className="text-sm"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default MedicineSearch;
