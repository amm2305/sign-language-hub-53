import { motion } from "framer-motion";
import { Hand, BookOpen, Camera, BarChart3, Sparkles, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ModuleCard from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ✅ NEW: Welcome message */}
      {userName && (
        <div className="text-center mt-6 text-lg font-semibold text-foreground">
          Welcome, {userName} 👋
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">

          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Welcome to SignLingo
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                Learn Sign Language Hands On
              </h1>

              <p className="text-muted-foreground mb-8">
                Master ASL with interactive lessons and real-time translation.
              </p>

              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link to="/alphabet">Start Learning</Link>
                </Button>

                <Button asChild variant="outline">
                  <Link to="/translator">Try Translator</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;