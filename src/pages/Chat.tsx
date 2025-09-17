import { useState, useEffect } from "react";
import { PositHeader } from "@/components/PositHeader";
import { PositFooter } from "@/components/PositFooter";
import { ChatInterface } from "@/components/ChatInterface";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "react-router-dom";
import { processPositQuery } from "@/lib/positRAG";

const Chat = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [initialMessage, setInitialMessage] = useState<string | null>(null);

  useEffect(() => {
    // Check if we have an initial message from navigation state
    if (location.state && (location.state as any).initialMessage) {
      setInitialMessage((location.state as any).initialMessage);
    }
  }, [location.state]);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PositHeader 
        serviceName="Posit Connect RAG Agent" 
        phase="beta"
        feedbackUrl="mailto:posit-support@hmrc.gov.uk"
      />
      
      <main className="flex-1 container mx-auto px-4 py-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Chat with AI Assistant</h1>
            <p className="text-muted-foreground">
              Get instant help with Posit Connect, Python, R development, and best practices.
            </p>
          </div>
          
          <ChatInterface onSendMessage={handleSendMessage} initialMessage={initialMessage} />
        </div>
      </main>

      <PositFooter />
    </div>
  );
};

export default Chat;