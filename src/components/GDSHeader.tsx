import { Button } from "@/components/ui/button";

interface GDSHeaderProps {
  serviceName: string;
  phase?: "alpha" | "beta" | "live";
  feedbackUrl?: string;
}

export const GDSHeader = ({ serviceName, phase = "beta", feedbackUrl }: GDSHeaderProps) => {
  return (
    <header className="border-b-8 border-primary bg-background">
      {/* GOV.UK Header - Updated 2025 Brand */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <div className="text-lg font-bold">GOV.UK</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Service Header */}
      <div className="bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-foreground">{serviceName}</h1>
              {phase && (
                <div className="inline-block">
                  <span
                    className={`rounded px-2 py-1 text-xs font-bold uppercase tracking-wide ${
                      phase === "alpha"
                        ? "bg-[#d53880] text-white"
                        : phase === "beta"
                        ? "bg-primary text-primary-foreground"
                        : "bg-success text-success-foreground"
                    }`}
                  >
                    {phase}
                  </span>
                </div>
              )}
            </div>
            {feedbackUrl && (
              <Button variant="link" asChild>
                <a href={feedbackUrl} target="_blank" rel="noopener noreferrer">
                  Give feedback
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};