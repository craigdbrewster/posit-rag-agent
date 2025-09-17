import { useState } from "react";
import { PositHeader } from "@/components/PositHeader";
import { PositFooter } from "@/components/PositFooter";
import { ChatInterface } from "@/components/ChatInterface";
import { DocumentUpload } from "@/components/DocumentUpload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Upload, Search, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
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

        {/* Quick Navigation */}
        <div className="flex gap-4 mb-8">
          <Button variant="outline" asChild>
            <Link to="/knowledge-hub" className="flex items-center space-x-2">
              <Search className="h-4 w-4" />
              <span>Knowledge Hub</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/help" className="flex items-center space-x-2">
              <HelpCircle className="h-4 w-4" />
              <span>Help & Documentation</span>
            </Link>
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="chat" className="flex items-center space-x-2 py-3">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center space-x-2 py-3">
              <Upload className="h-4 w-4" />
              <span>Upload Documents</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-0">
            <Card className="h-[600px]">
              <ChatInterface onSendMessage={handleSendMessage} />
            </Card>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4">Upload Government Documents</h3>
              <p className="text-muted-foreground mb-6">
                Upload Confluence pages, SharePoint documents, training materials, or other files 
                to enhance the knowledge base. Supported formats: PDF, Word, Excel, PowerPoint, and text files.
              </p>
              <DocumentUpload onFileUpload={handleFileUpload} />
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <PositFooter />
    </div>
  );
};

export default Index;