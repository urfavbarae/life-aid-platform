
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, Bot, User, RefreshCw, Info } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const AiAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your medical assistant. I can help with general questions about medications, their side effects, and usage guidelines. Please note that I cannot diagnose conditions or replace professional medical advice. How can I help you today?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Mock API call - In a real app, this would call a backend service
    setTimeout(() => {
      // Example responses based on keywords
      let response = "I don't have specific information about that. For personalized advice, please consult a healthcare professional.";
      
      const query = input.toLowerCase();
      
      if (query.includes("paracetamol") || query.includes("tylenol") || query.includes("acetaminophen")) {
        response = "Paracetamol (acetaminophen) is a pain reliever and fever reducer. It's typically used for mild to moderate pain and fever. The standard adult dose is 500-1000mg every 4-6 hours, not exceeding 4000mg per day. Side effects are rare but may include liver damage if taken in excess. Always follow the dosage instructions on the package.";
      } else if (query.includes("ibuprofen") || query.includes("advil") || query.includes("motrin")) {
        response = "Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to reduce fever and treat pain or inflammation. The typical adult dose is 200-400mg every 4-6 hours. It should be taken with food to reduce stomach upset. Side effects may include stomach pain, heartburn, and increased risk of heart attack or stroke with prolonged use.";
      } else if (query.includes("aspirin")) {
        response = "Aspirin is used to treat pain, fever, and inflammation. It's also used as a blood thinner to prevent heart attacks and strokes in high-risk individuals. The typical adult dose is 325-650mg every 4-6 hours. Side effects may include stomach upset, heartburn, and increased risk of bleeding. It should not be given to children due to the risk of Reye's syndrome.";
      } else if (query.includes("allergy") || query.includes("antihistamine") || query.includes("cetirizine") || query.includes("loratadine")) {
        response = "Antihistamines like cetirizine (Zyrtec) and loratadine (Claritin) are used to relieve allergy symptoms. They work by blocking histamine, a substance that causes allergic symptoms. Common side effects may include drowsiness (more common with older antihistamines), dry mouth, and dizziness. They're typically taken once daily.";
      } else if (query.includes("antibiotic") || query.includes("amoxicillin") || query.includes("infection")) {
        response = "Antibiotics are used to treat bacterial infections. It's important to complete the full course of antibiotics as prescribed, even if you feel better. Taking antibiotics when not needed or not completing the course can lead to antibiotic resistance. Common side effects may include diarrhea, nausea, and rash. Specific advice depends on the particular antibiotic prescribed.";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Medical Assistant</h1>
            <p className="text-gray-600">
              Ask questions about medications, side effects, and general medical information. 
              <span className="text-medical-red font-medium ml-1">
                Note: This is not a substitute for professional medical advice.
              </span>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-md">
              <CardHeader className="bg-medical-blue/5 border-b">
                <CardTitle className="flex items-center gap-2 text-medical-blue">
                  <Bot size={24} />
                  AI Medical Assistant
                </CardTitle>
                <CardDescription>
                  Get general information about medicines, their usage, and side effects.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="h-[500px] overflow-y-auto p-6">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`mb-4 flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                    >
                      <div 
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === 'assistant' 
                            ? 'bg-gray-100 text-gray-800' 
                            : 'bg-medical-blue text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === 'assistant' ? (
                            <Bot size={16} />
                          ) : (
                            <User size={16} />
                          )}
                          <span className="font-medium">
                            {message.role === 'assistant' ? 'AI Assistant' : 'You'}
                          </span>
                        </div>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[80%] rounded-lg p-4 bg-gray-100">
                        <div className="flex items-center gap-2">
                          <Bot size={16} />
                          <span className="font-medium">AI Assistant</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <RefreshCw size={16} className="animate-spin" />
                          <p>Thinking...</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSubmit} className="w-full flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about medications, side effects, dosages..."
                    disabled={isLoading}
                    className="flex-grow"
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading || !input.trim()}
                    className="bg-medical-blue hover:bg-medical-lightBlue"
                  >
                    <Send size={18} />
                    <span className="sr-only md:not-sr-only md:ml-2">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
            
            <Card className="h-fit shadow-md">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center gap-2">
                  <Info size={20} />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Example Questions:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>What is paracetamol used for?</li>
                      <li>What are the side effects of ibuprofen?</li>
                      <li>How should I take antibiotics?</li>
                      <li>What's the difference between cetirizine and loratadine?</li>
                      <li>Is aspirin safe for children?</li>
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <h3 className="font-medium text-medical-red mb-1">Limitations:</h3>
                    <p className="text-sm">
                      This assistant provides general information only and is not a replacement for professional medical advice. 
                      Always consult a healthcare professional for specific medical concerns.
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <h3 className="font-medium mb-1">Privacy Note:</h3>
                    <p className="text-sm">
                      Your chat history is stored locally in your browser and is not sent to any external servers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AiAssistant;
