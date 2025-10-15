import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Members from "./pages/Members";
import Memberships from "./pages/Memberships";
import Services from "./pages/Services";
import GroupBookings from "./pages/GroupBookings";
import Contact from "./pages/Contact";
import InfraredSauna from "./pages/Services/InfraredSauna";
import CompressionTherapy from "./pages/Services/CompressionTherapy";
import ContrastTherapy from "./pages/Services/ContrastTherapy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-wellness flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/members" element={<Members />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/services" element={<Services />} />
        <Route path="/group-bookings" element={<GroupBookings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/infrared-sauna" element={<InfraredSauna />} />
        <Route path="/services/compression-therapy" element={<CompressionTherapy />} />
        <Route path="/services/contrast-therapy" element={<ContrastTherapy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
