
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, MapPin, Clock, Bell, LogOut, Settings, Shield } from "lucide-react";

const Account = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
            <p className="text-gray-600">
              Manage your profile, view your history, and update your preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                      <User size={48} className="text-gray-500" />
                    </div>
                    <h3 className="font-bold text-lg">Guest User</h3>
                    <p className="text-sm text-gray-500">guest@example.com</p>
                    <Button className="mt-4 w-full bg-medical-blue hover:bg-medical-lightBlue">
                      Sign In
                    </Button>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <User size={18} className="mr-2" /> My Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Heart size={18} className="mr-2" /> My Donations
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <MapPin size={18} className="mr-2" /> Saved Locations
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Clock size={18} className="mr-2" /> History
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Bell size={18} className="mr-2" /> Notifications
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings size={18} className="mr-2" /> Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                      <LogOut size={18} className="mr-2" /> Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Account Overview</CardTitle>
                  <CardDescription>
                    Please sign in to access your personal dashboard and account features.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="profile">
                    <TabsList>
                      <TabsTrigger value="profile">Profile</TabsTrigger>
                      <TabsTrigger value="donations">Donations</TabsTrigger>
                      <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="profile" className="mt-6">
                      <div className="text-center py-12">
                        <User size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium mb-2">Create Your Profile</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Sign in to create your profile and access personalized features,
                          save your favorite pharmacies, and track your donations.
                        </p>
                        <Button className="bg-medical-blue hover:bg-medical-lightBlue">
                          Sign In to Continue
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="donations" className="mt-6">
                      <div className="text-center py-12">
                        <Heart size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium mb-2">Your Donation History</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Track your blood donation history, view upcoming appointments,
                          and manage your donation preferences.
                        </p>
                        <Button className="bg-medical-blue hover:bg-medical-lightBlue">
                          Sign In to View Donations
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="security" className="mt-6">
                      <div className="text-center py-12">
                        <Shield size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-medium mb-2">Account Security</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          Manage your security settings, update password,
                          and configure two-factor authentication.
                        </p>
                        <Button className="bg-medical-blue hover:bg-medical-lightBlue">
                          Sign In to Manage Security
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
