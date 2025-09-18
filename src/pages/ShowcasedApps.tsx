import { PositHeader } from "@/components/PositHeader";
import { PositFooter } from "@/components/PositFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

const ShowcasedApps = () => {
  const showcasedApps = [
    {
      title: "Government Calculator",
      description: "Interactive calculation tool demonstrating secure data handling and user-friendly government service design. Built with R Shiny following GDS principles.",
      image: "/placeholder.svg",
      link: "#",
      department: "Department A",
      technology: "R Shiny"
    },
    {
      title: "Statistical Dashboard",
      description: "Real-time analytics dashboard for government statistics using Python Dash. Features accessible data visualisation and automated reporting.",
      image: "/placeholder.svg", 
      link: "#",
      department: "ONS",
      technology: "Python Dash"
    },
    {
      title: "Benefits Calculator",
      description: "Comprehensive benefits eligibility tool with complex logic handling and secure authentication. Demonstrates best practices for sensitive data.",
      image: "/placeholder.svg",
      link: "#", 
      department: "DWP",
      technology: "R Shiny"
    },
    {
      title: "Economic Forecasting Model",
      description: "Interactive economic modelling application with scenario analysis. Built using modern data science practices and reproducible workflows.",
      image: "/placeholder.svg",
      link: "#",
      department: "HM Treasury", 
      technology: "Python Streamlit"
    },
    {
      title: "Public Health Monitor",
      description: "Real-time public health data monitoring with automated alerts and trend analysis. Features accessibility-first design principles.",
      image: "/placeholder.svg",
      link: "#",
      department: "DHSC",
      technology: "R Shiny"
    },
    {
      title: "Transport Analytics Portal",
      description: "Comprehensive transport data analysis tool with interactive mapping and performance indicators. Showcases advanced visualisation techniques.",
      image: "/placeholder.svg", 
      link: "#",
      department: "DfT",
      technology: "Python Dash"
    }
  ];

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
          <h1 className="text-3xl font-bold mb-4">Showcased Apps</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore exemplary Posit Connect applications and proven patterns from across government departments. 
            These applications demonstrate best practices for data science deployment, user interface design, 
            and secure government service delivery.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcasedApps.map((app, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center">
                <img 
                  src={app.image} 
                  alt={`Screenshot of ${app.title}`}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-semibold leading-none tracking-tight text-lg">{app.title}</h2>
                  <div className="flex flex-col text-xs text-muted-foreground text-right">
                    <span>{app.department}</span>
                    <span>{app.technology}</span>
                  </div>
                </div>
                <CardDescription>{app.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={app.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2">
                    <span>View application</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <PositFooter />
    </div>
  );
};

export default ShowcasedApps;