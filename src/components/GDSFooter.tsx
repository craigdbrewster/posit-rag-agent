export const GDSFooter = () => {
  return (
    <footer className="mt-auto border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  Accessibility statement
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  Cookies
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Services and information</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary hover:underline">
                  Benefits
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  Births, deaths, marriages
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  Business and self-employed
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Departments and policy</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-primary hover:underline">
                  How government works
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  Departments
                </a>
              </li>
              <li>
                <a href="#" className="text-primary hover:underline">
                  Worldwide
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Built by</h3>
            <p className="text-muted-foreground">
              This service is built and maintained by the{" "}
              <a href="#" className="text-primary hover:underline">
                Government Digital Service
              </a>
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              All content is available under the{" "}
              <a href="#" className="text-primary hover:underline">
                Open Government Licence v3.0
              </a>
              , except where otherwise stated
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-primary hover:underline">
                © Crown copyright
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};