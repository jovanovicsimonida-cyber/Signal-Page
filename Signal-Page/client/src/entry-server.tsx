import { renderToString } from "react-dom/server";
import { Router as WouterRouter } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Switch, Route } from "wouter";
import Home from "@/pages/Home";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

export function render(url: string) {
  const queryClient = new QueryClient();

  const html = renderToString(
    <WouterRouter ssrPath={url}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AppRoutes />
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </WouterRouter>
  );

  return html;
}
