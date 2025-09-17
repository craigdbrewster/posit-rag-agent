import { useState } from "react";
import { GDSHeader } from "@/components/GDSHeader";
import { GDSFooter } from "@/components/GDSFooter";
import { ChatInterface } from "@/components/ChatInterface";
import { DocumentUpload } from "@/components/DocumentUpload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Upload, Search, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { processGDSQuery } from "@/lib/gdsRAG";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { toast } = useToast();

  const handleSendMessage = async (message: string): Promise<string> => {
    // Enhanced RAG system with real GDS knowledge and web search
    try {
      const response = await processGDSQuery(message, true);
      return response;
    } catch (error) {
      // Fallback response
      return "I'm here to help with GDS Design System questions. You can ask me about components, accessibility guidelines, implementation patterns, colors, typography, and more. For the most current information, I recommend checking design-system.service.gov.uk.";
    }
  };

  const handleFileUpload = async (files: File[]): Promise<void> => {
    // This would integrate with your Python/R backend to process files
    console.log("Files to upload:", files.map(f => f.name));
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Files processed successfully",
      description: `${files.length} file(s) have been added to the knowledge base and can now be queried through the chat interface.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <GDSHeader 
        serviceName="RAG AI Document Assistant" 
        phase="beta"
        feedbackUrl="mailto:feedback@example.gov.uk"
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Service Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">AI-powered GDS guidance and document analysis</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Get instant answers about UK Government Digital Service guidelines, upload your documents 
            for analysis, and ensure your service meets GDS standards. The AI assistant has knowledge 
            of current GDS patterns, components, and accessibility requirements.
          </p>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="chat" className="flex items-center space-x-2 py-3">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2 py-3">
              <Search className="h-4 w-4" />
              <span>Browse GDS</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center space-x-2 py-3">
              <HelpCircle className="h-4 w-4" />
              <span>Help</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-0">
            <Card className="h-[600px]">
              <ChatInterface onSendMessage={handleSendMessage} />
            </Card>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Browse GDS Documentation</h3>
              <p className="text-muted-foreground mb-6">
                Quick access to key sections of the GDS Design System. Click any link to explore 
                specific components and patterns.
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">Components</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Buttons, forms, navigation, and more
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://design-system.service.gov.uk/components/" target="_blank" rel="noopener noreferrer">
                      View Components
                    </a>
                  </Button>
                </Card>
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">Patterns</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Common page patterns and user flows
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://design-system.service.gov.uk/patterns/" target="_blank" rel="noopener noreferrer">
                      View Patterns
                    </a>
                  </Button>
                </Card>
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">Accessibility</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    WCAG guidelines and best practices
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://design-system.service.gov.uk/accessibility/" target="_blank" rel="noopener noreferrer">
                      View Accessibility
                    </a>
                  </Button>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">How to use this service</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">1. Ask GDS questions</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the chat interface to ask about GDS components, patterns, accessibility guidelines, and implementation details.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">2. Get code examples</h4>
                    <p className="text-sm text-muted-foreground">
                      Request HTML/CSS code snippets for buttons, forms, navigation, and other GDS components.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">3. Browse official docs</h4>
                    <p className="text-sm text-muted-foreground">
                      Use the Browse GDS tab for quick access to official design system documentation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">4. Follow live links</h4>
                    <p className="text-sm text-muted-foreground">
                      Click on any URL in chat responses to go directly to the official GDS documentation.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">What you can ask about</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Components & Patterns</h4>
                    <p className="text-sm text-muted-foreground">
                      Buttons, forms, navigation, headers, footers, and all other GDS components with code examples.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Accessibility Guidelines</h4>
                    <p className="text-sm text-muted-foreground">
                      WCAG 2.2 compliance, screen reader support, keyboard navigation, and inclusive design practices.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Colors & Typography</h4>
                    <p className="text-sm text-muted-foreground">
                      GDS color palette, font choices, spacing, and the 2025 brand refresh guidelines.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Implementation Help</h4>
                    <p className="text-sm text-muted-foreground">
                      How to build GDS-compliant services, user testing approaches, and best practices.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Example Questions</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="text-sm">
                  <p className="font-medium mb-1">• "Show me button code"</p>
                  <p className="font-medium mb-1">• "What are the GDS colors?"</p>
                  <p className="font-medium mb-1">• "How do I make forms accessible?"</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">• "Tell me about the 2025 brand refresh"</p>
                  <p className="font-medium mb-1">• "Show me navigation patterns"</p>
                  <p className="font-medium mb-1">• "What's the header structure?"</p>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button asChild>
                  <a href="https://design-system.service.gov.uk/" target="_blank" rel="noopener noreferrer">
                    Official GDS Site
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://design-system.service.gov.uk/get-started/" target="_blank" rel="noopener noreferrer">
                    Get Started Guide
                  </a>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <GDSFooter />
    </div>
  );
};

export default Index;