import { motion } from "framer-motion";
import { Hand, BookOpen, Camera, BarChart3, Sparkles, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ModuleCard from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                AI-Powered Sign Language Learning
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Learn Sign Language,{" "}
                <span className="text-gradient-hero">Hands On</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                Master ASL with interactive lessons, real-time translation, and personalized progress tracking. Break communication barriers today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 text-primary-foreground font-semibold px-8">
                  <Link to="/alphabet">Start Learning</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/translator">Try Translator</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Floating stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
          >
            {[
              { icon: Users, label: "Learners", value: "10K+" },
              { icon: Hand, label: "Signs", value: "500+" },
              { icon: Globe, label: "Languages", value: "3" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-5 h-5 mx-auto text-primary mb-1" />
                <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Learning Modules
          </h2>
          <p className="text-muted-foreground">Choose your path to sign language mastery</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard
            title="Alphabet & Basics"
            description="Learn ASL fingerspelling from A to Z with visual guides"
            icon={Hand}
            to="/alphabet"
            color="primary"
            progress={65}
          />
          <ModuleCard
            title="Video Lessons"
            description="Structured lessons from greetings to full conversations"
            icon={BookOpen}
            to="/lessons"
            color="info"
            progress={30}
          />
          <ModuleCard
            title="Real-Time Translator"
            description="Use your camera to detect and translate signs instantly"
            icon={Camera}
            to="/translator"
            color="accent"
          />
          <ModuleCard
            title="Progress Tracking"
            description="Track streaks, achievements, and learning milestones"
            icon={BarChart3}
            to="/progress"
            color="success"
            progress={45}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 SignLingo. Making sign language accessible to everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
