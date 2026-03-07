import { Link, useLocation } from "react-router-dom";
import { Hand, BookOpen, Camera, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Hand },
  { path: "/alphabet", label: "Alphabet", icon: BookOpen },
  { path: "/lessons", label: "Lessons", icon: BookOpen },
  { path: "/translator", label: "Translator", icon: Camera },
  { path: "/progress", label: "Progress", icon: BarChart3 },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Hand className="w-5 h-5 text-primary-foreground" />
          </div>
          SignLingo
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-secondary rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative flex items-center gap-1.5">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-b border-border bg-card"
          >
            <div className="p-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
