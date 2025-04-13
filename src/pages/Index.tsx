
import React from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Pill, Heart, ArrowRight, Star, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-medical-blue to-blue-600 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Your Health Assistant for Modern Healthcare Needs
                </h1>
                <p className="text-xl opacity-90">
                  Find pharmacies, check medicine availability, and connect with blood donors - all in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-white text-medical-blue hover:bg-gray-100">
                    <Link to="/pharmacies">
                      Find Pharmacies <ArrowRight size={18} className="ml-2" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/blood-donation">
                      Blood Donation <Heart size={18} className="ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block">
                <img 
                  src="/placeholder.svg" 
                  alt="Healthcare services" 
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin size={28} className="text-medical-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">Pharmacy Locator</h3>
                <p className="text-gray-600 mb-6">
                  Find nearby pharmacies based on your location. Get directions, contact information and operating hours.
                </p>
                <Button asChild variant="outline" className="text-medical-blue border-medical-blue hover:bg-blue-50">
                  <Link to="/pharmacies">Find Pharmacies</Link>
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Pill size={28} className="text-medical-green" />
                </div>
                <h3 className="text-xl font-bold mb-3">Medicine Availability</h3>
                <p className="text-gray-600 mb-6">
                  Search for medicines and check their availability across different pharmacies. Compare prices and find alternatives.
                </p>
                <Button asChild variant="outline" className="text-medical-green border-medical-green hover:bg-green-50">
                  <Link to="/medicines">Search Medicines</Link>
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Bot size={28} className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Medical Assistant</h3>
                <p className="text-gray-600 mb-6">
                  Get instant answers about medications, side effects, and usage guidelines from our AI-powered assistant.
                </p>
                <Button asChild variant="outline" className="text-purple-600 border-purple-600 hover:bg-purple-50">
                  <Link to="/ai-assistant">Ask AI Assistant</Link>
                </Button>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart size={28} className="text-medical-red" />
                </div>
                <h3 className="text-xl font-bold mb-3">Blood Donation</h3>
                <p className="text-gray-600 mb-6">
                  Find blood donation centers near you. Learn about the donation process and blood types needed.
                </p>
                <Button asChild variant="outline" className="text-medical-red border-medical-red hover:bg-red-50">
                  <Link to="/blood-donation">Blood Donation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">How It Works</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              LifeAid makes accessing healthcare services simple and efficient.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">1</div>
                <h3 className="font-bold mb-2">Create an Account</h3>
                <p className="text-gray-600 text-sm">
                  Sign up for a free account to access all features.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">2</div>
                <h3 className="font-bold mb-2">Find Services</h3>
                <p className="text-gray-600 text-sm">
                  Search for pharmacies, medicines, or blood donation centers.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">3</div>
                <h3 className="font-bold mb-2">Connect</h3>
                <p className="text-gray-600 text-sm">
                  Contact pharmacies, check medicine availability, or respond to blood requests.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-medical-blue rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">4</div>
                <h3 className="font-bold mb-2">Get Help</h3>
                <p className="text-gray-600 text-sm">
                  Receive guidance and support for your healthcare needs.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "LifeAid helped me find a rare medicine for my father when no local pharmacy had it in stock. The medicine availability feature saved us so much time."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Patient's Daughter</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6">
                  "When my mother needed a rare blood type urgently, LifeAid connected us with donors in less than an hour. This platform is literally saving lives."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Michael Rodriguez</p>
                    <p className="text-sm text-gray-500">Blood Recipient</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                  <Star size={18} className="text-gray-300" />
                </div>
                <p className="text-gray-600 mb-6">
                  "As a pharmacy owner, LifeAid has helped us reach more customers who need our specific medications. The platform is intuitive and easy to update."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">David Chen</p>
                    <p className="text-sm text-gray-500">Pharmacy Owner</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-medical-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already benefiting from LifeAid's healthcare services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-medical-blue hover:bg-gray-100">
                <Link to="/pharmacies">Find a Pharmacy</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white hover:bg-white/10">
                <Link to="/blood-donation">Donate Blood</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
