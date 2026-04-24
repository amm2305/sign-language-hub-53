import { motion } from "framer-motion";
import { BookOpen, Camera, BarChart3, Sparkles, Hand, ArrowRight, Zap, Globe2, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BookOpen,
    title: "Alphabet Mastery",
    desc: "Learn every letter sign with interactive cards and visuals.",
    to: "/alphabet",
    tint: "from-indigo-500/20 to-blue-500/10",
  },
  {
    icon: Camera,
    title: "Live Translator",
    desc: "Real-time camera-based sign recognition powered by AI.",
    to: "/translator",
    tint: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    icon: BarChart3,
    title: "Track Progress",
    desc: "XP, streaks and levels keep your learning addictive.",
    to: "/progress",
    tint: "from-purple-500/20 to-pink-500/10",
  },
];

const stats = [
  { icon: Zap, label: "Active Learners", value: "10k+" },
  { icon: Globe2, label: "Signs Covered", value: "200+" },
  { icon: Trophy, label: "Lessons", value: "50+" },
];

const Index = () => {
  const userName = typeof window !== "undefined" ? localStorage.getItem("userName") : null;
  const isAuthed = !!userName && !!localStorage.getItem("token");

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative">
        <div className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-foreground mb-6 shadow-card">
                <Sparkles className="w-4 h-4 text-primary" />
                {isAuthed ? `Welcome back, ${userName} 👋` : "Welcome to SignLingo"}
              </div>

              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.05]">
                Learn Sign Language,{" "}
                <span className="text-gradient-hero">Hands On.</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Master ASL through interactive lessons, alphabet flashcards, and a
                real-time camera translator — all in one beautifully crafted experience.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity shadow-elevated h-12 px-6 text-base font-semibold">
                  <Link to="/alphabet">
                    Start Learning <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>

                <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base font-semibold glass border-border/60">
                  <Link to="/translator">
                    <Camera className="w-4 h-4 mr-1" />
                    Try Translator
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mt-14 grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto"
            >
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 md:p-5 shadow-card">
                  <s.icon className="w-5 h-5 mx-auto text-primary mb-2" />
                  <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground mb-3">
            <Hand className="w-3 h-3" />
            Everything you need
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
            A complete <span className="text-gradient-hero">sign language</span> toolkit
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Three core experiences working together to make you fluent — faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={f.to}
                className="group relative block rounded-2xl glass p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.tint} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-5 shadow-elevated">
                    <f.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{f.desc}</p>
                  <div className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    Explore <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-hero p-8 md:p-12 shadow-elevated"
        >
          <div className="absolute inset-0 opacity-20 bg-pattern-dots" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-primary-foreground">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">Ready to start signing?</h3>
              <p className="opacity-90">Join thousands learning ASL the smart way.</p>
            </div>
            {!isAuthed ? (
              <Button asChild size="lg" variant="secondary" className="h-12 px-6 font-semibold shadow-card">
                <Link to="/auth">
                  Create free account <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" variant="secondary" className="h-12 px-6 font-semibold shadow-card">
                <Link to="/lessons">
                  Continue learning <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
