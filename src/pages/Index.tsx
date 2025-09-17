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
        feedbackUrl="mailto:posit-support@hmrc.gov.uk"
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Service Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">AI-powered Posit Connect hub for government data analysts</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Your comprehensive resource for Posit Connect deployment, Python and R development, training materials, 
            best practices, and "gold standard" applications. Upload your documentation for analysis, get instant 
            answers about data science workflows, and access curated examples from across government departments.
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
                placeholder="Ask about Posit Connect, Python, R, training, or deployment..."
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
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <Link to="/chat" className="block">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Chat Assistant</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get instant help with code examples, deployment guides, and best practices.
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
                Browse training materials, gold standard apps, and reusable patterns.
              </p>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-md transition-shadow">
            <Link to="/help" className="block">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">Help & Documentation</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Access setup guides, troubleshooting, and mentoring resources.
              </p>
            </Link>
          </Card>
        </div>

      </main>

      <PositFooter />
    </div>
  );
};

export default Index;