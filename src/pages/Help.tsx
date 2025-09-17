import { PositHeader } from "@/components/PositHeader";
import { PositFooter } from "@/components/PositFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Help = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PositHeader 
        serviceName="Posit Connect RAG Agent" 
        phase="beta"
        feedbackUrl="mailto:posit-support@hmrc.gov.uk"
      />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Help & Documentation</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Get help with Posit Connect, find documentation, and learn how to use this service effectively.
          </p>
        </div>

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

        <Card className="p-6 mt-6">
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
      </main>

      <PositFooter />
    </div>
  );
};

export default Help;