import { useState } from "react";
import { PositHeader } from "@/components/PositHeader";
import { PositFooter } from "@/components/PositFooter";
import { ChatInterface } from "@/components/ChatInterface";
import { DocumentUpload } from "@/components/DocumentUpload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Upload, Search, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { processPositQuery } from "@/lib/positRAG";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { toast } = useToast();

  const handleSendMessage = async (message: string): Promise<string> => {
    // Enhanced RAG system with Posit Connect knowledge and web search
    try {
      const response = await processPositQuery(message, true);
      return response;
    } catch (error) {
      // Fallback response
      return "I'm here to help with Posit Connect, Python, and R development for government data analysts. You can ask me about deployment, training materials, best practices, code examples, and more. For the most current information, I recommend checking docs.posit.co/connect/.";
    }
  };

  const handleFileUpload = async (files: File[]): Promise<void> => {
    // This would integrate with your Posit Connect backend to process files
    console.log("Files to upload:", files.map(f => f.name));
    
    // Simulate file processing for government documents
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Documents processed successfully",
      description: `${files.length} document(s) have been analyzed and added to the knowledge base. You can now ask questions about their content.`,
    });
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

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="chat" className="flex items-center space-x-2 py-3">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center space-x-2 py-3">
              <Search className="h-4 w-4" />
              <span>Browse Resources</span>
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
              <h3 className="text-2xl font-bold mb-4">Browse Posit Connect Resources</h3>
              <p className="text-muted-foreground mb-6">
                Quick access to training materials, documentation, and gold standard applications 
                from across government departments.
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">Training Materials</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Python, R, and Posit Connect onboarding
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://education.rstudio.com/" target="_blank" rel="noopener noreferrer">
                      View Training
                    </a>
                  </Button>
                </Card>
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">Gold Standard Apps</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Showcase applications from HMRC tenancies
                  </p>
                  <Button variant="outline" size="sm">
                    View Examples
                  </Button>
                </Card>
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">UX Patterns</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Reusable patterns for common tasks
                  </p>
                  <Button variant="outline" size="sm">
                    View Patterns
                  </Button>
                </Card>
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">Posit Connect Docs</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Official deployment and admin guides
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://docs.posit.co/connect/" target="_blank" rel="noopener noreferrer">
                      View Docs
                    </a>
                  </Button>
                </Card>
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">Monitoring Tools</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Self-service dashboards and analytics
                  </p>
                  <Button variant="outline" size="sm">
                    View Tools
                  </Button>
                </Card>
                <Card className="p-4 hover:bg-secondary/50 transition-colors">
                  <h4 className="font-semibold mb-2">User Research</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Insights to guide tenancy decisions
                  </p>
                  <Button variant="outline" size="sm">
                    View Research
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
                    <h4 className="font-semibold">1. Ask Posit Connect questions</h4>
                    <p className="text-sm text-muted-foreground">
                      Get help with deployment, Python/R development, training materials, and best practices for government data teams.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">2. Get code examples</h4>
                    <p className="text-sm text-muted-foreground">
                      Request Shiny, Streamlit, R Markdown, and API code snippets with government-specific examples.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">3. Upload documents</h4>
                    <p className="text-sm text-muted-foreground">
                      Upload Confluence pages, SharePoint documents, or other training materials for analysis and querying.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">4. Access gold standards</h4>
                    <p className="text-sm text-muted-foreground">
                      Browse showcase applications and UX patterns from successful government data projects.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">What you can ask about</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Posit Connect Deployment</h4>
                    <p className="text-sm text-muted-foreground">
                      Publishing Shiny apps, Python dashboards, R Markdown reports, and APIs to government Posit Connect instances.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Python & R Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Best practices, code examples, training materials, and government-specific guidelines for data science teams.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Training & Mentoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Onboarding materials, skill development paths, coaching resources, and one-to-one mentoring guidance.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Gold Standard Applications</h4>
                    <p className="text-sm text-muted-foreground">
                      Showcase applications, UX patterns, monitoring tools, and user research insights from successful tenancies.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Example Questions</h3>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="text-sm">
                  <p className="font-medium mb-1">• "Show me Shiny app code"</p>
                  <p className="font-medium mb-1">• "How do I deploy a Python dashboard?"</p>
                  <p className="font-medium mb-1">• "What are R best practices for government?"</p>
                  <p className="font-medium mb-1">• "Show me training materials for new data analysts"</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium mb-1">• "Create an R Markdown template"</p>
                  <p className="font-medium mb-1">• "How do I build an API with plumber?"</p>
                  <p className="font-medium mb-1">• "What are the gold standard UX patterns?"</p>
                  <p className="font-medium mb-1">• "How do I set up monitoring for my app?"</p>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button asChild>
                  <a href="https://docs.posit.co/connect/" target="_blank" rel="noopener noreferrer">
                    Posit Connect Docs
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://education.rstudio.com/" target="_blank" rel="noopener noreferrer">
                    R Training Resources
                  </a>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <PositFooter />
    </div>
  );
};

export default Index;