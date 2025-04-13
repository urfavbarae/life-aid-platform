
import React from "react";
import { CheckCircle2, AlertCircle, ShoppingCart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface MedicineProps {
  id: string;
  name: string;
  description: string;
  price: number;
  manufacturer: string;
  category: string;
  inStock: boolean;
  prescription: boolean;
  image?: string;
}

const MedicineCard: React.FC<MedicineProps> = ({
  id,
  name,
  description,
  price,
  manufacturer,
  category,
  inStock,
  prescription,
  image,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-gray-100 p-4 flex items-center justify-center">
          <img
            src={image || "/placeholder.svg"}
            alt={name}
            className="object-contain h-32 w-32"
          />
        </div>
        
        <div className="p-6 md:w-3/4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500 mt-1">{manufacturer} • {category}</p>
            </div>
            <div className="flex space-x-2">
              {inStock ? (
                <Badge className="bg-medical-green">
                  <CheckCircle2 size={14} className="mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="outline" className="text-red-500 border-red-500">
                  <AlertCircle size={14} className="mr-1" />
                  Out of Stock
                </Badge>
              )}
              {prescription && (
                <Badge variant="secondary">
                  <Info size={14} className="mr-1" />
                  Prescription
                </Badge>
              )}
            </div>
          </div>
          
          <p className="mt-4 text-gray-600 text-sm line-clamp-2">{description}</p>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold text-medical-blue">
              ${price.toFixed(2)}
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" className="text-sm">View Details</Button>
              <Button disabled={!inStock} className="text-sm bg-medical-blue hover:bg-medical-lightBlue">
                <ShoppingCart size={16} className="mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
