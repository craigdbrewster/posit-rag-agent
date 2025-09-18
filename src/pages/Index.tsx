import { useState } from "react";
import { PositHeader } from "@/components/PositHeader";
import { PositFooter } from "@/components/PositFooter";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, Search, HelpCircle, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [chatInput, setChatInput] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChatStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      // Navigate to chat page with the initial message
      navigate('/chat', { state: { initialMessage: chatInput.trim() } });
    } else {
      navigate('/chat');
    }
  };


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PositHeader 
        serviceName="Posit Connect RAG Agent" 
        phase="beta"
        feedbackUrl="mailto:posit-support@example.gov.uk"
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Service Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">AI-powered Posit Connect hub for government data analysts</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Your comprehensive resource for Posit Connect deployment, Python and R development, training materials, 
            and best practices. Get instant answers about data science workflows, explore showcased applications,
            and access curated development resources from across government departments.
          </p>
        </div>

        {/* Chat Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleChatStart} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about Posit Connect, Python, R."
                className="pr-12 h-12 text-base"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Start chat</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <Link to="/showcased-apps" className="block">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Showcased Apps</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Explore exemplary Posit Connect applications and proven patterns from across government.
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow">
            <Link to="/knowledge-hub" className="block">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Search className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Knowledge Hub</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You can browse training materials, documentation, and reusable development patterns.
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow">
            <Link to="/help" className="block">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Help With This Service</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                You can access setup guides, troubleshooting, and mentoring resources.
              </p>
            </Link>
          </Card>
        </div>

        {/* Latest Updates */}
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-lg font-semibold mb-2">New Python Dashboard Template Available</h3>
              <p className="text-muted-foreground mb-2">
                A comprehensive Plotly Dash template for government data visualisation, following GDS design principles and accessibility standards.
              </p>
              <p className="text-sm text-muted-foreground">Published 15 September 2025</p>
            </div>
            
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-lg font-semibold mb-2">R Shiny Deployment Guide Updated</h3>
              <p className="text-muted-foreground mb-2">
                Enhanced documentation covering containerisation, environment management, and performance optimisation for production deployments.
              </p>
              <p className="text-sm text-muted-foreground">Published 12 September 2025</p>
            </div>
            
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-lg font-semibold mb-2">Featured: Government Calculator Showcase</h3>
              <p className="text-muted-foreground mb-2">
                Interactive calculation tool demonstrating best practices for secure data handling and user-friendly government service design.
              </p>
              <p className="text-sm text-muted-foreground">Published 8 September 2025</p>
            </div>
          </div>
        </div>

      </main>

      <PositFooter />
    </div>
  );
};

export default Index;