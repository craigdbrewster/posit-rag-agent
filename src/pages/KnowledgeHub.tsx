import { PositHeader } from "@/components/PositHeader";
import { PositFooter } from "@/components/PositFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const KnowledgeHub = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PositHeader 
        serviceName="Posit Connect RAG Agent" 
        phase="beta"
        feedbackUrl="mailto:posit-support@example.gov.uk"
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
          <h2 className="text-3xl font-bold mb-4">Knowledge Hub</h2>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Browse training materials, documentation, and development resources 
            from across government departments.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-4 hover:bg-secondary/50 transition-colors">
            <h3 className="font-semibold mb-2">Training Materials</h3>
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
            <h3 className="font-semibold mb-2">Templates and toolkits</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Ready-to-use templates and development toolkits for common government data science tasks
            </p>
            <Button variant="outline" size="sm">
              View Patterns
            </Button>
          </Card>
          <Card className="p-4 hover:bg-secondary/50 transition-colors">
            <h3 className="font-semibold mb-2">Posit Connect Docs</h3>
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
            <h3 className="font-semibold mb-2">Monitoring Tools</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Self-service dashboards and analytics
            </p>
            <Button variant="outline" size="sm">
              View Tools
            </Button>
          </Card>
          <Card className="p-4 hover:bg-secondary/50 transition-colors">
            <h3 className="font-semibold mb-2">User Research</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Insights to guide tenancy decisions
            </p>
            <Button variant="outline" size="sm">
              View Research
            </Button>
          </Card>
        </div>
      </main>

      <PositFooter />
    </div>
  );
};

export default KnowledgeHub;