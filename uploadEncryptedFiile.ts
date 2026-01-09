import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CommandCenter from "./pages/CommandCenter";
import Vault from "./pages/Vault";
import Upload from "./pages/Upload";
import Sharing from "./pages/Sharing";
import Threats from "./pages/Threats";
import AssumeBreach from "./pages/AssumeBreach";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<CommandCenter />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/sharing" element={<Sharing />} />
            <Route path="/threats" element={<Threats />} />
            <Route path="/assume-breach" element={<AssumeBreach />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
