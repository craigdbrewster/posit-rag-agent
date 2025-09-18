export const PositFooter = () => {
  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary underline hover:no-underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-primary underline hover:no-underline">
                  Accessibility statement
                </a>
              </li>
              <li>
                <a href="#" className="text-primary underline hover:no-underline">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-primary underline hover:no-underline">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://docs.posit.co/connect/" className="text-primary underline hover:no-underline" target="_blank" rel="noopener noreferrer">
                  Posit Connect Docs
                </a>
              </li>
              <li>
                <a href="https://education.rstudio.com/" className="text-primary underline hover:no-underline" target="_blank" rel="noopener noreferrer">
                  R Training
                </a>
              </li>
              <li>
                <a href="https://www.python.org/about/gettingstarted/" className="text-primary underline hover:no-underline" target="_blank" rel="noopener noreferrer">
                  Python Learning
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Data & Analytics</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary underline hover:no-underline">
                  Data Standards
                </a>
              </li>
              <li>
                <a href="#" className="text-primary underline hover:no-underline">
                  Analytics Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-primary underline hover:no-underline">
                  Best Practices
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Built by</h3>
            <p className="text-muted-foreground">
              This service is built and maintained by the{" "}
              <a href="#" className="text-primary underline hover:no-underline">
                Government Data Science Team
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              All content is available under the{" "}
              <a href="#" className="text-primary underline hover:no-underline">
                Open Government Licence v3.0
              </a>
              , except where otherwise stated
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-primary underline hover:no-underline">
                © Crown copyright
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};