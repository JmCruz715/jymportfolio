import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicProvider } from "@/contexts/MusicContext";
import Index from "./pages/Index.tsx";
import Profile from "./pages/Profile.tsx";
import Shop from "./pages/Shop.tsx";
import Payment from "./pages/Payment.tsx";
import BuyApp from "./pages/BuyApp.tsx";
import DownloadApps from "./pages/DownloadApps.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminEditor from "./pages/AdminEditor.tsx";
import ChatGPTPro from "./pages/ChatGPTPro.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MusicProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/downloads" element={<DownloadApps />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/buy/:productId" element={<BuyApp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminEditor />} />
            <Route path="/chatgpt" element={<ChatGPTPro />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
