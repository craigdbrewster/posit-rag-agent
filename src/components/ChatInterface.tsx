import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, User, Bot, Loader2, Paperclip } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

// Component to render text with clickable links
const MessageContent = ({ content }: { content: string }) => {
  const renderContentWithLinks = (text: string) => {
    // Regex to match URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <p className="text-sm leading-relaxed whitespace-pre-wrap">
      {renderContentWithLinks(content)}
    </p>
  );
};

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<string>;
  initialMessage?: string | null;
}

export const ChatInterface = ({ onSendMessage, initialMessage }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle initial message from navigation
  useEffect(() => {
    if (initialMessage && initialMessage.trim()) {
      // Add the user message immediately when there's an initial message
      const userMessage: Message = {
        id: `user-initial-${Date.now()}`,
        content: initialMessage.trim(),
        sender: "user",
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Process the initial message and get AI response
      const processInitialMessage = async () => {
        setIsLoading(true);
        try {
          const response = await onSendMessage(initialMessage.trim());
          
          const assistantMessage: Message = {
            id: `assistant-initial-${Date.now()}`,
            content: response,
            sender: "assistant",
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to get response from the AI assistant. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      processInitialMessage();
    }
  }, [initialMessage, onSendMessage, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await onSendMessage(inputMessage.trim());
      
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        sender: "assistant",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from the AI assistant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex flex-col min-h-0">
      {/* Messages Container */}
      <div className="space-y-4 mb-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[80%] space-x-3 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <div className="flex-shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }`}>
                  {message.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                </div>
              </div>
               <Card className={`p-3 ${
                 message.sender === "user" 
                   ? "bg-primary text-primary-foreground" 
                   : "bg-card text-card-foreground"
               }`}>
                 <MessageContent content={message.content} />
                <p className={`text-xs mt-2 opacity-70 ${
                  message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </Card>
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%] space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
                  <Bot size={16} />
                </div>
              </div>
              <Card className="p-3 bg-card text-card-foreground">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Thinking...</p>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed Input Form at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50">
        <div className="container mx-auto max-w-4xl p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <div className="flex-1 relative">
              <label htmlFor="message-input" className="sr-only">
                Type your message
              </label>
              <Textarea
                id="message-input"
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Posit Connect, Python, R, training, or deployment..."
                className="min-h-[44px] max-h-32 resize-none pr-20"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-2 flex space-x-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={isLoading}
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};