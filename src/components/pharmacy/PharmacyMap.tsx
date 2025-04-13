
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PharmacyProps } from "./PharmacyCard";
import { useToast } from "@/hooks/use-toast";

interface PharmacyMapProps {
  pharmacies: PharmacyProps[];
}

const PharmacyMap: React.FC<PharmacyMapProps> = ({ pharmacies }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const { toast } = useToast();
  
  // Mock coordinates for demo purposes - in a real app these would come from the pharmacy data
  // Explicitly typed as [number, number][] to ensure TypeScript knows these are valid LngLat pairs
  const pharmacyCoordinates: [number, number][] = [
    [-118.243683, 34.052235], // Los Angeles
    [-118.4912, 34.0195], // Santa Monica
    [-118.3287, 34.0983], // Hollywood
    [-118.2437, 34.1478], // Glendale
    [-118.1953, 33.7701], // Long Beach
  ];

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;
    
    try {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-118.243683, 34.052235], // Default to Los Angeles
        zoom: 10
      });
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        "top-right"
      );
      
      // Add pharmacy markers
      map.current.on("load", () => {
        pharmacies.forEach((pharmacy, index) => {
          // Default coordinates if index is out of bounds
          const coordinates: [number, number] = 
            index < pharmacyCoordinates.length 
              ? pharmacyCoordinates[index]
              : [-118.243683, 34.052235]; // Default to LA if no coordinates
          
          // Create marker element
          const el = document.createElement("div");
          el.className = "pharmacy-marker";
          el.style.width = "24px";
          el.style.height = "24px";
          el.style.backgroundImage = "url('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png')";
          el.style.backgroundSize = "cover";
          el.style.borderRadius = "50%";
          el.style.cursor = "pointer";
          
          // Add popup
          const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <h3 class="font-bold">${pharmacy.name}</h3>
              <p>${pharmacy.address}</p>
              <p>${pharmacy.phone}</p>
              <p>${pharmacy.isOpen ? '<span class="text-green-600">Open Now</span>' : '<span class="text-red-600">Closed</span>'}</p>
            `);
            
          // Add marker to map
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(popup)
            .addTo(map.current!);
        });
      });
      
      toast({
        title: "Map initialized successfully",
        description: "Pharmacy locations are now visible on the map",
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      toast({
        title: "Error initializing map",
        description: "Please check your Mapbox token and try again",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <>
      {!mapboxToken ? (
        <div className="bg-gray-200 rounded-lg p-6 flex flex-col items-center justify-center h-[60vh]">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Enter your Mapbox token to view the map</h3>
          <p className="text-gray-600 mb-4 text-center max-w-lg">
            You need a Mapbox token to initialize the map. Visit <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-medical-blue hover:underline">mapbox.com</a> and get your public token from the dashboard.
          </p>
          <div className="flex w-full max-w-lg gap-4 flex-col sm:flex-row">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded p-2"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={handleTokenChange}
            />
            <button 
              className="bg-medical-blue text-white p-2 rounded hover:bg-medical-lightBlue transition-colors"
              onClick={initializeMap}
            >
              Initialize Map
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[60vh] relative">
          <div ref={mapContainer} className="h-full w-full rounded-lg" />
        </div>
      )}
    </>
  );
};

export default PharmacyMap;
